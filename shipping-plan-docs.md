# Shipping Plan — Tài liệu kiến trúc & cấu hình dự án

> React 19 · Vite 7 · Redux Toolkit · React Query · Ant Design 6  
> Kiến trúc: **FSD-inspired** (Feature-Sliced Design) — [feature-sliced.design](https://feature-sliced.design)  
> Phiên bản 3.0

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
12. [Tôi đang tạo file mới — để ở đâu?](#12-tôi-đang-tạo-file-mới--để-ở-đâu)

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

Codebase chia thành 5 layer, xếp theo thứ bậc từ cao xuống thấp.

```
app          ← khởi tạo ứng dụng, chạy 1 lần
  ↓
pages        ← route entry points
  ↓
features     ← business logic slices
  ↓
widgets      ← composite UI blocks
  ↓
shared       ← không biết business, dùng ở mọi nơi
```

> **Quy tắc cốt lõi:** một layer chỉ được import từ layer thấp hơn nó — không bao giờ import ngược lên trên.

| # | Layer | Nằm ở | Vai trò |
|---|---|---|---|
| 1 | app | `src/app/` | Khởi tạo app: providers, router, global styles |
| 2 | pages | `src/pages/` | Route entry points — kết nối URL với feature |
| 3 | features | `src/features/` | Business logic slices — state, query, types |
| 4 | widgets | `src/widgets/` | Composite UI blocks dùng nhiều nơi |
| 5 | shared | `src/shared/` | Không biết business — dùng ở mọi layer |

---

### Layer 1 — `app/`

`app/` là layer cao nhất — chứa những thứ **chạy một lần duy nhất khi app boot**. Nhờ vậy `main.tsx` chỉ còn 3 dòng và không bao giờ phình to.

```
src/app/
├── App.tsx              ← root component, gắn providers + router
├── providers/
│   ├── index.tsx        ← gộp tất cả providers vào một chỗ
│   ├── QueryProvider.tsx
│   ├── ReduxProvider.tsx
│   ├── ThemeProvider.tsx
│   └── RouterProvider.tsx
├── router/
│   ├── index.tsx        ← createBrowserRouter
│   ├── PrivateRoute.tsx
│   └── LazyRoutes.tsx
└── styles/
    ├── global.scss
    ├── antd.override.scss
    └── variables.scss
```

`main.tsx` khi đó rất gọn:

```tsx
// main.tsx
import React    from 'react';
import ReactDOM from 'react-dom/client';
import { App }  from '@/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`App.tsx` kết nối providers và router:

```tsx
// app/App.tsx
import { RouterProvider } from 'react-router-dom';
import { Providers }      from './providers';
import { router }         from './router';

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
```

`Providers` gộp hết vào một chỗ, tránh lồng nhau nhiều tầng trong `main.tsx`:

```tsx
// app/providers/index.tsx
import { Provider }             from 'react-redux';
import { PersistGate }          from 'redux-persist/integration/react';
import { QueryClientProvider }  from '@tanstack/react-query';
import { ConfigProvider }       from 'antd';
import { store, persistor }     from '@/shared/store';
import { queryClient }          from '@/shared/api/queryClient';
import { antdTheme }            from './ThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider theme={antdTheme}>
            {children}
          </ConfigProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
```

---

### Layer 2 — `pages/`

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

Một page điển hình:

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

### Layer 3 — `features/`

Features là trái tim của codebase. Mỗi feature là một **vertical slice** — tự chứa đủ state, data-fetching, types, và UI components nhỏ của riêng mình. Features không biết `app`, `pages` hay `widgets` tồn tại.

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

> **Nguyên tắc:** Import từ feature luôn qua `index.ts`.  
> ✅ `import { ShippingPlanTable } from '@/features/shipping-plan'`  
> ❌ `import { PlanTable } from '@/features/shipping-plan/components/PlanTable'`

---

### Layer 4 — `widgets/`

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

> **Khi nào đưa vào widgets:** Nếu component chỉ dùng trong 1 feature — để trong `features/ten-feature/components/`. Nếu dùng ở **2 feature trở lên** — chuyển lên `widgets/`.

---

### Layer 5 — `shared/`

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
├── main.tsx                     ← 3 dòng, chỉ mount App
│
├── app/                         ← layer 1: khởi tạo app
│   ├── App.tsx
│   ├── providers/
│   │   ├── index.tsx
│   │   ├── QueryProvider.tsx
│   │   ├── ReduxProvider.tsx
│   │   └── ThemeProvider.tsx
│   ├── router/
│   │   ├── index.tsx
│   │   ├── PrivateRoute.tsx
│   │   └── LazyRoutes.tsx
│   └── styles/
│       ├── global.scss
│       ├── antd.override.scss
│       └── variables.scss
│
├── pages/                       ← layer 2: route entry points
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
├── features/                    ← layer 3: business logic
│   ├── auth/
│   ├── shipping-plan/
│   ├── shipment-tracking/
│   ├── shipping-advice/
│   └── master-data/
│
├── widgets/                     ← layer 4: composite UI
│   ├── layout/
│   ├── navigation/
│   └── data-display/
│
└── shared/                      ← layer 5: foundation
    ├── api/
    ├── ui/
    ├── lib/
    ├── hooks/
    ├── store/
    └── config/
```

---

## 4. So sánh cũ vs mới

| | Cũ | Mới (FSD-inspired) |
|---|---|---|
| Khởi tạo app | Providers rải rác trong `main.tsx` | `app/providers/` — một chỗ duy nhất |
| Router config | `routes/` ở root `src/` | `app/router/` — app-level concern |
| Global styles | `styles/` ở root `src/` | `app/styles/` — thuộc app layer |
| Page | `features/shipping-plan/ShippingPlanPage.tsx` | `pages/ShippingPlanPage.tsx` — layer riêng, mỏng |
| Layout | `components/layout/AppLayout.tsx` | `widgets/layout/AppLayout.tsx` |
| Service | `services/shippingPlan.service.ts` | `shared/api/` + gọi trong `features/*/query.ts` |
| Utils | `utils/` ở root `src/` | `shared/lib/` |
| Types shared | `types/` ở root `src/` | `shared/` + `features/*/types.ts` |
| Constants | `constants/` ở root `src/` | `shared/config/` |
| Import rule | Không có quy tắc, dễ circular import | Rõ ràng: `app → pages → features → shared` |

---

## 5. Routing

### `app/router/index.tsx`

```tsx
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense }      from 'react';
import { ROUTES }              from '@/shared/config/routes';
import { AppLayout }           from '@/widgets/layout';
import { PrivateRoute }        from './PrivateRoute';
import { LoadingSpinner }      from '@/shared/ui';

const wrap = (C: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingSpinner />}><C /></Suspense>
);

const DashboardPage           = lazy(() => import('@/pages/DashboardPage'));
const ShippingPlanPage        = lazy(() => import('@/pages/ShippingPlanPage'));
const SerialShippingPage      = lazy(() => import('@/pages/SerialShippingPage'));
const SampleShippingPage      = lazy(() => import('@/pages/SampleShippingPage'));
const TrackingAirPage         = lazy(() => import('@/pages/TrackingAirPage'));
const TrackingSeaPage         = lazy(() => import('@/pages/TrackingSeaPage'));
const TrackingInTransitPage   = lazy(() => import('@/pages/TrackingInTransitPage'));
const TrackingArrivedPage     = lazy(() => import('@/pages/TrackingArrivedPage'));
const ShippingAdvicePage      = lazy(() => import('@/pages/ShippingAdvicePage'));
const EndCustomerPage         = lazy(() => import('@/pages/EndCustomerPage'));
const TransitLeadTimePage     = lazy(() => import('@/pages/TransitLeadTimePage'));
const MasterDataOverviewPage  = lazy(() => import('@/pages/MasterDataOverviewPage'));
const ManualAddPage           = lazy(() => import('@/pages/ManualAddPage'));
const ImportByFilePage        = lazy(() => import('@/pages/ImportByFilePage'));
const LoginPage               = lazy(() => import('@/pages/LoginPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><AppLayout /></PrivateRoute>,
    children: [
      { index: true,                          element: wrap(DashboardPage) },
      { path: ROUTES.SHIPPING_PLAN,           element: wrap(ShippingPlanPage) },
      { path: ROUTES.SERIAL_SHIPPING,         element: wrap(SerialShippingPage) },
      { path: ROUTES.SAMPLE_SHIPPING,         element: wrap(SampleShippingPage) },
      { path: ROUTES.TRACKING_AIR,            element: wrap(TrackingAirPage) },
      { path: ROUTES.TRACKING_SEA,            element: wrap(TrackingSeaPage) },
      { path: ROUTES.TRACKING_IN_TRANSIT,     element: wrap(TrackingInTransitPage) },
      { path: ROUTES.TRACKING_ARRIVED,        element: wrap(TrackingArrivedPage) },
      { path: ROUTES.SHIPPING_ADVICE,         element: wrap(ShippingAdvicePage) },
      { path: ROUTES.MASTER_END_CUSTOMER,     element: wrap(EndCustomerPage) },
      { path: ROUTES.MASTER_LEAD_TIME,        element: wrap(TransitLeadTimePage) },
      { path: ROUTES.MASTER_PART_OVERVIEW,    element: wrap(MasterDataOverviewPage) },
      { path: ROUTES.MASTER_PART_ADD,         element: wrap(ManualAddPage) },
      { path: ROUTES.MASTER_PART_IMPORT,      element: wrap(ImportByFilePage) },
    ],
  },
  { path: ROUTES.LOGIN, element: wrap(LoginPage) },
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
import axios     from 'axios';
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
  res => { NProgress.done(); return res; },
  err => { NProgress.done(); return Promise.reject(err); }
);

export default api;
```

### Pattern query hook trong feature

```ts
// features/shipping-plan/shippingPlan.query.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api            from '@/shared/api/axiosInstance';
import { QUERY_KEYS } from '@/shared/config/queryKeys';
import type { ShippingPlan, CreatePlanDto, PlanFilters } from './shippingPlan.types';

export function useShippingPlans(filters: PlanFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.shippingPlan.list(filters),
    queryFn:  () => api.get<ShippingPlan[]>('/shipping-plans', { params: filters })
                       .then(r => r.data),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreatePlan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePlanDto) => api.post('/shipping-plans', dto),
    onSuccess:  () => qc.invalidateQueries({
      queryKey: QUERY_KEYS.shippingPlan.all(),
    }),
  });
}
```

### `shared/config/queryKeys.ts`

```ts
export const QUERY_KEYS = {
  shippingPlan: {
    all:    () => ['shippingPlan'] as const,
    list:   (f: PlanFilters) => [...QUERY_KEYS.shippingPlan.all(), 'list', f]    as const,
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
- `app/` chỉ import từ `widgets/`, `features/`, `shared/`
- `pages/` chỉ import từ `features/` và `widgets/`
- `features/` chỉ import từ `shared/`
- `widgets/` chỉ import từ `shared/`
- `shared/` không import từ bất kỳ layer nào khác

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
- [ ] `main.tsx` không chứa gì ngoài mount `<App />`
- [ ] Providers mới được thêm vào `app/providers/` — không thêm trực tiếp vào `main.tsx`
- [ ] Page không chứa `useQuery` hay `dispatch` — chỉ render
- [ ] `app/` không import từ `pages/`
- [ ] `features/` không import từ `app/`, `pages/`, `widgets/`
- [ ] `widgets/` không import từ `app/`, `pages/`, `features/`
- [ ] `shared/` không import từ bất kỳ layer nào khác
- [ ] Import từ feature qua `index.ts` — không import trực tiếp vào file trong feature
- [ ] Component dùng ở 2+ feature đã được chuyển lên `widgets/`
- [ ] Query key mới đã thêm vào `shared/config/queryKeys.ts`
- [ ] Route mới đã thêm vào `shared/config/routes.ts` và `app/router/index.tsx`
- [ ] `.env` chưa bị commit

---

## 12. Tôi đang tạo file mới — để ở đâu?

Dùng flowchart này để tự quyết định mà không cần hỏi. Đọc từ trên xuống, dừng ở câu hỏi đầu tiên khớp với file bạn đang tạo.

```
Nó chạy 1 lần khi app boot?
(provider, router config, global style)
  → app/

Nó là một route — tương ứng với 1 URL?
  → pages/

Nó là logic của 1 feature cụ thể?
(state, API call, type)
  → features/ten-feature/

Nó là UI nhỏ, chỉ dùng trong 1 feature?
(form, row, badge riêng của feature đó)
  → features/ten-feature/components/

Nó là UI block lớn, dùng ở 2+ feature hoặc nhiều page?
(layout, sidebar, table tổng quát)
  → widgets/

Nó không biết gì về business, dùng ở mọi nơi?
(axios instance, format date, useDebounce, Button, Spinner)
  → shared/
```

---

### Ví dụ thực tế

| Tôi đang tạo... | Để ở |
|---|---|
| Ant Design theme config | `app/providers/ThemeProvider.tsx` |
| Trang danh sách lô hàng | `pages/ShippingPlanPage.tsx` |
| Bảng hiển thị danh sách plan | `features/shipping-plan/components/PlanTable.tsx` |
| Hook gọi API lấy danh sách plan | `features/shipping-plan/shippingPlan.query.ts` |
| Type `ShippingPlan` | `features/shipping-plan/shippingPlan.types.ts` |
| Sidebar navigation | `widgets/navigation/Sidebar.tsx` |
| Table dùng ở cả tracking lẫn master-data | `widgets/data-display/DataTable.tsx` |
| Hàm format ngày tháng | `shared/lib/formatDate.ts` |
| Hook `useDebounce` | `shared/hooks/useDebounce.ts` |
| Axios instance | `shared/api/axiosInstance.ts` |
| Constant `ROUTES` | `shared/config/routes.ts` |

---

### Vẫn không chắc?

Hỏi 3 câu này theo thứ tự:

**1. File này có biết về business domain không?**
- Không biết gì → `shared/`
- Có biết → tiếp tục

**2. File này dùng ở bao nhiêu feature?**
- Chỉ 1 feature → vào trong `features/ten-feature/`
- 2+ feature hoặc không thuộc feature nào → tiếp tục

**3. File này là UI hay là logic app-level?**
- UI block lớn → `widgets/`
- Logic khởi tạo app → `app/`
- Route entry point → `pages/`

---

*Shipping Plan — Tài liệu nội bộ · Phiên bản 3.0 · Kiến trúc FSD-inspired*