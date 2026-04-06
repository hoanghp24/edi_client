import React from 'react';
import { Table, Tag, Space, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Edit, Trash2 } from 'lucide-react';
import { PartMasterRecord } from '@/shared/types';
import './PartMasterTable.scss';
import { Button } from '@/shared/ui';

interface PartMasterTableProps {
  data?: PartMasterRecord[];
  loading?: boolean;
  onEdit?: (record: PartMasterRecord) => void;
  onDelete?: (record: PartMasterRecord) => void;
}

export const PartMasterTable: React.FC<PartMasterTableProps> = ({ data = [], loading = false, onEdit, onDelete }) => {
  const columns: ColumnsType<PartMasterRecord> = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 90,
      fixed: 'left',
      sorter: (a, b) => a.type.localeCompare(b.type),
      render: (type: string) => <Tag color={type === 'Serial' ? 'blue' : 'green'}>{type}</Tag>,
    },
    {
      title: 'Part No.',
      dataIndex: 'partNo',
      key: 'partNo',
      width: 130,
      fixed: 'left',
      sorter: (a, b) => a.partNo.localeCompare(b.partNo),
    },
    {
      title: 'Part Name',
      dataIndex: 'partName',
      key: 'partName',
      width: 200,
    },
    {
      title: 'Ship To',
      dataIndex: 'shipTo',
      key: 'shipTo',
      width: 130,
    },
    {
      title: 'Open PO QTY',
      dataIndex: 'openPoQty',
      key: 'openPoQty',
      width: 120,
      align: 'right',
    },
    {
      title: 'WH Open QTY',
      dataIndex: 'whOpenQty',
      key: 'whOpenQty',
      width: 120,
      align: 'right',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 80,
      align: 'center',
      render: (_: unknown, record: PartMasterRecord) => (
        <Space size={2}>
          <Tooltip title="Edit">
            <Button type="text" icon={<Edit size={14} />} onClick={() => onEdit?.(record)} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" danger icon={<Trash2 size={14} />} onClick={() => onDelete?.(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table<PartMasterRecord>
      className="part-master-table"
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey="id"
      size="small"
      scroll={{ x: 'max-content' }}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Total ${total} records`,
        defaultPageSize: 20,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
    />
  );
};
