import React from 'react';
import { Card, Result } from 'antd';
import { Settings } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export const Placeholder = ({ title }: { title: string }) => {
  usePageTitle(title);

  return (
    <Card
      title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>{title}</span>}
      style={{ minHeight: 'calc(100vh - 120px)', borderRadius: '8px' }}
    >
      <Result
        icon={<Settings size={72} color="#e30613" />}
        title={<span style={{ color: '#0f172a' }}>{title} Under Construction</span>}
        subTitle="This module is being integrated with high-performance logistics logic."
      />
    </Card>
  );
};
