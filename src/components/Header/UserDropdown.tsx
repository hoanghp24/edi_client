import React from "react";
import type { MenuProps } from "antd";
import { Avatar, Typography, Dropdown, ConfigProvider, theme as antTheme } from "antd";
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
          <Avatar size={32} icon={<User size={18} />} style={{ backgroundColor: "#8a2be2" }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text strong style={{ color: '#fff', fontSize: 14, lineHeight: 1 }}>Admin</Text>
            <Text style={{ color: '#8b949e', fontSize: 12, marginTop: 4 }}>@admin_user</Text>
          </div>
        </div>
      ),
      style: { pointerEvents: 'none', padding: '8px 16px' }
    },
    { type: 'divider' },
    { key: 'settings', icon: <Settings size={16} />, label: 'Settings', style: { color: '#c9d1d9' } },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Sign out',
      onClick: onLogout,
      style: { color: '#c9d1d9' }
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: antTheme.darkAlgorithm,
        token: { 
          colorBgElevated: '#010409', 
          colorBorderSecondary: 'rgba(255,255,255,0.1)',
          borderRadiusLG: 12,
        },
        components: {
          Dropdown: { paddingBlock: 8, controlItemBgHover: 'rgba(177,186,196,0.12)' },
          Menu: { itemColor: '#c9d1d9', itemHoverColor: '#c9d1d9', itemBorderRadius: 6 }
        }
      }}
    >
      <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: 260 }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          cursor: "pointer", 
          padding: "4px", 
          borderRadius: "50%", 
          transition: "background 0.3s" 
        }} className="header-user-avatar">
          <Avatar size="default" icon={<User size={16} />} style={{ backgroundColor: "#8a2be2", color: "#fff" }} />
        </div>
      </Dropdown>
    </ConfigProvider>
  );
};
