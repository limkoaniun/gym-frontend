# Gym Management Frontend

A modern gym management application built with Next.js and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.3 with TypeScript
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

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Add the following environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
```

**Important**: Make sure your backend API is running on `http://localhost:8080` before starting the frontend.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:9002`

## 🔧 Available Scripts

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start development server with Turbopack on port 9002 |
| `npm run build`     | Build the application for production                 |
| `npm start`         | Start production server                              |
| `npm run lint`      | Run ESLint for code quality checks                   |
| `npm run typecheck` | Run TypeScript type checking                         |

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

1. Create feature branches from `main`
2. Make commits with descriptive messages
3. Run type checking and linting before pushing
4. Create pull requests for code review

### Before Pushing Code

Always run these commands to ensure code quality:

```bash
npm run typecheck  # Check for TypeScript errors
npm run lint       # Check for linting issues
npm run build      # Ensure the app builds successfully
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
