import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { MailOutlined, KeyOutlined, ArrowRightOutlined, GlobalOutlined, ScheduleOutlined, DeploymentUnitOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { Mail, Key, User, Lock } from "lucide-react";
import "./Login.scss";
import { ROUTES } from "../../routes/routes";

import { useAuth } from "../../context/AuthContext";

const { Title, Text, Paragraph } = Typography;

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign In | Action Composites Portal";
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);
    
    // Sử dụng tài khoản demo admin/admin từ AuthContext
    setTimeout(() => {
      const success = login(values.username, values.password);
      setLoading(false);
      
      if (success) {
        message.success("Login successful!");
        navigate(ROUTES.HOME);
      } else {
        message.error("Sai tài khoản hoặc mật khẩu! (Sử dụng: admin / admin)");
      }
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-page-desktop">
        {/* Left Side: Information — Authentic Brand Message */}
        <div className="login-side-info">
          <Text className="login-badge-official">ACTION COMPOSITES HIGHTECH INDUSTRIES</Text>
          <Title className="login-main-title">
            SHIPPING <span className="login-highlight-red">PLAN</span>
          </Title>
          <Paragraph className="login-description">
            Official Internal Portal for global shipment management 
            and component tracking within our global supply chain.
          </Paragraph>

          <div className="login-feature-list">
            <div className="login-pillar-item">
              <ScheduleOutlined className="login-pillar-icon" />
              <Text className="login-pillar-text">PRECISION PLANNING</Text>
            </div>
            <div className="login-pillar-item">
              <DeploymentUnitOutlined className="login-pillar-icon" />
              <Text className="login-pillar-text">GLOBAL LOGISTICS TRACKING</Text>
            </div>
            <div className="login-pillar-item">
              <NodeIndexOutlined className="login-pillar-icon" />
              <Text className="login-pillar-text">SUPPLY CHAIN EXCELLENCE</Text>
            </div>
          </div>
        </div>

        {/* Right Side: The "Gọn" Form Card */}
        <div className="login-side-form">
          <Card className="login-card">
            <div className="login-logo-container">
              <img src="/VAC_Logo.ico" alt="Action Composites" className="login-brand-icon" />
            </div>

            <Title className="login-title-small">WELCOME BACK</Title>
            <Text className="login-subtitle-small">Sign in to your account</Text>

            <Form name="login_form" className="login-form" layout="vertical" onFinish={onFinish} size="large">
              <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>
                <Input prefix={<User size={18} strokeWidth={2.25} style={{ color: "#94a3b8", marginRight: 12 }} />} placeholder="Username" />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                <Input.Password prefix={<Lock size={18} strokeWidth={2.25} style={{ color: "#94a3b8", marginRight: 12 }} />} placeholder="Password" />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" className="login-submit-btn" block loading={loading}>
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <div className="login-footer" style={{ borderTop: "2px solid #e2e8f0", marginTop: 16, paddingTop: 16, textAlign: "center" }}>
              <Text className="login-footer-text">© 2026 ACTION COMPOSITES HIGHTECH INDUSTRIES</Text>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
