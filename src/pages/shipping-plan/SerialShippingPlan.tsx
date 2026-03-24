import React, { useState, useRef, useEffect } from 'react';
import { Table, Button, Space, message, Dropdown, MenuProps, Tag, Typography } from 'antd';
import { 
  Pencil, 
  Copy, 
  History, 
  Download, 
  Save,
  Trash2,
  MoreVertical
} from 'lucide-react';

const { Title } = Typography;

interface DataType {
  key: string;
  partNo: string;
  quantity: number;
  shipMode: string;
  destination: string;
  eta: string;
  status: string;
  note: string;
}

const initialData: DataType[] = Array.from({ length: 50 }).map((_, i) => ({
  key: i.toString(),
  partNo: `PART-${1000 + i}`,
  quantity: Math.floor(Math.random() * 1000) + 100,
  shipMode: i % 3 === 0 ? 'AIR' : 'SEA',
  destination: i % 2 === 0 ? 'New York, US' : 'Hamburg, DE',
  eta: `2026-04-${(i % 30 + 1).toString().padStart(2, '0')}`,
  status: i % 4 === 0 ? 'Pending' : 'Confirmed',
  note: '',
}));

export const SerialShippingPlan = () => {
  const [data, setData] = useState<DataType[]>(initialData);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook to handle Excel Paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Allow default paste if focusing on a text input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      e.preventDefault();
      const clipboardData = e.clipboardData?.getData('text/plain');
      if (!clipboardData) return;

      // Parse Excel format (Tab separated values, newline separated rows)
      const rows = clipboardData.split(/\r\n|\n|\r/).filter(row => row.trim() !== '');
      if (rows.length === 0) return;

      // Construct new data items simply appending them to the top for demo purposes
      const pastedData: DataType[] = rows.map((row, index) => {
        const columns = row.split('\t');
        return {
          key: `pasted-${Date.now()}-${index}`,
          partNo: columns[0] || 'Unknown',
          quantity: parseInt(columns[1]) || 0,
          shipMode: columns[2] || 'SEA',
          destination: columns[3] || 'Unknown',
          eta: columns[4] || 'YYYY-MM-DD',
          status: 'Draft',
          note: columns[5] || 'Pasted from Excel',
        };
      });

      setData((prev) => [...pastedData, ...prev]);
      message.success(`Successfully pasted ${pastedData.length} rows from clipboard!`);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('paste', handlePaste as EventListener);
    }
    return () => {
      if (container) {
        container.removeEventListener('paste', handlePaste as EventListener);
      }
    };
  }, []);

  // Context Menu handlers
  const onContextMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'edit') {
      message.info('Inline Edit Mode Triggered');
    } else if (e.key === 'history') {
      message.info('Viewing Modification History for this cell');
    } else if (e.key === 'copy') {
      message.success('Cell value copied to clipboard!');
    }
  };

  const getContextMenu = (): MenuProps => ({
    items: [
      { key: 'edit', icon: <Pencil size={14} />, label: 'Edit Cell' },
      { key: 'copy', icon: <Copy size={14} />, label: 'Copy' },
      { type: 'divider' },
      { key: 'history', icon: <History size={14} />, label: 'View History' },
    ],
    onClick: onContextMenuClick,
  });

  const columns: any[] = [
    {
      title: 'Part No',
      dataIndex: 'partNo',
      key: 'partNo',
      width: 150,
      fixed: 'left', // Fixed Column
      render: (text: string) => (
        <Dropdown menu={getContextMenu()} trigger={['contextMenu']}>
          <div style={{ width: '100%', height: '100%', cursor: 'cell' }}>{text}</div>
        </Dropdown>
      )
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 120,
    },
    {
      title: 'Ship Mode',
      dataIndex: 'shipMode',
      key: 'shipMode',
      width: 120,
      render: (text: string) => (
        <Tag color={text === 'AIR' ? 'blue' : 'cyan'}>{text}</Tag>
      )
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
      width: 200,
    },
    {
      title: 'ETA',
      dataIndex: 'eta',
      key: 'eta',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text: string) => (
        <Tag color={text === 'Confirmed' ? 'green' : (text === 'Draft' ? 'orange' : 'default')}>
          {text}
        </Tag>
      )
    },
    {
      title: 'Note / Remarks',
      dataIndex: 'note',
      key: 'note',
      width: 300,
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right', // Fixed Column
      width: 120,
      render: () => (
        <Space size="middle">
          <Button type="link" size="small" icon={<Pencil size={14} />}>Edit</Button>
          <Button type="text" size="small" icon={<Trash2 size={14} />} danger />
        </Space>
      ),
    },
  ];

  return (
    <div 
      ref={containerRef} 
      tabIndex={0} 
      style={{ outline: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Title level={4} style={{ margin: 0 }}>Serial Shipping Plan</Title>
          <Typography.Text type="secondary">
            Tip: Click anywhere on this table and press (Ctrl+V) to paste rows directly from Excel. Right-click on "Part No" for cell options.
          </Typography.Text>
        </div>
        <Space>
          <Button type="primary" icon={<Download size={16} />}>Export to Excel</Button>
          <Button icon={<Save size={16} />}>Save Changes</Button>
        </Space>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={data} 
        scroll={{ x: 'max-content', y: 'calc(100vh - 330px)' }} // Freeze Headers & Columns safely without causing outer scroll
        pagination={{ pageSize: 50, showSizeChanger: true }}
        size="small"
        bordered
      />
    </div>
  );
};
