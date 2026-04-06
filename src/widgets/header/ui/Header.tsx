import React from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { UserDropdown } from './UserDropdown';
import './Header.scss';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, onLogout }) => {
  return (
    <AntHeader className="dashboard-header">
      <div className="header-left">
        <Button
          type="text"
          id="sidebar-toggle-button"
          icon={
            collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20 }} /> : <MenuFoldOutlined style={{ fontSize: 20 }} />
          }
          onClick={() => setCollapsed(!collapsed)}
          className="collapse-button"
        />

        <div className="header-brand-info">
          <span className="brand-title">
            ACTION <span className="brand-red">COMPOSITES</span>
          </span>
          <span className="brand-subtitle">HIGHTECH INDUSTRIES</span>
        </div>
      </div>

      <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <UserDropdown onLogout={onLogout} />
      </div>
    </AntHeader>
  );
};
