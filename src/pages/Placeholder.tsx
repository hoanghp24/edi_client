import React from 'react';
import { Card, Result } from 'antd';
import { usePageTitle } from '../hooks/usePageTitle';

export const Placeholder = ({ title }: { title: string }) => {
  usePageTitle(title);

  return (
    <Card 
      title={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>{title}</span>} 
      style={{ minHeight: 'calc(100vh - 120px)' }}
    >
      <Result
        status="info"
        title={`${title} is currently under construction`}
        subTitle="This layout is fully prepared to integrate complex data grids and spreadsheet components."
      />
    </Card>
  );
};
