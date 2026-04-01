import React, { ReactNode } from 'react';
import { Card, Table, Typography, Space } from 'antd';
import { TableProps } from 'antd/es/table';

const { Title, Text } = Typography;

export interface StandardListLayoutProps<T extends object> extends Omit<TableProps<T>, 'title'> {
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
  cardWrap?: boolean;
}

export const StandardListLayout = <T extends object>({
  title,
  subtitle,
  actions,
  filters,
  cardWrap = true,
  ...tableProps
}: StandardListLayoutProps<T>) => {

  const content = (
    <>
      {(title || actions) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <Title level={4} style={{ margin: 0, color: '#1e293b' }}>{title}</Title>
            {subtitle && <Text type="secondary">{subtitle}</Text>}
          </div>
          {actions && <Space>{actions}</Space>}
        </div>
      )}

      {filters && (
        <div style={{ marginBottom: 16 }}>
          {filters}
        </div>
      )}

      <Table<T> 
        size="middle"
        {...tableProps} 
      />
    </>
  );

  if (cardWrap) {
    return (
      <Card bordered={false} style={{ borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        {content}
      </Card>
    );
  }

  return <div style={{ padding: 12 }}>{content}</div>;
};
