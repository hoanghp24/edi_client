import React from 'react';
import { Typography, Button, Space, Card, Tag, Input } from 'antd';
import { Plus, Search, FileDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getParts } from '../../features/master-data/services/partApi';
import { PartTable } from '../../features/master-data/components/PartTable';
import { usePageTitle } from '../../hooks/usePageTitle';

const { Title, Text } = Typography;

export const PartOverviewPage: React.FC = () => {
  usePageTitle('Part Overview');

  const { data: parts, isLoading } = useQuery({
    queryKey: ['master-parts'],
    queryFn: getParts,
  });

  return (
    <div className="part-overview-container" style={{ padding: '0px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Master Data: Part Overview</Title>
          <Text type="secondary">Centralized repository for all manufacturing components and logistics materials.</Text>
        </div>
        <Space>
          <Button icon={<FileDown size={16} />} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Export CSV
          </Button>
          <Button 
            type="primary" 
            icon={<Plus size={16} />} 
            style={{ backgroundColor: '#e30613', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            Create Part
          </Button>
        </Space>
      </div>

      {/* Stats Summary (Simplified) */}
      <div style={{ marginBottom: 24 }}>
        <Space size={16}>
          <Card size="small" bordered={false} styles={{ body: { padding: '12px 16px' } }} style={{ minWidth: 160 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Total Components</Text>
            <div><Title level={4} style={{ margin: 0 }}>{parts?.length || 0}</Title></div>
          </Card>
          <Card size="small" bordered={false} styles={{ body: { padding: '12px 16px' } }} style={{ minWidth: 160 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>Active Production</Text>
            <div><Title level={4} style={{ margin: 0, color: '#52c41a' }}>18</Title></div>
          </Card>
        </Space>
      </div>

      {/* Main Content Table Area */}
      <Card 
        bordered={false} 
        styles={{ body: { padding: 0 } }} 
        style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
      >
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
          <Input 
            prefix={<Search size={16} color="#94a3b8" />} 
            placeholder="Search parts by No, Description, Material..." 
            style={{ maxWidth: 400, borderRadius: '8px' }}
            variant="filled"
          />
        </div>
        <PartTable data={parts || []} loading={isLoading} />
      </Card>
    </div>
  );
};
