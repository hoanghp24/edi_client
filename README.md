# Shipping plan (EDI Client) — Enterprise Logistics Documentation

> **Project Version**: 1.0.0 (Modernization Refactor)  
> **Status**: Development Phase / Feature Scaling  
> **Tech Stack**: React 19 · Ant Design · Redux Toolkit · TanStack Query · Framer Motion · Vite

---

## Table of Contents

- [Shipping plan (EDI Client) — Enterprise Logistics Documentation](#shipping-plan-edi-client--enterprise-logistics-documentation)
  - [Table of Contents](#table-of-contents)
  - [Project Architecture](#project-architecture)
  - [Directory Structure](#directory-structure)
  - [Integrated Features](#integrated-features)
  - [Authentication System](#authentication-system)
  - [API Client \& Networking](#api-client--networking)
  - [Development Standards (MANDATORY)](#development-standards-mandatory)
  - [UI/UX Philosophy](#uiux-philosophy)
  - [Getting Started](#getting-started)
    - [Official Documentation for Shipping plan (EDI Client) Platform](#official-documentation-for-shipping-plan-edi-client-platform)

---

## Project Architecture

This application is built on a **Feature-Driven Architecture** to ensure high scalability and easy maintenance in large-scale logistics operations.

- **Hybrid State Management**:
  - **TanStack Query (v5)**: Manages 100% of server-side state (fetching, caching, mutation).
  - **Redux Toolkit**: Manages global UI/Client state (auth sessions, sidebar state, global preferences).
- **Resilient Networking**: Centralized `apiClient` using Axios with automatic Token Refresh and Request Queuing.

---

## Directory Structure

Our project follows a strictly modular structure:

```text
src/
├── api/             # Global QueryClient & Axios apiClient
├── assets/          # Images, Icons, and Fonts
├── components/      # Shared UI components (Layouts, Common)
├── constants/       # Endpoints, Enums, Error Messages
├── features/        # Main Business Modules (Self-contained)
├── hooks/           # Global shared hooks (useAuth, useTheme)
├── layouts/         # MainLayout & AuthLayout wrappers
├── pages/           # Page assembly and routing views
├── routes/          # Navigation logic & Protected Routes
├── state/           # Redux Store & Hooks configuration
├── styles/          # SCSS tokens and global styles
└── types/           # Dedicated TypeScript interfaces
```

---

## Integrated Features

| Feature Group | Description | Status |
| :--- | :--- | :--- |
| **Authentication** | Modern flow with Framer Motion, Silent Refresh & useMutation. | Done |
| **Dashboard** | Overview of logistics KPIs and active shipping plans. | In Progress |
| **Shipping Plan** | Management for Serial and Sample shipping operations. | Planned |
| **Tracking** | Multi-mode tracking (AIR/SEA) and real-time status monitoring. | Planned |
| **Master Data** | Management of Customers, Parts, and Transit Lead Times. | Planned |

---

## Authentication System

The application implements an enterprise-grade auth flow:

- **Silent Refresh**: Detects 401 errors, refreshes the token asynchronously, then continues the original request.
- **Protected Routing**: AppRoutes is guarded by PrivateRoute to prevent unauthorized access.
- **Persistence**: "Remember Me" logic safely manages localStorage vs sessionStorage.

---

## API Client & Networking

- **URL**: import.meta.env.VITE_API_URL
- **Data Unpacking**: Every request automatically returns response.data for cleaner service layers.
- **Error Normalization**: All errors are normalized into user-friendly strings in the interceptor.
- **Feedback**: Integrated NProgress global loading bar for all network calls.

---

## Development Standards (MANDATORY)

To maintain a clean codebase, all developers **MUST** follow these rules:

1. **Strict Typing**: Always define types/interfaces in `src/types/` for all API responses.
2. **No Direct Axios in UI**: All API calls must go through a feature service (e.g., authApi.ts).
3. **Prefer Mutations**: Use useMutation from TanStack Query for all POST/PUT/DELETE actions.
4. **Aesthetics**: Use Framer Motion for all entrance animations. Follow the 8px border-radius standard.

---

## UI/UX Philosophy

- **Premium Feel**: Every screen must have entrance animations (Side-slide/Fade).
- **Responsive Animations**: Optimized with GPU acceleration (will-change).
- **Ant Design Integration**: Custom theme configuration via themeConfig.ts.

---

## Getting Started

```bash
# 1. Project Install
npm install or yarn install

# 2. Setup Environment
cp .env.example .env # Configure VITE_API_URL

# 3. Development Mode
npm run dev or yarn dev
```

---

### Official Documentation for Shipping plan (EDI Client) Platform

*Last Updated: April 2026 — Modernization & Resilience Refactor*
