# BURNMYRICE.TODAY

### AI Fitness Assistant Platform

Frontend for **burnmyrice.today**, an AI-assisted gym & fitness platform built with Next.js 15 and TypeScript. Production runs at <https://burnmyrice.today> and deploys automatically from `main` to EC2.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5 with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: Radix UI primitives + flowbite-react
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Date Handling**: date-fns
- **i18n**: i18next + react-i18next (locales under `src/i18n/locales/`)
- **Notifications**: react-toastify
- **Auth/session**: js-cookie

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

`.env.production` is committed and points at the live API (`https://burnmyrice.today/api`). You usually don't need to touch it locally.

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
gym-frontend/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (admin)/admin/    # Admin route group
│   │   ├── (site)/           # User-facing route group
│   │   │   ├── dashboard/
│   │   │   ├── equipments/
│   │   │   ├── favorites/
│   │   │   ├── login/
│   │   │   ├── profile/
│   │   │   └── signup/
│   │   ├── globals.css
│   │   └── favicon.ico
│   ├── components/           # Reusable UI (admin/, auth/, dashboard/,
│   │                         #   equipments/, login/, navigation/,
│   │                         #   profile/, providers/, ui/ shadcn base)
│   ├── context/              # React Context providers (AppContext.tsx)
│   ├── hooks/                # Custom React hooks
│   ├── i18n/                 # i18next config + locales
│   ├── lib/
│   │   ├── api/              # Axios-based API clients (auth, equipment,
│   │   │                     #   media, muscle, ping, tag, user)
│   │   ├── axios.ts          # Configured axios instance
│   │   ├── interfaces.ts     # Shared TypeScript interfaces
│   │   ├── schemas.ts        # Zod schemas
│   │   └── utils.ts
│   └── middleware.ts         # Next.js middleware (auth/route guards)
├── public/                   # Static assets
├── scripts/
│   └── deploy-frontend.sh    # EC2 deploy script (invoked by CI)
├── .github/workflows/
│   └── deploy.yml            # Push-to-main → EC2 deploy
├── .husky/                   # Git hooks (pre-commit, pre-push)
├── components.json           # shadcn/ui config
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── package.json
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

- Commit directly to `main`. Pushes to `main` trigger an automatic EC2 deploy via `.github/workflows/deploy.yml`.
- Husky hooks enforce quality gates so the deploy stays green. They install automatically on `npm install` (via the `prepare` script):
  - **pre-commit**: `lint-staged` runs Prettier on staged `.ts`/`.tsx`/`.js`/`.jsx`/`.json`/`.css`/`.md` files and re-stages the formatted output.
  - **pre-push**: `tsc --noEmit` + `next lint` block the push if either fails.
- Use descriptive commit messages. They double as the deploy changelog.

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
- Check the `NEXT_PUBLIC_API_BASE_URL` in `.env.development`
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

## 📄 License

Licensed under the [Apache License, Version 2.0](./LICENSE).

© 2026 [KookaByte](https://www.kookabyte.com.au/)

---

**Happy coding!** 🚀
