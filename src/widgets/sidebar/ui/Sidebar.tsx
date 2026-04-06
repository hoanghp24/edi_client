import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '@/shared/config';
import { MenuItem } from '@/shared/types';
import { SidebarMenuItem } from './SidebarMenuItem';
import vacLogo from '@/shared/assets/VAC_Logo.png';

const { Sider } = Layout;

import './Sidebar.scss';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const findParentKeys = (items: MenuItem[], path: string, parents: string[] = []): string[] => {
    for (const item of items) {
      if (item.key === path) return parents;
      const found = item.children && findParentKeys(item.children, path, [...parents, item.key]);
      if (found && found.length > 0) return found;
    }
    return [];
  };

  const [openKeys, setOpenKeys] = useState<Set<string>>(
    () => new Set(findParentKeys(menuItems as MenuItem[], location.pathname))
  );

  useEffect(() => {
    const parentKeys = findParentKeys(menuItems as MenuItem[], location.pathname);
    if (parentKeys.length > 0) {
      setOpenKeys(new Set([...openKeys, ...parentKeys]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
      width={280}
      collapsedWidth={64}
      className="dashboard-sider"
    >
      <div className="sider-container">
        <div className={`logo-area ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <img src={vacLogo} alt="Action Composites" className="logo-image" />
          {!collapsed && (
            <span className="brand-text">
              SHIPPING <span className="brand-accent">PLAN</span>
            </span>
          )}
        </div>

        <div className={`menu-list-wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
          <ul className="sidebar-menu">
            {(menuItems as MenuItem[]).map((item) => (
              <SidebarMenuItem
                key={item.key}
                item={item}
                selectedKey={location.pathname}
                collapsed={collapsed}
                openKeys={openKeys}
                toggleOpen={toggleOpen}
                onNavigate={(key) => navigate(key)}
              />
            ))}
          </ul>
        </div>
      </div>
    </Sider>
  );
};
