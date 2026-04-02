import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './api/queryClient';
import { AppRoutes } from './routes/AppRoutes';
import { ConfigProvider } from 'antd';
import { themeConfig } from './theme/themeConfig';
import { ErrorBoundary } from './components/common/ErrorBoundary/ErrorBoundary';

export function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
