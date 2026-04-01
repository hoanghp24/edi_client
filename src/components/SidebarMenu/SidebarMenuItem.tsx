import React, { useState, useMemo, useCallback } from "react";
import { Popover, Tooltip } from "antd";
import { ChevronRight } from "lucide-react";
import { MenuItem } from "../../types/menu";
import "./SidebarMenu.scss";

const SidebarPopoverContent: React.FC<{
  item: MenuItem;
  selectedKey: string;
  onNavigate: (key: string) => void;
  level: number;
}> = React.memo(({ item, selectedKey, onNavigate, level }) => {
  const [popoverOpenKeys, setPopoverOpenKeys] = useState<Set<string>>(new Set());

  const togglePopoverOpen = useCallback((key: string) => {
    setPopoverOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

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
});

export const SidebarMenuItem: React.FC<{
  item: MenuItem;
  selectedKey: string;
  collapsed: boolean;
  openKeys: Set<string>;
  toggleOpen: (key: string) => void;
  onNavigate: (key: string) => void;
  level?: number;
}> = React.memo(({ item, selectedKey, collapsed, openKeys, toggleOpen, onNavigate, level = 1 }) => {
  const hasChildren = useMemo(() => !!(item.children && item.children.length > 0), [item.children]);
  const isOpen = openKeys.has(item.key);
  const isActive = selectedKey === item.key;
  
  const isParentActive = useMemo(() => {
    if (!hasChildren) return false;
    const checkChild = (menuItem: MenuItem): boolean => 
      menuItem.key === selectedKey || (menuItem.children?.some(checkChild) ?? false);
    return checkChild(item);
  }, [item, selectedKey, hasChildren]);

  const handleClick = useCallback(() => {
    if (hasChildren) {
      toggleOpen(item.key);
    } else {
      onNavigate(item.key);
    }
  }, [hasChildren, item.key, toggleOpen, onNavigate]);

  const itemContent = (
    <li className={`sidebar-menu-item level-${level}`}>
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

  // Top-level collapsed state with Tooltip/Popover
  if (collapsed && level === 1) {
    if (hasChildren) {
      return (
        <Popover
          placement="rightTop"
          content={<SidebarPopoverContent item={item} selectedKey={selectedKey} onNavigate={onNavigate} level={level} />}
          trigger="hover"
          rootClassName="custom-sidebar-popover"
          mouseEnterDelay={0.1}
          arrow={false}
        >
          {itemContent}
        </Popover>
      );
    }
    
    return (
      <Tooltip placement="right" title={item.label} color="#e30613">
        {itemContent}
      </Tooltip>
    );
  }

  return itemContent;
});

