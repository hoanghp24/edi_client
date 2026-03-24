import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from 'antd';

export function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          fontFamily: "'Inter', -apple-system, sans-serif",
          borderRadius: 4,
        },
        components: {
          Menu: {
            collapsedWidth: 80,
          },
          Layout: {
            siderBg: '#ffffff',
            headerBg: '#ffffff',
          }
        }
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
