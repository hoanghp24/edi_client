import React from "react";
import type { MenuProps } from "antd";
import { Avatar, Typography, Dropdown, ConfigProvider } from "antd";
import { LogOut, User, Settings } from "lucide-react";

const { Text } = Typography;

interface UserDropdownProps {
  onLogout: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile-header',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0', cursor: 'default' }}>
          <Avatar size={36} icon={<User size={20} />} style={{ backgroundColor: "#e30613" }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#0f172a', fontSize: 14, lineHeight: 1.2 }}>Administrator</Text>
            <Text style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>admin@action-composites.com</Text>
          </div>
        </div>
      ),
      style: { pointerEvents: 'none', padding: '12px 16px' }
    },
    { type: 'divider' },
    { key: 'settings', icon: <Settings size={16} />, label: 'Account Settings', style: { color: '#475569' } },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Sign out',
      onClick: onLogout,
      className: 'header-logout-item',
      style: { fontWeight: 600 }
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: { 
          colorBgElevated: '#ffffff', 
          colorBorderSecondary: '#f1f5f9',
          borderRadiusLG: 8,
          colorText: '#475569',
        },
        components: {
          Dropdown: { paddingBlock: 8, controlItemBgHover: '#f8fafc' },
          Menu: { 
            itemColor: '#475569', 
            itemHoverColor: '#0f172a', 
            itemHoverBg: '#f1f5f9',
            itemBorderRadius: 8,
          }
        }
      }}
    >
      <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: 260 }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer", 
          padding: "6px 0",
          borderRadius: "8px", 
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "transparent",
          border: "none",
          gap: 12
        }} className="header-user-profile">
          <Avatar size={36} icon={<User size={20} />} style={{ backgroundColor: "#e30613", color: "#fff", boxShadow: "0 2px 8px rgba(227, 6, 19, 0.2)" }} />
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <Text strong style={{ color: '#0f172a', fontSize: 14, lineHeight: 1.2 }}>Administrator</Text>
            <Text style={{ color: '#64748b', fontSize: 11, fontWeight: 500, lineHeight: 1.2 }}>System Manager</Text>
          </div>
          <Settings size={14} style={{ color: "#94a3b8", marginLeft: 4 }} />
        </div>
      </Dropdown>
    </ConfigProvider>
  );
};
