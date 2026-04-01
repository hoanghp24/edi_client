import React from 'react';
import { Table, Tag, Typography, Space, Tooltip, Badge } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PartItem, PartStatus } from '../types/part';
import { Info } from 'lucide-react';

const { Text } = Typography;

interface PartTableProps {
  data: PartItem[];
  loading: boolean;
}

export const PartTable: React.FC<PartTableProps> = ({ data, loading }) => {
  const getStatusColor = (status: PartStatus): string => {
    switch (status) {
      case 'Active': return 'success';
      case 'Development': return 'processing';
      case 'Obsolete': return 'error';
      default: return 'default';
    }
  };

  const columns: ColumnsType<PartItem> = [
    {
      title: 'Part Number',
      dataIndex: 'partNo',
      key: 'partNo',
      sorter: (a, b) => a.partNo.localeCompare(b.partNo),
      render: (text: string) => <Text strong style={{ color: '#e30613' }}>{text}</Text>,
      width: 180,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      filters: [
        { text: 'Porsche', value: 'Porsche' },
        { text: 'BMW', value: 'BMW' },
        { text: 'Airbus', value: 'Airbus' },
        { text: 'Tesla', value: 'Tesla' },
      ],
      onFilter: (value, record) => record.customerName === value,
    },
    {
      title: 'Material / Weight',
      key: 'material',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 13 }}>{record.material}</Text>
          <Text type="secondary" style={{ fontSize: 11 }}>{record.weight}</Text>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (status: PartStatus) => (
        <Tag bordered={false} color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => <Text type="secondary">{date}</Text>
    },
    {
      title: '',
      key: 'action',
      width: 50,
      render: () => (
        <Tooltip title="View Details">
          <Info size={16} style={{ color: '#94a3b8', cursor: 'pointer' }} />
        </Tooltip>
      )
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      size="middle"
      rowKey="id"
      className="master-data-table"
      style={{ background: '#fff', borderRadius: '8px' }}
    />
  );
};
