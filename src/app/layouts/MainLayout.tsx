import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Layout } from 'antd';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/widgets/header';
import { RootState } from '@/app/store';
import { setSidebarCollapsed } from '@/app/store';
import { Sidebar } from '@/widgets/sidebar';
import { useAuth } from '@/features/auth';
import { useRouteProgress, usePageTitle } from '@/shared/hooks';
import { ROUTES, ROUTE_BREADCRUMBS } from '@/shared/constants';
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

  const isDashboard = location.pathname === ROUTES.DASHBOARD;

  const breadcrumbItems = React.useMemo(() => {
    const trail = ROUTE_BREADCRUMBS[location.pathname];
    if (!trail) return [];
    const items: { title: React.ReactNode }[] = [{ title: <Link to={ROUTES.DASHBOARD}>Home</Link> }];
    trail.forEach(({ label, path }, idx) => {
      const isLast = idx === trail.length - 1;
      items.push({ title: isLast || !path ? label : <Link to={path}>{label}</Link> });
    });
    return items;
  }, [location.pathname]);

  return (
    <Layout className={`main-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} />
      <Layout className="layout-right">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} onLogout={handleLogout} />
        <Content className="main-content">
          {!isDashboard && breadcrumbItems.length > 0 && (
            <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
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
