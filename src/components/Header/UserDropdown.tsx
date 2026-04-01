import React from "react";
import type { MenuProps } from "antd";
import { Avatar, Typography, Dropdown, ConfigProvider } from "antd";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useAppSelector } from "../../state/hooks";

const { Text } = Typography;

interface UserDropdownProps {
  onLogout: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ onLogout }) => {
  const { user } = useAppSelector((state) => state.auth);
  
  const displayName = user?.displayName || user?.userName || "Authorized User";
  const displayEmail = user?.email || `${user?.userName || 'user'}@action-composites.com`;

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile-header',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0', cursor: 'default', maxWidth: 280 }}>
          <Avatar size={44} icon={<User size={26} />} style={{ backgroundColor: "#e30613", flexShrink: 0 }} />
          <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Text 
              strong 
              style={{ fontSize: 15, lineHeight: 1.2 }}
              ellipsis={{ tooltip: displayName }}
            >
              {displayName}
            </Text>
            <Text 
              style={{ fontSize: 12, marginTop: 4 }}
              ellipsis={{ tooltip: displayEmail }}
            >
              {displayEmail}
            </Text>
          </div>
        </div>
      ),
      style: { pointerEvents: 'none', padding: '16px' }
    },
    { type: 'divider' },
    { key: 'settings', icon: <Settings size={16} />, label: 'Account Settings' },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Sign out',
      onClick: onLogout,
      className: 'header-logout-item',
      style: { color: '#e30613' }
    },
  ];

  return (
    <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight" overlayStyle={{ minWidth: 260 }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer", 
        padding: "4px 4px",
        borderRadius: "8px", 
        transition: "all 0.2s ease-in-out",
        background: "transparent",
        gap: 6
      }} className="header-user-profile">
        <Avatar size={34} icon={<User size={20} />} style={{ backgroundColor: "#e30613", color: "#fff", boxShadow: "0 2px 6px rgba(227, 6, 19, 0.25)" }} />
        <ChevronDown size={14} style={{ color: "#94a3b8" }} />
      </div>
    </Dropdown>
  );
};
