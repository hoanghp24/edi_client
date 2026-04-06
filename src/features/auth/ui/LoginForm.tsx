import React from 'react';
import { Form, message } from 'antd';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Input } from '@/shared/ui';
import { useAuth } from '../model/useAuth';
import { LoginRequest } from '@/shared/types';

export const LoginForm: React.FC = () => {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: LoginRequest) => {
    const { success, error: loginError } = await login(values);

    if (success) {
      navigate('/dashboard');
    } else {
      message.error(loginError || 'Invalid username or password!');
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
        username: '',
      }}
    >
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
        <Input
          prefix={<User size={18} strokeWidth={2.25} style={{ color: '#94a3b8', marginRight: 12 }} />}
          placeholder="Username"
        />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        style={{ marginBottom: 16 }}
      >
        <Input
          type="password"
          prefix={<Lock size={18} strokeWidth={2.25} style={{ color: '#94a3b8', marginRight: 12 }} />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            type="primary"
            htmlType="submit"
            className="login-submit-btn"
            fullWidth
            loading={isLoggingIn}
          >
            Sign In
          </Button>
        </motion.div>
      </Form.Item>
    </Form>
  );
};
