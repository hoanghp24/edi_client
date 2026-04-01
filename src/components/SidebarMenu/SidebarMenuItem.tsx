import React, { useState, useMemo, useCallback } from "react";
import { Popover, Tooltip, ConfigProvider } from "antd";
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
      <ul className="sidebar-menu">
        {item.children?.map((child) => (
          <SidebarMenuItem
            key={child.key}
            item={child}
            selectedKey={selectedKey}
            collapsed={false}
            isInsidePopover={true}
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
  isInsidePopover?: boolean;
  openKeys: Set<string>;
  toggleOpen: (key: string) => void;
  onNavigate: (key: string) => void;
  level?: number;
}> = React.memo(({ item, selectedKey, collapsed, isInsidePopover = false, openKeys, toggleOpen, onNavigate, level = 1 }) => {
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
    if (hasChildren && !isInsidePopover) {
      toggleOpen(item.key);
    } else if (!hasChildren) {
      onNavigate(item.key);
    }
  }, [hasChildren, item.key, toggleOpen, onNavigate, isInsidePopover]);

  const itemContent = (
    <li className={`sidebar-menu-item level-${level} ${isInsidePopover ? "in-popover" : ""}`}>
      <div
        className={`sidebar-menu-item-title ${isActive ? "active" : ""} ${isParentActive ? "parent-active" : ""}`}
        onClick={handleClick}
      >
        {item.icon && <span className="menu-icon">{item.icon}</span>}
        <span className="menu-label">{item.label}</span>
        {hasChildren && (
          <span className={`menu-arrow ${isOpen && !isInsidePopover ? "open" : ""}`}>
            <ChevronRight size={16} />
          </span>
        )}
      </div>
      
      {hasChildren && !isInsidePopover && (
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

  if ((collapsed && level === 1) || isInsidePopover) {
    if (hasChildren) {
      return (
        <Popover
          placement="rightTop"
          content={
            <ConfigProvider
              theme={{
                token: {
                  colorText: "rgba(255, 255, 255, 0.85)",
                  colorTextDescription: "rgba(255, 255, 255, 0.45)",
                }
              }}
            >
              <SidebarPopoverContent item={item} selectedKey={selectedKey} onNavigate={onNavigate} level={level} />
            </ConfigProvider>
          }
          trigger="hover"
          rootClassName="custom-sidebar-popover"
          overlayInnerStyle={{ 
            backgroundColor: "#0f172a", 
            padding: 0, 
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
          mouseEnterDelay={0.05}
          arrow={false}
        >
          {itemContent}
        </Popover>
      );
    }
    
    if (collapsed && level === 1) {
      return (
        <Tooltip placement="right" title={item.label} color="#e30613">
          {itemContent}
        </Tooltip>
      );
    }
  }

  return itemContent;
});

