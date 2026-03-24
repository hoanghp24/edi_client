import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { User, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;


export const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      const success = login(values.username, values.password);
      if (success) {
        message.success('Login successful!');
        navigate('/');
      } else {
        message.error('Invalid credentials! Hint: admin / admin');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.05)", borderRadius: 12 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Globe size={48} style={{ color: "#1677ff", marginBottom: 16 }} />
          <Title level={3} style={{ margin: 0 }}>
            Shipping Portal
          </Title>
          <Text type="secondary">Enterprise Logistics Management</Text>
        </div>

        <Form name="login_form" layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} size="large">
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
            <Input prefix={<User size={18} style={{ color: "#bfbfbf" }} />} placeholder="Username (admin)" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input.Password prefix={<Lock size={18} style={{ color: "#bfbfbf" }} />} placeholder="Password (admin)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={loading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
