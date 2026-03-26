import React, { useState } from "react";
import { Layout } from "antd";
import { Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../menuConfig";
import { MenuItem } from "../../types/menu";
import { SidebarMenuItem } from "../../components/SidebarMenu/SidebarMenuItem";

const { Sider } = Layout;

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
      style={{
        height: "100vh",
        transition: "all 0.4s cubic-bezier(0.2, 0, 0, 1.0)",
        background: "linear-gradient(180deg, #001529 0%, #002140 100%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
        
        {/* LOGO AREA */}
        <div
          style={{
            height: 64, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "0 16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)", overflow: "hidden",
          }}
        >
          <Globe size={24} style={{ color: "#4dabf7", flexShrink: 0 }} />
          {!collapsed && (
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.5px", whiteSpace: "nowrap", transition: "opacity 0.3s", color: "#ffffff" }}>
              Shipping Plan
            </span>
          )}
        </div>

        {/* MENU LIST */}
        <div
          className={collapsed ? "sidebar-collapsed" : ""}
          style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "4px 0" }}
        >
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
