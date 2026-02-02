#!/bin/bash
set -euo pipefail

# ===== CONFIG =====
APP_DIR="/var/www/gym-webapp"
APP_NAME="gym-webapp"
GIT_REPO="git@github.com:limkoaniun/gym-frontend.git"
BRANCH="main"

# Next.js usually listens on 3000 and nginx listens on 80
APP_PORT="${APP_PORT:-3000}"

LOG_DIR="/var/log/gym-webapp"
LOG_FILE="$LOG_DIR/deploy.log"

export NODE_OPTIONS="--max_old_space_size=2048"
export NODE_ENV=production

# Run as ubuntu login shell
run_as_ubuntu() { sudo -u ubuntu -H bash -lc "$*"; }

# Ensure dirs and ownership
sudo mkdir -p "$APP_DIR" "$LOG_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR" "$LOG_DIR"

# Log everything
exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================="
echo "Deployment started at $(date)"
echo "========================================="

trap 'echo "ERROR: Deployment failed at line $LINENO"; exit 1' ERR

# Sanity checks
run_as_ubuntu "command -v git >/dev/null"
run_as_ubuntu "command -v node >/dev/null"
run_as_ubuntu "command -v npm  >/dev/null"

# Stop running service before changing files
echo "→ Stopping existing service (if running)..."
sudo systemctl stop "$APP_NAME" || true
sleep 2

# Checkout or update
if [ ! -d "$APP_DIR/.git" ]; then
  echo "→ First-time setup: cloning repository..."
  # If APP_DIR exists (it does), clone into it
  run_as_ubuntu "cd '$APP_DIR' && git clone -b '$BRANCH' '$GIT_REPO' ."
else
  echo "→ Updating existing repo to origin/$BRANCH..."
  run_as_ubuntu "cd '$APP_DIR' && git fetch origin '$BRANCH'"
  run_as_ubuntu "cd '$APP_DIR' && git reset --hard 'origin/$BRANCH'"
fi

# Clean tracked and untracked files (careful: this deletes untracked files)
echo "→ Cleaning workspace..."
run_as_ubuntu "cd '$APP_DIR' && git clean -fdx"

# Verify env
echo "→ Verifying .env.production exists..."
run_as_ubuntu "cd '$APP_DIR' && test -f .env.production"
echo "  ✓ .env.production found"

# Install deps
echo "→ Installing dependencies..."
run_as_ubuntu "cd '$APP_DIR' && npm ci"
echo "  ✓ Dependencies installed"

# Build
echo "→ Building Next.js app..."
run_as_ubuntu "cd '$APP_DIR' && npm run build"
echo "  ✓ Build completed"

# Optional: prune dev deps only if you are sure runtime is fine without them
echo "→ Pruning dev dependencies (optional)..."
run_as_ubuntu "cd '$APP_DIR' && npm prune --omit=dev || true"

# Check app port (not port 80)
echo "→ Checking app port $APP_PORT..."
sudo ss -ltnp | grep ":$APP_PORT" && echo "NOTE: something is already listening on $APP_PORT" || echo "✓ $APP_PORT is free"

# Restart service
echo "→ Restarting systemd service..."
sudo systemctl restart "$APP_NAME"
sudo systemctl status "$APP_NAME" --no-pager -l | sed -n '1,30p'

# Print URL dynamically
PUBLIC_IP="$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4 || true)"
LOCAL_IP="$(hostname -I | awk '{print $1}' || true)"

echo "========================================="
echo "Deployment completed at $(date)"
echo "========================================="
echo "Public URL (if nginx on 80): http://${PUBLIC_IP:-$LOCAL_IP}"
echo "If direct app port:          http://${PUBLIC_IP:-$LOCAL_IP}:$APP_PORT"
echo "Deploy logs: tail -f $LOG_FILE"
echo "Service logs: journalctl -u $APP_NAME -f"