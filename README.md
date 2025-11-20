# Adaa Client - Performance Excellence Platform

A modern, Arabic-first web application built with React, TypeScript, and Vite, focused on organizational performance assessment, certification, and knowledge sharing.

---

## 🏗️ Architecture Overview

This project follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── api/              # API endpoint definitions
├── assets/           # Static resources (fonts, icons, images)
├── components/       # Reusable UI components
│   ├── sections/     # Feature-specific page sections
│   └── ui/           # Base UI components (Design System)
├── constants/        # Static data and configuration
├── context/          # React Context providers
├── hooks/            # Custom React hooks
│   ├── mutations/    # React Query mutations
│   ├── queries/      # React Query queries
│   └── prefetch/     # Data prefetching utilities
├── layouts/          # Layout components and route guards
├── lib/              # Utility functions and helpers
├── pages/            # Route page components
├── schemas/          # Zod validation schemas and TypeScript types
└── services/         # Business logic and API communication layer
```

---

## 🎯 Key Features

### 🔐 Authentication & Authorization

- User registration and login with JWT authentication
- Email verification flow
- Password reset functionality
- Organization registration for entities
- Role-based access control with route guards:
  - `UserGuard` - Authenticated users only
  - `OrganizationGuard` - Registered Organization only

### 🛡️ Adaa Shield (درع اداء)

- Performance assessment questionnaires for organizations
- Organization performance analytics
- Shield information and guidelines
- Public directory of assessed organizations

### 📜 Adaa Certificates (شهادات اداء)

- Certificate assessment system
- Organization certification tracking
- Public certificates directory with informatics

### 🎙️ Adaa Podcastr (كرسي اداء) - Podcast Platform

- Browse and listen to podcasts
- Podcast details with audio player
- Audio visualization using WaveSurfer.js
- Custom audio controls

### 🔧 Adaa Tools (ادوات اداء)

- Performance assessment tools
- Organizational development resources
- Requires Adaa Plus subscription to use

### 📰 Adaa Blog (مدونة اداء)

- Latest articles and insights
- Detailed blog post viewing
- Rich text content with DOMPurify sanitization

### 📚 Releases (اصدارات اداء)

- Latest platform releases and updates

### ⭐ Adaa Plus (اداء المميز)

- Premium subscription features
- Enhanced organizational capabilities

### 📞 Contact Us (اتصل بنا)

- Contact forms with validation
- Inquiry submission system

---

## 🗂️ Project Structure Deep Dive

### `/api` - API Endpoint Definitions

Centralized API endpoint URL definitions for each feature domain:

- `auth.ts` - Authentication endpoints
- `adaa-shield.ts` - Shield assessment endpoints
- `certificate` - Certificate endpoints
- `podcast.ts` - Podcast data endpoints
- `blogs.ts` - Blog content endpoints
- `tools.ts` - Tools endpoints
- `releases.ts` - Release notes endpoints
- `contact.ts` - Contact endpoints

### `/services` - Business Logic Layer

Service layer that handles API communication and business logic:

- `api.ts` - Axios instance with interceptors for authentication
- `auth.ts` - Authentication service
- `shield.ts` - Shield assessment logic
- `certificates/` - Certificate-related services
- `podcasts.ts` - Podcast data fetching
- `blogs.ts` - Blog content management
- `subscription.ts` - Premium subscription handling
- `contact.ts` - Contact form submissions

### `/hooks` - Custom React Hooks

#### Queries (`/hooks/queries`)

React Query hooks for data fetching:

- `useCurrentUserQuery.ts` - Current user data
- `useGetPodcastsQuery.ts` - Podcast list
- `useGetPodcastDetailsQuery.ts` - Individual podcast
- `useGetAdaaShieldOrganizationsQuery.ts` - Shield organizations
- `useGetShieldQuestionsQuery.ts` - Assessment questions
- `useGetLatestBlogQuery.ts` - Latest blog posts

#### Mutations (`/hooks/mutations`)

React Query hooks for data modification:

- `useLoginMutation.ts` - User login
- `useRegisterMutation.ts` - User registration
- `useRegisterOrganizationMutation.ts` - Organization registration
- `useForgetPasswordMutation.ts` - Password reset request
- `useResetPasswordMutation.ts` - Password reset confirmation
- `useSubmitAnswersMutation.ts` - Assessment submission
- `useSubscriptionMutation.ts` - Subscription management
- `useSubmitInquiryMutation.ts` - Contact form submission

#### Utility Hooks

- `useWaveSurfer.ts` - Audio waveform visualization
- `useAudioVisualizer.ts` - Audio analysis and visualization
- `useCountDown.ts` - Countdown timer functionality
- `useDebounce.ts` - Input debouncing
- `useDocumentHead.ts` - Dynamic page title/meta tags
- `useOutsideClick.ts` - Detect clicks outside element
- `useScrollEffect.ts` - Scroll-based effects

### `/components/ui` - Design System

Reusable UI components built with Radix UI primitives:

- `button.tsx` - Button component with variants
- `input.tsx` - Form input fields
- `select.tsx` - Dropdown select
- `checkbox.tsx` - Checkbox input
- `radio-group.tsx` - Radio button groups
- `dialog.tsx` - Modal dialogs
- `popover.tsx` - Popover tooltips
- `pagination.tsx` - Pagination controls
- `file-input.tsx` - File upload input
- `submit-button.tsx` - Form submit button with loading state
- `icons.tsx` - Icon components
- `loading/` - Loading state components
- `extend/` - Extended/composite UI components

### `/components/sections` - Feature Sections

Page-specific component sections organized by feature:

- `NavBar.tsx` - Main navigation bar
- `SideBar.tsx` - Mobile sidebar navigation
- `MenuLists.tsx` - Menu list components
- `Footer/` - Footer sections
- `home/` - Homepage sections
- `adaa-shield/` - Shield feature sections
- `adaa-shield-assessment/` - Assessment form sections
- `adaa-shield-info/` - Shield information sections
- `adaa-tools/` - Tools page sections
- `blogs/` - Blog listing sections
- `podcast/` - Podcast player sections
- `Certificates/` - Certificate sections
- `contact-forms/` - Contact form sections

### `/layouts` - Layout Components

Application layout structure and route protection:

- `AppWrapper.tsx` - Root wrapper with toast notifications
- `Main.tsx` - Main layout with header/footer
- `DataWrapper.tsx` - Data loading wrapper
- `UserGuard.tsx` - Authenticated route guard
- `OrganizationGuard.tsx` - Organization member guard
- `UserInitRequiredGuard.tsx` - Profile completion guard
- `DefaultMotionElement.tsx` - Animation wrapper

### `/pages` - Route Components

Page-level components mapped to routes:

- `Home.tsx` - Landing page (/)
- `Login.tsx` - Login page (/تسجيل-دخول)
- `Register.tsx` - User registration (/حساب-جديد)
- `RegisterOrganization.tsx` - Organization registration (/تسجيل-منظمة)
- `ForgetPassword.tsx` - Password reset request (/نسيت-كلمة-المرور)
- `ChangePassword.tsx` - Password reset (/reset-password)
- `VerifiedEmail.tsx` - Email verification success (/verified)
- `VerifyYourMail.tsx` - Email verification pending (/تحقق-من-البريد-الالكتروني)
- `AdaaShield.tsx` - Shield landing (/درع-اداء)
- `AdaaShieldAssessment.tsx` - Shield assessment (/درع-اداء/تقييم)
- `AdaaShieldInformatics.tsx` - Shield organizations (/درع-اداء/المنظمات)
- `Certificates.tsx` - Certificates landing (/شهادات-اداء)
- `CertificatesAssessment.tsx` - Certificate assessment (/شهادات-اداء/تقييم)
- `CertificatesInformatics.tsx` - Certificate organizations (/شهادات-اداء/المنظمات)
- `Podcast.tsx` - Podcast list (/كرسي-اداء)
- `PodcastDetails.tsx` - Podcast player (/كرسي-اداء/:id)
- `AdaaTools.tsx` - Tools page (/ادوات-اداء)
- `Blogs.tsx` - Blog listing (/مدونة-اداء)
- `BlogDetails.tsx` - Blog post (/مدونة-اداء/:id)
- `Releases.tsx` - Releases page (/اصدارات-اداء)
- `AdaaPlus.tsx` - Premium subscription (/اشتراك-اداء-المميز)
- `ContactUs.tsx` - Contact page (/اتصل-بنا)
- `Error.tsx` - Error boundary page

### `/schemas` - Type Definitions & Validation

- `types.ts` - TypeScript type definitions
- `validation.ts` - Zod schemas for forms
- `questions-validation.ts` - Assessment question validation

### `/constants`

- `data.tsx` - Static data and configuration
- `menus.tsx` - Navigation menu structures
- `query-keys.ts` - React Query key factory

### `/lib` - Utility Functions

- `utils.ts` - General utility functions (cn, etc.)
- `storage.ts` - Local/session Storage management for tokens

### `/context`

- `UserProvider.tsx` - Global user state management with React Context

---

## 🛠️ Tech Stack

### Core Framework

- **React 19.1.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.2** - Build tool and dev server
- **React Router 7.8.2** - Client-side routing

### State Management

- **TanStack Query v5** - Server state management
- **React Context** - Global client state
- **React Hook Form 7.65** - Form state management

### UI & Styling

- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **Shadcn UI** - UI components library (Download More when needed)
- **Lucide React** - Icon library
- **Motion 12.23** - Animation library (Framer Motion fork)
- **class-variance-authority** - Component variant management
- **tailwind-merge** - Tailwind class merging
- **tw-animate-css** - Tailwind animations (Required for Shadcn UI)

### Data Fetching & Validation

- **Axios 1.11** - HTTP client
- **Zod 4.1.5** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Audio & Media

- **@wavesurfer/react** - Audio waveform visualization
- **WaveSurfer.js** - Audio player library

### Utilities

- **DOMPurify 3.3** - HTML sanitization
- **react-toastify** - Toast notifications
- **react-loading-skeleton** - Loading skeletons
- **react-intersection-observer** - Scroll-based triggers

---

## 🔧 Development Tools

### Code Quality

- **ESLint 9.35** - Linting with TypeScript support
  - `@typescript-eslint/eslint-plugin`
  - `@typescript-eslint/parser`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `eslint-plugin-jsx-a11y` - Accessibility linting
  - `eslint-plugin-prettier` - Prettier integration
- **Prettier 3.6.2** - Code formatting
  - `prettier-plugin-tailwindcss` - Tailwind class sorting

### Development Experience

- **TanStack Query Devtools** - React Query debugging
- **Vite HMR** - Hot Module Replacement
- **TypeScript Path Aliases** - `@/*` imports

---

## 📦 Available NPM Scripts

```bash
# Development
npm run dev          # Start development server on port 3000

# Building
npm run build        # Type check + production build

# Code Quality
npm run lint         # Run ESLint to check for errors
npm run format       # Format code with Prettier + fix ESLint issues
npm run check        # Run full check: TypeScript + ESLint + Prettier

# Preview
npm run preview      # Preview production build locally
```

## 🚀 Getting Started

### Installation

1. Install dependencies

```bash
npm install
```

2. Configure environment variables
   Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=<your-api-base-url>
```

3. Start development server

```bash
npm run dev
```

4. Open browser at `http://localhost:3000`

---

## 🏛️ Project Patterns & Conventions

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useCurrentUser.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User`, `Organization`)

### Import Aliases

The project uses `@/*` path alias for cleaner imports:

```typescript
import { Button } from '@/components/ui/button';
import { useCurrentUserQuery } from '@/hooks/queries/useCurrentUserQuery';
import type { User } from '@/schemas/types';
```

### State Management Strategy

1. **Server State**: TanStack Query (queries/mutations)
2. **Global Client State**: React Context (UserProvider)
3. **Form State**: React Hook Form

### Route Protection

Routes are protected using layout-based guards:

```typescript
<UserInitRequiredGuard>    // Ensure user data loaded
  <UserGuard>              // Authenticated users only
    <OrganizationGuard>    // Organization members only
      <ProtectedPage />
    </OrganizationGuard>
  </UserGuard>
</UserInitRequiredGuard>
```

### API Communication Flow

```
Page Component
    ↓
Custom Hook (useQuery/useMutation)
    ↓
Service Layer (/services)
    ↓
API Instance (axios with interceptors)
    ↓
Backend API
```

---

## 📝 Development Guidelines

### Adding a New Feature

1. **Create Page Component** in `/src/pages`
2. **Add Route** in `main.tsx` router configuration
3. **Create API Endpoints** in `/src/api`
4. **Implement Service** in `/src/services`
5. **Create Hooks** in `/src/hooks/queries` or `/src/hooks/mutations`
6. **Build UI Components** in `/src/components/sections`
7. **Add Types** in `/src/schemas/types.ts`
8. **Add Validation** in `/src/schemas/validation.ts`

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build outputs to `dist/` directory and includes:

- Optimized and minified JavaScript bundles
- CSS with purged unused styles
- Static assets with cache-busting hashes
- `.htaccess` for Apache server configuration (SPA routing)

### Environment Variables

Ensure production environment has:

- `VITE_API_BASE_URL` - Backend API URL
