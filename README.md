# Gym Management Frontend

A modern gym management application built with Next.js and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5 with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v20.x or higher (recommended: latest LTS)
- **npm**: v8.x or higher
- **Git**: Latest version

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd gym-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the env schema template to `.env.development` and fill in the API URL:

```bash
cp .env.example .env.development
```

Then edit `.env.development`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

`.env.production` is committed and points at the live API (`https://burnmyrice.today/api`) — you usually don't need to touch it locally.

**Important**: Make sure your backend API is running on `http://localhost:8080` before starting the frontend.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## 🔧 Available Scripts

| Command                | Description                                          |
| ---------------------- | ---------------------------------------------------- |
| `npm run dev`          | Start development server with Turbopack on port 9002 |
| `npm run build`        | Build the application for production                 |
| `npm start`            | Start production server                              |
| `npm run lint`         | Run ESLint for code quality checks                   |
| `npm run lint:fix`     | Run ESLint with auto-fix                             |
| `npm run typecheck`    | Run TypeScript type checking                         |
| `npm run format`       | Format all files with Prettier                       |
| `npm run format:check` | Verify all files are formatted (no writes)           |

## 📁 Project Structure

```
src/
├── ai/              # AI integration (future)
├── app/             # Next.js App Router pages and layouts
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
└── lib/             # Utility functions and configurations

public/              # Static assets
components.json      # Shadcn/ui component configuration
tailwind.config.ts   # Tailwind CSS configuration
tsconfig.json        # TypeScript configuration
```

## 👥 Team Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint configuration for consistent code style
- Use camelCase for variables and functions
- Use PascalCase for components and interfaces
- Run `npm run lint` before committing

### Git Workflow

This repo uses a direct-to-`main` workflow with automated quality gates and a push-triggered deploy:

- Commit directly to `main` — pushes to `main` trigger an automatic EC2 deploy via `.github/workflows/deploy.yml`.
- Husky hooks enforce quality gates so the deploy stays green. They install automatically on `npm install` (via the `prepare` script):
  - **pre-commit**: `lint-staged` runs Prettier on staged `.ts`/`.tsx`/`.js`/`.jsx`/`.json`/`.css`/`.md` files and re-stages the formatted output.
  - **pre-push**: `tsc --noEmit` + `next lint` block the push if either fails.
- Use descriptive commit messages — they double as the deploy changelog.

### Running Checks Manually

The hooks handle the common cases, but you can run any check manually:

```bash
npm run typecheck  # TypeScript errors
npm run lint       # ESLint
npm run format     # Format the whole repo with Prettier
npm run build      # Full production build (slowest, most thorough)
```

## 🔧 Development Tips

### Port Configuration

The development server runs on port 9002 to avoid conflicts. If you need to change this:

1. Update the port in `package.json` dev script
2. Update any hardcoded references in your code

### UI Components

We use Radix UI primitives with custom styling:

- Check existing components before creating new ones
- Follow the established component patterns
- Use Tailwind classes for styling

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 9002
npx kill-port 9002
```

**TypeScript errors:**

```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Dependencies issues:**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Backend connection issues:**

- Ensure your backend API is running on `http://localhost:8080`
- Check the `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Verify network connectivity

## 📦 Additional Configuration

### IDE Setup

For VS Code users, recommended extensions:

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter

### Browser Support

This application supports modern browsers that support ES2017+ features.

## 🤝 Contributing

1. Follow the established code style and patterns
2. Write descriptive commit messages
3. Ensure all tests pass and code builds successfully
4. Update documentation when adding new features

## 📞 Support

If you encounter any issues or have questions:

1. Check this README first
2. Review existing issues in the project
3. Ask team members for assistance
4. Document solutions for future reference

---

**Happy coding!** 🚀
