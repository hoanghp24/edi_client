import React, { useState } from "react";
import { Popover, Tooltip } from "antd";
import { ChevronRight } from "lucide-react";
import { MenuItem } from "../../types/menu";
import "./SidebarMenu.scss";

export const SidebarPopover: React.FC<{
  item: MenuItem;
  selectedKey: string;
  onNavigate: (key: string) => void;
  level: number;
}> = ({ item, selectedKey, onNavigate, level }) => {
  const [popoverOpenKeys, setPopoverOpenKeys] = useState<Set<string>>(new Set());

  const togglePopoverOpen = (key: string) => {
    setPopoverOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="sidebar-popover-container">
      <div className="sidebar-popover-header">{item.label}</div>
      <ul className="sidebar-menu">
        {item.children?.map((child) => (
          <SidebarMenuItem
            key={child.key}
            item={child}
            selectedKey={selectedKey}
            collapsed={false}
            openKeys={popoverOpenKeys}
            toggleOpen={togglePopoverOpen}
            onNavigate={onNavigate}
            level={level + 1}
          />
        ))}
      </ul>
    </div>
  );
};

export const SidebarMenuItem: React.FC<{
  item: MenuItem;
  selectedKey: string;
  collapsed: boolean;
  openKeys: Set<string>;
  toggleOpen: (key: string) => void;
  onNavigate: (key: string) => void;
  level?: number;
}> = ({ item, selectedKey, collapsed, openKeys, toggleOpen, onNavigate, level = 1 }) => {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openKeys.has(item.key);
  const isActive = selectedKey === item.key;
  
  const isChildActive = (menuItem: MenuItem): boolean => 
    menuItem.key === selectedKey || (menuItem.children?.some(isChildActive) ?? false);
  const isParentActive = hasChildren && isChildActive(item);

  const handleClick = () => hasChildren ? toggleOpen(item.key) : onNavigate(item.key);

  const itemContent = (
    <li className="sidebar-menu-item">
      <div
        className={`sidebar-menu-item-title ${isActive ? "active" : ""} ${isParentActive ? "parent-active" : ""}`}
        onClick={handleClick}
      >
        {item.icon && <span className="menu-icon">{item.icon}</span>}
        <span className="menu-label">{item.label}</span>
        {hasChildren && !collapsed && (
          <span className={`menu-arrow ${isOpen ? "open" : ""}`}>
            <ChevronRight size={18} />
          </span>
        )}
      </div>
      
      {hasChildren && (
        <div className="sidebar-submenu-wrapper">
          <ul className={`sidebar-submenu ${isOpen && !collapsed ? "open" : ""}`}>
            {item.children!.map((child) => (
              <SidebarMenuItem
                key={child.key}
                item={child}
                selectedKey={selectedKey}
                collapsed={collapsed}
                openKeys={openKeys}
                toggleOpen={toggleOpen}
                onNavigate={onNavigate}
                level={level + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );

  if (collapsed && level === 1) {
    if (hasChildren) {
      return (
        <Popover
          placement="rightTop"
          content={<SidebarPopover item={item} selectedKey={selectedKey} onNavigate={onNavigate} level={level} />}
          trigger="hover"
          rootClassName="custom-sidebar-popover"
          overlayClassName="custom-sidebar-popover"
          mouseEnterDelay={0.1}
          arrow={false}
          overlayInnerStyle={{
            background: "#001529",
            padding: "8px 0",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 6px 16px 0 rgba(0,0,0,0.4)",
            minWidth: 220,
          }}
        >
          {itemContent}
        </Popover>
      );
    } else {
      return (
        <Tooltip placement="right" title={item.label} color="#001529">
          {itemContent}
        </Tooltip>
      );
    }
  }

  return itemContent;
};
