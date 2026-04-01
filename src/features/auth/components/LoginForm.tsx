import React from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ROUTES } from "../../../routes/routes";
import { storage } from "../../../utils/storage";

export const LoginForm: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    storage.setPersistSession(values.remember);

    const { success, error: loginError } = await login({ 
      username: values.username, 
      password: values.password 
    });
    
    if (success) {
      navigate('/dashboard');
    } else {
      message.error(loginError || "Invalid username or password!");
    }
  };

  return (
    <Form 
      name="login_form" 
      className="login-form" 
      layout="vertical" 
      onFinish={onFinish} 
      size="large"
      initialValues={{ 
        username: "",
        remember: storage.getPersistSession() 
      }}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>
        <Input prefix={<User size={18} strokeWidth={2.25} style={{ color: "#94a3b8", marginRight: 12 }} />} placeholder="Username" />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]} style={{ marginBottom: 8 }}>
        <Input.Password prefix={<Lock size={18} strokeWidth={2.25} style={{ color: "#94a3b8", marginRight: 12 }} />} placeholder="Password" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: 0 }}>
        <Checkbox style={{ color: "#475569", fontSize: '14px' }}>Remember me</Checkbox>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" className="login-submit-btn" block loading={loading}>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  );
};
