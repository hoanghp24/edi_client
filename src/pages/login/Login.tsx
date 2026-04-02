import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { ScheduleOutlined, DeploymentUnitOutlined, NodeIndexOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "./Login.scss";
import vacLogo from "../../assets/VAC_Logo.png";
import { LoginForm } from "../../features/auth/components/LoginForm";
import { usePageTitle } from "../../hooks/usePageTitle";

const { Title, Text, Paragraph } = Typography;

export const Login: React.FC = () => {
  usePageTitle();

  return (
    <div className="login-page">
      <div className="login-page-desktop">
        <motion.div 
          className="login-side-info"
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
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
        </motion.div>

        <motion.div 
          className="login-side-form"
          initial={{ opacity: 0, x: 150 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <Card className="login-card">
            <div className="login-logo-container">
              <img src={vacLogo} alt="Action Composites" className="login-brand-icon" />
            </div>

            <Title className="login-title-small">WELCOME BACK</Title>
            <Text className="login-subtitle-small">Sign in to your account</Text>

            <LoginForm />

            <div className="login-footer" style={{ borderTop: "2px solid #e2e8f0", marginTop: 16, paddingTop: 16, textAlign: "center" }}>
              <Text className="login-footer-text">© 2026 ACTION COMPOSITES HIGHTECH INDUSTRIES</Text>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
