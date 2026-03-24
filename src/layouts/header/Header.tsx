import React from "react";
import { Layout, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UserDropdown } from "../../components/Header/UserDropdown";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed, onLogout }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 24,
        borderBottom: "1px solid #f0f0f0",
        height: 64,
        transition: "background 0.3s, padding 0.3s",
        overflow: "hidden",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: 20 }} /> : <MenuFoldOutlined style={{ fontSize: 20 }} />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#001529",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <UserDropdown onLogout={onLogout} />
      </div>
    </AntHeader>
  );
};
