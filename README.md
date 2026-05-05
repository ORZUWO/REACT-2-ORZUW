# AI-JOB Frontend

Modern React application built with the latest stack.

## Tech Stack
- **React 19**
- **Vite 6**
- **Zustand 5** (State Management)
- **Axios 1.15** (API Client)
- **React Router 7**
- **Tailwind CSS 4**
- **Framer Motion 12** (Animations)
- **React Hook Form** + **Zod** (Forms & Validation)
- **Sonner** (Notifications)

## Architecture
```text
src/
├── pages/             # Page components (logic in hooks)
├── components/
│   ├── auth/          # Auth guards
│   ├── layout/        # Shared layouts (Navbar, Footer)
│   └── ui/            # Base UI components (shadcn)
├── store/             # Zustand stores
├── hooks/             # Custom hooks (API requests)
├── lib/               # Utilities & Instance configs (Axios)
├── router/            # Route configurations
└── i18n/              # Localization (TJ / EN)
```

## Getting Started

### 1. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=https://api.yourdomain.com
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

## Features
- **Modern Auth Flow**: Zustand-based auth state with Axios interceptors for automatic token management and refresh.
- **Beautiful UI**: High-end designs using Tailwind 4 and Framer Motion.
- **Type Safety**: Full TypeScript integration with Zod validation.
