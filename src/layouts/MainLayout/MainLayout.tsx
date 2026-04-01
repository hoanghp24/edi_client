import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { SplashScreen } from '../../components/common/SplashScreen/SplashScreen';
import { TopProgressBar } from '../../components/common/TopProgressBar/TopProgressBar';
import './MainLayout.scss';

const { Content } = Layout;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      logout();
      navigate('/');
    }, 1500);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Layout className={`main-layout ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <TopProgressBar />
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
