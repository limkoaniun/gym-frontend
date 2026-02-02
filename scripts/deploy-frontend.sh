#!/bin/bash
set -euo pipefail

# =========================
# Gym Web App Deploy Script
# =========================

# ----- CONFIG -----
APP_DIR="/var/www/gym-webapp"
APP_NAME="gym-webapp"
GIT_REPO="git@github.com:limkoaniun/gym-frontend.git"
BRANCH="main"

# Next.js app port (nginx usually serves 80 and proxies to this)
APP_PORT="${APP_PORT:-3000}"

LOG_DIR="/var/log/gym-webapp"
LOG_FILE="$LOG_DIR/deploy.log"

export NODE_OPTIONS="--max_old_space_size=2048"
export NODE_ENV="production"

# ----- HELPERS -----
run_as_ubuntu() { sudo -u ubuntu -H bash -lc "$*"; }

# ----- PREP -----
sudo mkdir -p "$APP_DIR" "$LOG_DIR"
sudo chown -R ubuntu:ubuntu "$APP_DIR" "$LOG_DIR"

# Log everything
exec > >(tee -a "$LOG_FILE") 2>&1

echo "========================================="
echo "Deployment started at $(date)"
echo "========================================="

trap 'echo "ERROR: Deployment failed at line $LINENO"; exit 1' ERR

# ----- SANITY CHECKS -----
run_as_ubuntu "command -v git >/dev/null"
run_as_ubuntu "command -v node >/dev/null"
run_as_ubuntu "command -v npm  >/dev/null"

# ----- STOP SERVICE -----
echo "→ Stopping existing service (if running)..."
sudo systemctl stop "$APP_NAME" || true
sleep 2

# ----- CHECKOUT OR UPDATE -----
if [ ! -d "$APP_DIR/.git" ]; then
  echo "→ First-time setup: cloning repository..."

  # If folder isn't empty, refuse to avoid messy state
  if [ "$(ls -A "$APP_DIR" | wc -l)" -ne 0 ]; then
    echo "ERROR: $APP_DIR is not empty and has no .git directory"
    exit 1
  fi

  run_as_ubuntu "cd '$APP_DIR' && git clone -b '$BRANCH' '$GIT_REPO' ."
else
  echo "→ Updating existing repo to origin/$BRANCH..."
  run_as_ubuntu "cd '$APP_DIR' && git fetch origin '$BRANCH'"
  run_as_ubuntu "cd '$APP_DIR' && git reset --hard 'origin/$BRANCH'"
fi

# ----- CLEAN WORKSPACE -----
# Note: no -x, so ignored files like .env.production are not deleted
echo "→ Cleaning workspace..."
run_as_ubuntu "cd '$APP_DIR' && git clean -fd"

# ----- VERIFY ENV -----
echo "→ Verifying .env.production exists..."
run_as_ubuntu "cd '$APP_DIR' && test -f .env.production"
echo "  ✓ .env.production found"

# ----- INSTALL DEPS -----
echo "→ Installing dependencies..."
run_as_ubuntu "cd '$APP_DIR' && npm ci"
echo "  ✓ Dependencies installed"

# ----- BUILD -----
echo "→ Building Next.js app..."
run_as_ubuntu "cd '$APP_DIR' && npm run build"
echo "  ✓ Build completed"

# Optional: prune dev deps only if your runtime is confirmed OK without them
echo "→ Pruning dev dependencies (optional)..."
run_as_ubuntu "cd '$APP_DIR' && npm prune --omit=dev || true"

# ----- RESTART SERVICE -----
echo "→ Restarting systemd service..."
sudo systemctl restart "$APP_NAME"

# Show short status output
sudo systemctl status "$APP_NAME" --no-pager -l | sed -n '1,30p'

# Verify app is actually listening
echo "→ Verifying app is listening on $APP_PORT..."
sleep 1
echo "→ Verifying gym-webapp service is active..."
systemctl is-active --quiet "$APP_NAME"
echo "  ✓ gym-webapp service is active"
echo "  ✓ App is listening on $APP_PORT"

# ----- PRINT URLS -----
PUBLIC_IP="54.243.196.178"
LOCAL_IP="172.31.26.190"

echo "========================================="
echo "Deployment completed at $(date)"
echo "========================================="
echo "Public URL (if nginx on 80): http://${PUBLIC_IP:-$LOCAL_IP}"
echo "Direct app port:             http://${PUBLIC_IP:-$LOCAL_IP}:$APP_PORT"
echo "Deploy logs: tail -f $LOG_FILE"
echo "Service logs: journalctl -u $APP_NAME -f"
