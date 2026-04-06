# SHIPPING PLAN WEB (EDI Client)
## 📁 Project Architecture — Feature-Sliced Design (FSD v2)

## Tổng quan

Project sử dụng **Feature-Sliced Design v2** — phương pháp kiến trúc frontend hiện đại, tổ chức code theo **layers → slices → segments**.

### Tech Stack

| Công nghệ | Vai trò |
|---|---|
| React 19 + TypeScript | UI Framework |
| Vite 7 | Build tool |
| Ant Design 6 | UI Component Library |
| Redux Toolkit + Redux Persist | State Management |
| TanStack React Query | Server State / Data Fetching |
| React Router v7 | Routing |
| Axios | HTTP Client |
| Zod | Runtime Validation |
| SCSS | Styling |

---

## Cấu trúc thư mục

```
src/
├── app/                 # APP — Bootstrap, providers, routing, store
├── pages/               # PAGES — Full-page compositions
├── widgets/             # WIDGETS — Large self-contained UI blocks
├── features/            # FEATURES — User actions (business value)
└── shared/              # SHARED — Reusable code, no business logic
```

### Chi tiết từng layer

#### `app/` — Application Layer

Bootstrap toàn bộ ứng dụng: providers, routing, store, layouts.

```
app/
├── main.tsx             # Entry point — render React app
├── App.tsx              # Root component — ConfigProvider, QueryClient, Router
├── vite-env.d.ts        # Vite type declarations
├── layouts/
│   ├── MainLayout.tsx   # Layout chính: Sidebar + Header + Content (Outlet)
│   └── MainLayout.scss
├── router/
│   ├── AppRoutes.tsx    # Định nghĩa tất cả routes
│   ├── PrivateRoute.tsx # Guard: redirect về login nếu chưa đăng nhập
│   ├── PublicRoute.tsx  # Guard: redirect về home nếu đã đăng nhập
│   └── index.ts         # Barrel export
└── store/
    ├── store.ts         # Redux store config với persist
    ├── hooks.ts         # useAppDispatch, useAppSelector (typed hooks)
    ├── uiSlice.ts       # UI state: sidebar collapsed
    └── index.ts         # Barrel export
```

#### `pages/` — Pages Layer

Mỗi page là một **slice**, chứa component trang đầy đủ.

```
pages/
└── login/
    ├── ui/
    │   ├── LoginPage.tsx  # Trang login: branding + LoginForm
    │   └── Login.scss
    └── index.ts           # export { Login }
```

> **Khi thêm page mới:** Tạo folder mới trong `pages/`, ví dụ `pages/dashboard/`.

#### `widgets/` — Widgets Layer

Các block UI lớn, tự chứa, thường xuất hiện trên nhiều trang.

```
widgets/
├── header/
│   ├── ui/
│   │   ├── Header.tsx        # Header bar: collapse btn, brand, user dropdown
│   │   ├── Header.scss
│   │   └── UserDropdown.tsx  # Avatar dropdown: profile, settings, logout
│   └── index.ts
├── sidebar/
│   ├── ui/
│   │   ├── Sidebar.tsx           # Sidebar navigation
│   │   ├── Sidebar.scss
│   │   ├── SidebarMenuItem.tsx   # Recursive menu item (hỗ trợ multi-level)
│   │   └── SidebarMenu.scss
│   └── index.ts
└── footer/
    ├── ui/
    │   └── Footer.tsx
    └── index.ts
```

#### `features/` — Features Layer

Mỗi feature đại diện một **hành động người dùng** mang giá trị business.

```
features/
└── auth/
    ├── ui/
    │   └── LoginForm.tsx      # Form đăng nhập (username + password)
    ├── model/
    │   ├── authSlice.ts       # Redux slice: auth state, actions
    │   ├── useAuth.ts         # Hook: login, logout, auth status
    │   └── useAuthRoles.ts    # Hook: role-based access (isSuperAdmin, canEditPlan)
    ├── api/
    │   └── authApi.ts         # API calls: login, logout, getProfile
    ├── lib/
    │   └── authSchema.ts      # Zod schemas: validate API response
    └── index.ts               # Public API
```

#### `shared/` — Shared Layer

Code dùng chung, **không chứa business logic**.

```
shared/
├── api/                       # HTTP clients
│   ├── apiClient.ts           # Axios instance: interceptors, token refresh
│   ├── queryClient.ts         # React Query client config
│   └── index.ts
├── config/                    # Configuration
│   ├── env.ts                 # Environment variables (Zod validated)
│   ├── themeConfig.ts         # Ant Design theme tokens
│   ├── menuConfig.tsx         # Sidebar menu items config
│   └── index.ts
├── constants/                 # Constants
│   ├── apiEndpoints.ts        # API URL paths
│   ├── errorMessages.ts       # HTTP error messages mapping
│   ├── routes.ts              # Route paths + route names
│   └── index.ts
├── lib/                       # Utilities
│   ├── progress.ts            # NProgress bar (start/stop)
│   ├── storage.ts             # localStorage wrapper (token, user data)
│   └── index.ts
├── hooks/                     # Generic hooks
│   ├── usePageTitle.ts        # Auto-set document title from route
│   ├── useRouteProgress.ts    # Show progress bar on route change
│   └── index.ts
├── ui/                        # Reusable components
│   ├── ErrorBoundary/
│   │   └── ErrorBoundary.tsx  # Catch React errors, show fallback UI
│   ├── Placeholder.tsx        # "Under Construction" placeholder page
│   └── index.ts
├── types/                     # TypeScript types
│   ├── auth.ts                # User, AuthResponse, LoginRequest
│   ├── menu.ts                # MenuItem interface
│   └── index.ts
├── styles/                    # Global styles
│   ├── _theme.scss            # SCSS variables (colors, sizes, transitions)
│   └── global.scss            # CSS reset, fonts, scrollbar, NProgress
└── assets/                    # Static files
    ├── VAC_Logo.png
    ├── VAC_Logo_NoBG.png
    └── login-background.jpg
```

---

## Quy tắc Import

### Layer Dependencies (từ trên xuống)

```
app      →  pages, widgets, features, shared
pages    →  widgets, features, shared
widgets  →  features, shared
features →  shared
shared   →  chỉ npm packages (không import layer khác)
```

### Cấm

```tsx
// ❌ Import NGƯỢC LÊN (shared không được import từ features)
// File: shared/lib/storage.ts
import { useAuth } from '@/features/auth';          // ❌ shared → features

// ❌ Import NGƯỢC LÊN (features không được import từ widgets)
// File: features/auth/model/useAuth.ts
import { Header } from '@/widgets/header';           // ❌ features → widgets

// ❌ Import NGƯỢC LÊN (widgets không được import từ pages)
// File: widgets/sidebar/ui/Sidebar.tsx
import { Login } from '@/pages/login';               // ❌ widgets → pages

// ❌ Import NGANG giữa slices cùng layer
// File: features/auth/model/useAuth.ts
import { useShippingPlan } from '@/features/shipping-plan';  // ❌ feature → feature

// ❌ Import SÂU vào bên trong slice (bypass public API)
// File: pages/login/ui/LoginPage.tsx
import { LoginForm } from '@/features/auth/ui/LoginForm';           // ❌ import sâu
import { authSlice } from '@/features/auth/model/authSlice';        // ❌ import sâu
```

### Đúng cách

```tsx
// ✅ Import qua barrel export (public API)
import { LoginForm, useAuth } from '@/features/auth';
import { Header } from '@/widgets/header';
import { ROUTES } from '@/shared/constants';
import { storage } from '@/shared/lib';

// ❌ KHÔNG import trực tiếp file bên trong slice
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { authSlice } from '@/features/auth/model/authSlice';
```

### Import nội bộ trong slice

Bên trong cùng một slice, import trực tiếp bình thường:

```tsx
// Trong features/auth/model/useAuth.ts
import { setCredentials, logout } from './authSlice';    // ✅ cùng segment
import { authApi } from '../api/authApi';                // ✅ cùng slice
import { storage } from '@/shared/lib';                  // ✅ layer dưới
```

---

## Hướng dẫn thêm Feature mới

### 1. Tạo cấu trúc folder

Ví dụ thêm feature `shipping-plan`:

```
features/
└── shipping-plan/
    ├── ui/
    │   └── ShippingPlanTable.tsx
    ├── model/
    │   ├── shippingPlanSlice.ts
    │   └── useShippingPlan.ts
    ├── api/
    │   └── shippingPlanApi.ts
    └── index.ts              ← BẮT BUỘC
```

### 2. Tạo barrel export (`index.ts`)

```ts
// features/shipping-plan/index.ts
export { ShippingPlanTable } from './ui/ShippingPlanTable';
export { useShippingPlan } from './model/useShippingPlan';
export { default as shippingPlanReducer } from './model/shippingPlanSlice';
```

### 3. Đăng ký reducer (nếu dùng Redux)

```ts
// app/store/store.ts
import shippingPlanReducer from '@/features/shipping-plan/model/shippingPlanSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  shippingPlan: shippingPlanReducer,  // ← thêm vào
});
```

### 4. Thêm route

```tsx
// app/router/AppRoutes.tsx
import { ShippingPlanPage } from '@/pages/shipping-plan';

<Route path={ROUTES.SHIPPING_PLAN.SERIAL} element={<ShippingPlanPage />} />
```

---

## Hướng dẫn thêm Page mới

```
pages/
└── shipping-plan/
    ├── ui/
    │   ├── ShippingPlanPage.tsx   # Ghép widgets + features
    │   └── ShippingPlan.scss
    └── index.ts
```

```ts
// pages/shipping-plan/index.ts
export { ShippingPlanPage } from './ui/ShippingPlanPage';
```

Page **chỉ ghép nối** components từ widgets và features, không chứa business logic.

---

## Hướng dẫn thêm Widget mới

Widget là block UI lớn, tự chứa, dùng lại trên nhiều trang:

```
widgets/
└── notification-panel/
    ├── ui/
    │   ├── NotificationPanel.tsx
    │   └── NotificationPanel.scss
    └── index.ts
```

---

## Quy tắc đặt tên

| Loại file | Convention | Ví dụ |
|---|---|---|
| Component | `PascalCase.tsx` | `LoginForm.tsx`, `Header.tsx` |
| Hook | `use` + `camelCase.ts` | `useAuth.ts`, `usePageTitle.ts` |
| Redux slice | `camelCase.ts` | `authSlice.ts`, `uiSlice.ts` |
| API module | `camelCase.ts` | `authApi.ts`, `apiClient.ts` |
| Types | `camelCase.ts` | `auth.ts`, `menu.ts` |
| Utils / Lib | `camelCase.ts` | `storage.ts`, `progress.ts` |
| Config | `camelCase.ts` | `env.ts`, `themeConfig.ts` |
| Constants | `camelCase.ts` | `apiEndpoints.ts`, `routes.ts` |
| SCSS | theo component `PascalCase.scss` | `Header.scss`, `Login.scss` |
| SCSS partial | `_` prefix | `_theme.scss` |
| Barrel export | luôn `index.ts` | `index.ts` |
| Slice (folder) | `kebab-case` | `shipping-plan/`, `master-data/` |
| Segment (folder) | lowercase | `ui/`, `model/`, `api/`, `lib/` |

---

## Scripts

```bash
yarn dev          # Chạy dev server (Vite)
yarn build        # Build production (tsc + vite build)
yarn preview      # Preview production build
yarn lint         # ESLint fix + Prettier format
```

---

## Path Alias

Alias `@` trỏ tới `src/`:

```ts
import { useAuth } from '@/features/auth';
// tương đương: import { useAuth } from 'src/features/auth';
```

Cấu hình trong `vite.config.ts` và `tsconfig.app.json`.

---

## Tài liệu tham khảo

| Tài liệu | Link |
| --- | --- |
| FSD Official Docs | <https://feature-sliced.design/docs/get-started/overview> |
| FSD Tutorial | <https://feature-sliced.design/docs/get-started/tutorial> |
| FSD Examples | <https://feature-sliced.design/examples> |
| FSD GitHub | <https://github.com/feature-sliced> |
| Steiger (FSD Linter) | <https://github.com/feature-sliced/steiger> |
| FSD Discord | <https://discord.gg/S8MzWTUsmp> |
| React Official Docs | <https://react.dev> |
| Ant Design 6 | <https://ant.design/components/overview> |
| Redux Toolkit | <https://redux-toolkit.js.org> |
| TanStack React Query | <https://tanstack.com/query/latest> |
| React Router v7 | <https://reactrouter.com> |
| Vite | <https://vite.dev> |
| Zod | <https://zod.dev> |
