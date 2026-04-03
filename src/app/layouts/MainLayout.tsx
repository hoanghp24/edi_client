import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/widgets/header';
import { RootState } from '@/app/store';
import { setSidebarCollapsed } from '@/app/store';
import { Sidebar } from '@/widgets/sidebar';
import { useAuth } from '@/features/auth';
import { useRouteProgress, usePageTitle } from '@/shared/hooks';
import './MainLayout.scss';

const { Content } = Layout;

export const MainLayout = () => {
  useRouteProgress();
  usePageTitle(); 
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.ui.sidebarCollapsed);
  
  const setCollapsed = (val: boolean) => dispatch(setSidebarCollapsed(val));
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Layout className={`main-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} />
      <Layout className="layout-right">
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onLogout={handleLogout} 
        />
        <Content className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
