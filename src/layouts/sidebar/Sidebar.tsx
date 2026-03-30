import React, { useState } from "react";
import { Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../menuConfig";
import { MenuItem } from "../../types/menu";
import { SidebarMenuItem } from "../../components/SidebarMenu/SidebarMenuItem";
import vacLogo from "../../assets/VAC_Logo.ico";

const { Sider } = Layout;

import "./Sidebar.scss";

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

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
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
      collapsedWidth={80}
      className="dashboard-sider"
    >
      <div className="sider-container">
        <div className={`logo-area ${collapsed ? "sidebar-collapsed" : ""}`}>
          <img 
            src={vacLogo} 
            alt="Action Composites" 
            className="logo-image"
          />
          {!collapsed && (
            <span className="brand-text">
              SHIPPING <span className="brand-accent">PLAN</span>
            </span>
          )}
        </div>

        <div className={`menu-list-wrapper ${collapsed ? "sidebar-collapsed" : ""}`}>
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
