import React, { useState } from 'react';
import { Card, Button, Space, Typography, Upload, message, Progress, Divider, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Download, FileSpreadsheet, Send, Menu, LayoutGrid, Plus } from 'lucide-react';
import type { UploadProps, UploadFile } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import './MasterData.scss';

const { Title, Text } = Typography;

export const PartImportPage: React.FC = () => {
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Manual Part Entry',
      icon: <Plus size={16} />,
      onClick: () => navigate(ROUTES.MASTER_DATA.PART_ADD),
    },
    {
      key: '2',
      label: 'Part Overview',
      icon: <LayoutGrid size={16} />,
      onClick: () => navigate(ROUTES.MASTER_DATA.PART_OVERVIEW),
    },
  ];

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleGenerate = () => {
    setUploading(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 10;
      setGenerateProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setUploading(false);
        message.success('Master data generated successfully!');
      }
    }, 200);
  };

  return (
    <Card
      className="part-import-page"
      title={
        <Title level={4} style={{ margin: 0 }}>
          Import Part Master from File
        </Title>
      }
      extra={
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button icon={<Menu size={16} />}>Menu</Button>
        </Dropdown>
      }
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <Card size="small" style={{ marginBottom: 24, backgroundColor: '#f9f9f9', border: '1px dashed #d9d9d9' }}>
          <Space direction="vertical" style={{ width: '100%', alignItems: 'center', padding: '24px 0' }}>
            <Download size={32} color="#1677ff" />
            <Text strong>Step 1: Download the Excel Template</Text>
            <Text type="secondary">Before uploading, ensure your data matches our system's format.</Text>
            <Button icon={<Download size={16} />} type="primary" ghost>
              Download Template
            </Button>
          </Space>
        </Card>

        <Divider />

        <Card size="small" style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Step 2: Upload Updated File</Text>
            <Upload.Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <FileSpreadsheet size={48} color="#18a058" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. Strictly prohibited from uploading company data or other banned
                files.
              </p>
            </Upload.Dragger>
          </Space>
        </Card>

        <Divider />

        <Card size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Step 3: Process and Generate Data</Text>
            <Button
              type="primary"
              icon={<Send size={16} />}
              disabled={fileList.length === 0}
              loading={uploading}
              onClick={handleGenerate}
              block
              size="large"
            >
              Generate Data
            </Button>
            {uploading && (
              <div style={{ marginTop: 16 }}>
                <Text type="secondary">Processing file(s)...</Text>
                <Progress percent={generateProgress} status="active" />
              </div>
            )}
          </Space>
        </Card>
      </div>
    </Card>
  );
};
