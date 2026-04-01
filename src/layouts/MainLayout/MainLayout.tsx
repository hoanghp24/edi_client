import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../header/Header';
import { RootState } from '../../state/store';
import { setSidebarCollapsed } from '../../state/uiSlice';
import { Sidebar } from '../sidebar/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { SplashScreen } from '../../components/common/SplashScreen/SplashScreen';
import { useRouteProgress } from '../../hooks/useRouteProgress';
import './MainLayout.scss';

const { Content } = Layout;

export const MainLayout = () => {
  useRouteProgress();
  const dispatch = useDispatch();
  const collapsed = useSelector((state: RootState) => state.ui.sidebarCollapsed);
  const [loading, setLoading] = React.useState(true);
  
  const setCollapsed = (val: boolean) => dispatch(setSidebarCollapsed(val));
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      logout();
      navigate('/');
    }, 2000);
  };

  if (loading) {
    return <SplashScreen />;
  }

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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
