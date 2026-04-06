import React from 'react';
import { Card, Row, Col, Form, Input, InputNumber, Button, Space, Divider, Select, Typography, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { Save, Plus, ArrowLeft, Menu, FileSpreadsheet, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import './MasterData.scss';

const { Title, Text } = Typography;
const { Option } = Select;

export const PartAddEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Save Changes',
      icon: <Save size={16} />,
      onClick: () => {
        form.validateFields().then((values) => {
          console.log('Success:', values);
        });
      },
    },
    {
      key: '2',
      label: 'Add New Record',
      icon: <Plus size={16} />,
      onClick: () => form.resetFields(),
    },
    { type: 'divider' },
    {
      key: '3',
      label: 'Part Overview',
      icon: <LayoutGrid size={16} />,
      onClick: () => navigate(ROUTES.MASTER_DATA.PART_OVERVIEW),
    },
    {
      key: '4',
      label: 'Batch Import',
      icon: <FileSpreadsheet size={16} />,
      onClick: () => navigate(ROUTES.MASTER_DATA.PART_IMPORT),
    },
  ];

  return (
    <Card
      className="part-add-edit-page"
      title={
        <Title level={4} style={{ margin: 0 }}>
          Manual Add/Edit Part Data
        </Title>
      }
      extra={
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Button type="primary" icon={<Menu size={16} />}>Menu</Button>
        </Dropdown>
      }
    >
      <Form form={form} layout="vertical" initialValues={{ type: 'Sample' }}>
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Divider titlePlacement="left">Part Information</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="type" label="Type (Sample/Serial)" rules={[{ required: true }]}>
                  <Select>
                    <Option value="Sample">Sample</Option>
                    <Option value="Serial">Serial</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="partNo" label="Part No." rules={[{ required: true }]}>
                  <Input placeholder="e.g. 130AP1101012086" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="partName" label="Part Name">
                  <Input placeholder="e.g. JLR L663 Bonnet Vent..." />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="oemNo" label="OEM No.">
                  <Input placeholder="e.g. S8BM-16245-AB" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="tier1No" label="Tier1 No.">
                  <Input placeholder="e.g. 1S-04.516" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="pcsPerBox" label="pcs/box">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="boxDim" label="Box Dim.">
                  <Input placeholder="1000x801x520mm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="weight" label="Weight (kg)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nomCap" label="Nom. Cap.">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="safetyStock" label="Safety Stock">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="maxStock" label="Max. Stock (%)">
                  <InputNumber style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={12}>
            <Divider titlePlacement="left">Setup & Logistics</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="sop" label="SOP">
                  <Input placeholder="20CW01" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="eop" label="EOP">
                  <Input placeholder="30CW01" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="kam" label="KAM">
                  <Input placeholder="Josef Kalteis" />
                </Form.Item>
              </Col>

              <Divider titlePlacement="left" plain>
                <Text type="secondary">Call Offs & Transit</Text>
              </Divider>

              <Col span={24}>
                <Form.Item label="Transit to Customer 1">
                  <Space.Compact style={{ width: '100%' }}>
                    <InputNumber placeholder="Weeks" style={{ width: '20%' }} />
                    <Input placeholder="+ call offs customer VW Slovakia 1095" style={{ width: '80%' }} />
                  </Space.Compact>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Transit to Customer 2">
                  <Space.Compact style={{ width: '100%' }}>
                    <InputNumber placeholder="Weeks" style={{ width: '20%' }} />
                    <Input placeholder="+ call offs customer XYZ / FC" style={{ width: '80%' }} />
                  </Space.Compact>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name="poNoHac" label="PO No. HAC">
                  <Input placeholder="80000832" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="acaCs" label="ACA CS">
                  <Input placeholder="Sarah Sattler" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
