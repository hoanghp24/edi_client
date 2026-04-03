# Shipping Plan — Tài liệu kiến trúc & cấu hình dự án

> React 19 · Vite 7 · Redux Toolkit · React Query · Ant Design 6  
> Kiến trúc: **FSD-inspired** (Feature-Sliced Design) — [feature-sliced.design](https://feature-sliced.design)  
> Phiên bản 2.0

---

## Mục lục

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Kiến trúc Layer](#2-kiến-trúc-layer)
3. [Cấu trúc thư mục đầy đủ](#3-cấu-trúc-thư-mục-đầy-đủ)
4. [So sánh cũ vs mới](#4-so-sánh-cũ-vs-mới)
5. [Routing](#5-routing)
6. [API & Query Patterns](#6-api--query-patterns)
7. [State Management](#7-state-management)
8. [Các file cấu hình ở root](#8-các-file-cấu-hình-ở-root)
9. [Quy ước code](#9-quy-ước-code)
10. [Scripts](#10-scripts)
11. [Checklist trước khi merge PR](#11-checklist-trước-khi-merge-pr)

---

## 1. Tổng quan dự án

Dự án sử dụng kiến trúc **FSD-inspired** — lấy cảm hứng từ Feature-Sliced Design, một methodology có tài liệu rõ ràng tại [feature-sliced.design](https://feature-sliced.design). Nguyên tắc cốt lõi: codebase được tổ chức thành các layer có thứ bậc, **import chỉ đi từ layer cao xuống layer thấp**, không bao giờ ngược lại.

| Hạng mục | Công nghệ | Phiên bản |
|---|---|---|
| Framework UI | React | 19.x |
| Build tool | Vite | 7.x |
| Ngôn ngữ | TypeScript | 5.9+ |
| UI Library | Ant Design | 6.x |
| State management | Redux Toolkit + redux-persist | 2.x |
| Data fetching | React Query (@tanstack) | 5.x |
| HTTP Client | Axios + NProgress | 1.x |
| Animation | Framer Motion | 12.x |
| Routing | React Router DOM | 7.x |
| Styling | SCSS Modules | — |
| Linting / Format | ESLint + Prettier | 10.x / 3.x |
| Package manager | Yarn | latest |
| Kiến trúc | FSD-inspired | feature-sliced.design |

---

## 2. Kiến trúc Layer

Codebase chia thành 4 layer, xếp theo thứ bậc từ cao xuống thấp.

```
pages        ← biết về features và widgets
  ↓
features     ← biết về shared
  ↓
widgets      ← biết về shared
  ↓
shared       ← không biết ai
```

> **Quy tắc cốt lõi:** một layer chỉ được import từ layer thấp hơn nó — không bao giờ import ngược lên trên.

| # | Layer | Nằm ở | Vai trò |
|---|---|---|---|
| 1 | pages | `src/pages/` | Route entry points — kết nối URL với feature |
| 2 | features | `src/features/` | Business logic slices — state, query, types |
| 3 | widgets | `src/widgets/` | Composite UI blocks dùng nhiều nơi |
| 4 | shared | `src/shared/` | Không biết business — dùng ở mọi layer |

---

### Layer 1 — `pages/`

Pages là layer **mỏng nhất**. Mỗi file tương ứng với một route. Pages không chứa business logic — chỉ lắp ghép features và widgets lại với nhau.

```
src/pages/
├── DashboardPage.tsx
├── ShippingPlanPage.tsx
├── SerialShippingPage.tsx
├── SampleShippingPage.tsx
├── TrackingAirPage.tsx
├── TrackingSeaPage.tsx
├── TrackingInTransitPage.tsx
├── TrackingArrivedPage.tsx
├── ShippingAdvicePage.tsx
├── EndCustomerPage.tsx
├── TransitLeadTimePage.tsx
├── MasterDataOverviewPage.tsx
├── ManualAddPage.tsx
├── ImportByFilePage.tsx
└── LoginPage.tsx
```

Một page điển hình trông như thế này:

```tsx
// pages/ShippingPlanPage.tsx
import { PageContainer }       from '@/widgets/layout';
import { ShippingPlanTable }   from '@/features/shipping-plan';
import { ShippingPlanFilters } from '@/features/shipping-plan';

export function ShippingPlanPage() {
  return (
    <PageContainer title="Shipping Plan">
      <ShippingPlanFilters />
      <ShippingPlanTable />
    </PageContainer>
  );
}
```

> **Nguyên tắc:** Page không gọi `useQuery`, không `dispatch` action Redux. Toàn bộ logic nằm trong feature — page chỉ render.

---

### Layer 2 — `features/`

Features là trái tim của codebase. Mỗi feature là một **vertical slice** — tự chứa đủ state, data-fetching, types, và UI components nhỏ của riêng mình. Features không biết `pages` hay `widgets` tồn tại.

```
src/features/
├── auth/
│   ├── auth.slice.ts
│   ├── auth.query.ts
│   ├── auth.types.ts
│   └── index.ts
│
├── shipping-plan/
│   ├── components/              ← UI nhỏ chỉ dùng trong feature này
│   │   ├── PlanTable.tsx
│   │   ├── PlanFilterBar.tsx
│   │   └── PlanFormModal.tsx
│   ├── shippingPlan.slice.ts
│   ├── shippingPlan.query.ts
│   ├── shippingPlan.types.ts
│   └── index.ts                 ← public API của feature
│
├── shipment-tracking/
│   ├── components/
│   │   ├── TrackingTable.tsx
│   │   └── StatusBadge.tsx
│   ├── tracking.slice.ts
│   ├── tracking.query.ts
│   ├── tracking.types.ts
│   └── index.ts
│
├── shipping-advice/
│   ├── shippingAdvice.query.ts
│   └── index.ts
│
└── master-data/
    ├── components/
    │   ├── PartTable.tsx
    │   └── ImportUploader.tsx
    ├── masterData.slice.ts
    ├── masterData.query.ts
    ├── masterData.types.ts
    └── index.ts
```

**Cấu trúc bên trong mỗi feature:**

| File | Nội dung |
|---|---|
| `components/` | UI components chỉ dùng riêng trong feature — không export ra ngoài trực tiếp |
| `*.slice.ts` | Redux slice: state shape, reducers, selectors |
| `*.query.ts` | `useQuery` / `useMutation` hooks gọi API |
| `*.types.ts` | TypeScript types của riêng feature |
| `index.ts` | Public API — chỉ export những gì layer trên cần dùng |

`index.ts` kiểm soát những gì feature cho phép bên ngoài thấy:

```ts
// features/shipping-plan/index.ts
export { ShippingPlanTable }   from './components/PlanTable';
export { ShippingPlanFilters } from './components/PlanFilterBar';
export { useShippingPlans }    from './shippingPlan.query';
export { useCreatePlan }       from './shippingPlan.query';
export type { ShippingPlan }   from './shippingPlan.types';

// PlanFormModal KHÔNG export — internal only
// shippingPlan.slice KHÔNG export trực tiếp — đi qua store
```

> **Nguyên tắc:** Import từ feature luôn qua `index.ts`. Không bao giờ import trực tiếp vào file bên trong:  
> ✅ `import { ShippingPlanTable } from '@/features/shipping-plan'`  
> ❌ `import { PlanTable } from '@/features/shipping-plan/components/PlanTable'`

---

### Layer 3 — `widgets/`

Widgets là các UI block lớn, tái sử dụng ở nhiều page, nhưng không phải atom UI đơn giản. Khác với `shared/ui` là widgets có thể biết về routing, layout context, hoặc kết hợp nhiều concerns.

```
src/widgets/
├── layout/
│   ├── AppLayout.tsx        ← shell chính: sidebar + header + outlet
│   ├── PageContainer.tsx    ← wrapper thêm padding, page title
│   └── index.ts
│
├── navigation/
│   ├── Sidebar.tsx          ← menu tree theo cấu trúc routes
│   ├── Header.tsx           ← breadcrumb, avatar, notifications
│   └── index.ts
│
└── data-display/
    ├── DataTable.tsx        ← Ant Design Table + pagination + empty state
    ├── StatCard.tsx         ← card số liệu dashboard
    └── index.ts
```

> **Khi nào đưa vào widgets:** Nếu một component chỉ dùng trong 1 feature — để trong `features/ten-feature/components/`. Nếu dùng ở **2 feature trở lên** — chuyển lên `widgets/`.

---

### Layer 4 — `shared/`

Shared là tầng nền tảng — **không biết gì về business logic** của dự án. Mọi thứ ở đây đều có thể copy sang dự án khác mà không cần sửa.

```
src/shared/
├── api/
│   ├── axiosInstance.ts     ← base URL, interceptors, NProgress
│   └── queryClient.ts       ← React Query client config
│
├── ui/
│   ├── LoadingSpinner.tsx
│   ├── ErrorBoundary.tsx
│   ├── ConfirmModal.tsx
│   └── UploadDragger.tsx
│
├── lib/
│   ├── formatDate.ts        ← dayjs helpers
│   ├── formatNumber.ts
│   └── handleError.ts
│
├── hooks/
│   ├── useDebounce.ts
│   └── useTableFilter.ts
│
├── store/
│   ├── index.ts             ← configureStore + persistStore
│   └── rootReducer.ts
│
└── config/
    ├── routes.ts            ← ROUTES constants
    ├── queryKeys.ts         ← React Query key factory
    └── env.ts               ← import.meta.env wrappers
```

> **Nguyên tắc:** `shared/ui` chỉ chứa atom UI không có business logic. `Button`, `Spinner`, `ConfirmModal` chung — không phải `PlanTable` hay `TrackingBadge`.

---

## 3. Cấu trúc thư mục đầy đủ

```
src/
├── main.tsx
├── App.tsx
├── vite-env.d.ts
│
├── pages/                       ← layer 1
│   ├── DashboardPage.tsx
│   ├── ShippingPlanPage.tsx
│   ├── SerialShippingPage.tsx
│   ├── SampleShippingPage.tsx
│   ├── TrackingAirPage.tsx
│   ├── TrackingSeaPage.tsx
│   ├── TrackingInTransitPage.tsx
│   ├── TrackingArrivedPage.tsx
│   ├── ShippingAdvicePage.tsx
│   ├── EndCustomerPage.tsx
│   ├── TransitLeadTimePage.tsx
│   ├── MasterDataOverviewPage.tsx
│   ├── ManualAddPage.tsx
│   ├── ImportByFilePage.tsx
│   └── LoginPage.tsx
│
├── features/                    ← layer 2
│   ├── auth/
│   ├── shipping-plan/
│   ├── shipment-tracking/
│   ├── shipping-advice/
│   └── master-data/
│
├── widgets/                     ← layer 3
│   ├── layout/
│   ├── navigation/
│   └── data-display/
│
├── shared/                      ← layer 4
│   ├── api/
│   ├── ui/
│   ├── lib/
│   ├── hooks/
│   ├── store/
│   └── config/
│
└── routes/
    ├── index.tsx                ← createBrowserRouter
    ├── PrivateRoute.tsx
    └── LazyRoutes.tsx
```

---

## 4. So sánh cũ vs mới

| | Cũ | Mới (FSD-inspired) |
|---|---|---|
| Page | `features/shipping-plan/ShippingPlanPage.tsx` | `pages/ShippingPlanPage.tsx` — layer riêng, mỏng |
| Layout | `components/layout/AppLayout.tsx` | `widgets/layout/AppLayout.tsx` |
| Service | `services/shippingPlan.service.ts` | `shared/api/` + gọi trong `features/*/query.ts` |
| Utils | `utils/` ở root `src/` | `shared/lib/` |
| Types shared | `types/` ở root `src/` | `shared/` + `features/*/types.ts` |
| Constants | `constants/` ở root `src/` | `shared/config/` |
| Import rule | Không có quy tắc, dễ circular import | Rõ ràng: `pages → features → shared` |

---

## 5. Routing

### `routes/index.tsx`

```tsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense }      from 'react';
import { ROUTES }              from '@/shared/config/routes';
import { AppLayout }           from '@/widgets/layout';
import { PrivateRoute }        from './PrivateRoute';

const DashboardPage    = lazy(() => import('@/pages/DashboardPage'));
const ShippingPlanPage = lazy(() => import('@/pages/ShippingPlanPage'));
// ... các page khác

const wrap = (C: React.ComponentType) => (
  <Suspense fallback={<Spinner />}><C /></Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><AppLayout /></PrivateRoute>,
    children: [
      { index: true,                element: wrap(DashboardPage) },
      { path: ROUTES.SHIPPING_PLAN, element: wrap(ShippingPlanPage) },
      // ...
    ],
  },
  { path: ROUTES.LOGIN, element: <LoginPage /> },
]);
```

### `shared/config/routes.ts`

```ts
export const ROUTES = {
  DASHBOARD:            '/',
  LOGIN:                '/login',
  SHIPPING_PLAN:        '/shipping-plan',
  SERIAL_SHIPPING:      '/shipping-plan/serial',
  SAMPLE_SHIPPING:      '/shipping-plan/sample',
  TRACKING_AIR:         '/tracking/air',
  TRACKING_SEA:         '/tracking/sea',
  TRACKING_IN_TRANSIT:  '/tracking/in-transit',
  TRACKING_ARRIVED:     '/tracking/arrived',
  SHIPPING_ADVICE:      '/shipping-advice',
  MASTER_END_CUSTOMER:  '/master-data/end-customer',
  MASTER_LEAD_TIME:     '/master-data/transit-lead-time',
  MASTER_PART_OVERVIEW: '/master-data/part/overview',
  MASTER_PART_ADD:      '/master-data/part/add',
  MASTER_PART_IMPORT:   '/master-data/part/import',
} as const;
```

---

## 6. API & Query Patterns

### `shared/api/axiosInstance.ts`

```ts
import axios    from 'axios';
import NProgress from 'nprogress';
import { store } from '@/shared/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30_000,
});

api.interceptors.request.use(config => {
  NProgress.start();
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res  => { NProgress.done(); return res; },
  err  => { NProgress.done(); return Promise.reject(err); }
);

export default api;
```

### Pattern query hook trong feature

```ts
// features/shipping-plan/shippingPlan.query.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api            from '@/shared/api/axiosInstance';
import { QUERY_KEYS } from '@/shared/config/queryKeys';
import type { ShippingPlan } from './shippingPlan.types';

export function useShippingPlans(filters: PlanFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.shippingPlan.list(filters),
    queryFn:  () => api.get('/shipping-plans', { params: filters })
                       .then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePlanDto) => api.post('/shipping-plans', dto),
    onSuccess:  () => qc.invalidateQueries({
      queryKey: QUERY_KEYS.shippingPlan.all()
    }),
  });
}
```

### `shared/config/queryKeys.ts`

```ts
export const QUERY_KEYS = {
  shippingPlan: {
    all:    () => ['shippingPlan'] as const,
    list:   (f: PlanFilters) => [...QUERY_KEYS.shippingPlan.all(), 'list', f]   as const,
    detail: (id: string)     => [...QUERY_KEYS.shippingPlan.all(), 'detail', id] as const,
  },
  tracking: {
    all:  () => ['tracking'] as const,
    list: (p: TrackingParams) => [...QUERY_KEYS.tracking.all(), p] as const,
  },
  masterData: {
    all:   () => ['masterData'] as const,
    parts: () => [...QUERY_KEYS.masterData.all(), 'parts'] as const,
  },
} as const;
```

---

## 7. State Management

### Redux vs React Query

| Redux Toolkit | React Query |
|---|---|
| Auth: token, user info, permissions | Fetch list / detail từ API |
| UI state: sidebar, modal, active tab | CRUD mutations + cache invalidation |
| Filters đang chọn (persist qua navigate) | Loading / error states của API calls |
| Persist qua reload (redux-persist) | Pagination, infinite scroll, prefetch |

### `shared/store/index.ts`

```ts
import { configureStore }              from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage                          from 'redux-persist/lib/storage';
import rootReducer                      from './rootReducer';

const persistConfig = {
  key: 'root', storage,
  whitelist: ['auth'],  // chỉ persist auth
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: gDM => gDM({ serializableCheck: false }),
});

export const persistor  = persistStore(store);
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## 8. Các file cấu hình ở root

| File | Mô tả |
|---|---|
| `.env` | Biến môi trường local — **không commit** |
| `.env.example` | Template keys — commit làm tài liệu |
| `.gitignore` | Loại `node_modules`, `dist`, `.env` khỏi git |
| `.prettierrc` | `singleQuote`, `printWidth: 100`, `trailingComma: 'es5'` |
| `eslint.config.js` | Flat Config ESLint 10+, typescript-eslint, unused-imports |
| `GEMINI.md` | Context file cho AI assistant — mô tả kiến trúc và quy ước |
| `index.html` | Entry point Vite, `lang="vi"`, inject script vào `#root` |
| `tsconfig.json` | Root — chỉ chứa `references` tới 2 file con |
| `tsconfig.app.json` | Compile `src/`, `strict: true`, path alias `@/*` |
| `tsconfig.node.json` | Compile `vite.config.ts`, Node environment |
| `vite.config.ts` | Alias `@/`, proxy `/api`, `manualChunks` vendor |
| `yarn.lock` | Lockfile — luôn commit, không chỉnh tay |

### `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import path             from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-antd':  ['antd', '@ant-design/icons'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
});
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### `eslint.config.js`

```js
import js            from '@eslint/js';
import tseslint      from 'typescript-eslint';
import reactHooks    from 'eslint-plugin-react-hooks';
import reactRefresh  from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier      from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      'react-hooks':    reactHooks,
      'react-refresh':  reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      'react-hooks/rules-of-hooks':           'error',
      'react-hooks/exhaustive-deps':           'warn',
      'react-refresh/only-export-components':  'warn',
      'unused-imports/no-unused-imports':      'error',
      'unused-imports/no-unused-vars': ['warn', {
        vars: 'all', varsIgnorePattern: '^_',
        args: 'after-used', argsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars':  'off',
    },
  },
  prettier, // phải đặt cuối cùng
);
```

---

## 9. Quy ước code

### Đặt tên

| Loại | Convention | Ví dụ |
|---|---|---|
| Component | PascalCase | `ShippingPlanTable.tsx`, `AppLayout.tsx` |
| Hook | camelCase + prefix `use` | `useShippingPlans`, `useDebounce` |
| Slice | suffix `.slice.ts` | `shippingPlan.slice.ts` |
| Query hooks | suffix `.query.ts` | `shippingPlan.query.ts` |
| Types | suffix `.types.ts` | `shippingPlan.types.ts` |
| Constants | UPPER_SNAKE_CASE | `ROUTES.DASHBOARD` |
| Folder feature | kebab-case | `shipping-plan`, `master-data` |

### Import rules

- Luôn dùng alias `@/` — không dùng đường dẫn tương đối `../../`
- Import từ feature qua `index.ts` — không import thẳng vào file bên trong
- `pages/` chỉ import từ `features/` và `widgets/`
- `features/` chỉ import từ `shared/`
- `shared/` không import từ `features/`, `widgets/`, `pages/`

### TypeScript

- `strict: true` — bắt buộc, không tắt
- Không dùng `any` — dùng `unknown` nếu type chưa xác định
- Type riêng của feature nằm trong `features/*/types.ts`
- Type shared nằm trong `shared/` (`ApiResponse<T>`, `PaginatedResponse<T>` ...)

---

## 10. Scripts

| Lệnh | Mô tả |
|---|---|
| `yarn dev` | Dev server Vite HMR port 5173 |
| `yarn build` | TypeScript compile + production build |
| `yarn preview` | Preview production build local |
| `yarn lint` | ESLint fix + Prettier format toàn bộ `src/` |

---

## 11. Checklist trước khi merge PR

- [ ] `yarn lint` không còn warning/error
- [ ] `yarn build` thành công, không có TypeScript error
- [ ] Không có `console.log` sót
- [ ] Page không chứa `useQuery` hay `dispatch` — chỉ render
- [ ] Feature không import từ `pages/` hay `widgets/`
- [ ] `shared/` không import từ `features/`, `widgets/`, `pages/`
- [ ] Import từ feature qua `index.ts` — không import trực tiếp vào file trong feature
- [ ] Component dùng ở 2+ feature đã được chuyển lên `widgets/`
- [ ] Query key mới đã thêm vào `shared/config/queryKeys.ts`
- [ ] Route mới đã thêm vào `shared/config/routes.ts` và `routes/index.tsx`
- [ ] `.env` chưa bị commit

---

*Shipping Plan — Tài liệu nội bộ · Phiên bản 2.0 · Kiến trúc FSD-inspired*
