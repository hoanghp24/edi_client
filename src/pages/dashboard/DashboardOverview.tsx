import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Tag, Space, Progress } from 'antd';
import {
  Send,
  CheckCircle,
  Clock,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Activity,
  History,
  TrendingDown,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { usePageTitle } from '../../hooks/usePageTitle';

const { Title, Text } = Typography;

export const DashboardOverview = () => {
  usePageTitle('Dashboard');

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Giả lập call API mất 1.5s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const dataSource = Array.from({ length: 30 }).map((_, i) => ({
    key: i,
    id: `SHP-2024-${1000 + i}`,
    origin: ['Hamburg, DE', 'Shanghai, CN', 'Singapore, SG', 'Rotterdam, NL'][i % 4],
    destination: ['New York, US', 'Long Beach, US', 'Ho Chi Minh, VN', 'Tokyo, JP'][i % 4],
    status: ['In Transit', 'Arrived', 'Delayed', 'Pending'][i % 4],
    eta: '2024-04-15',
    progress: Math.floor(Math.random() * 100),
    type: i % 2 === 0 ? 'SEA' : 'AIR'
  }));

  const columns = [
    { title: 'Shipment ID', dataIndex: 'id', key: 'id', render: (text: string) => <Text strong>{text}</Text> },
    { 
      title: 'Route', 
      key: 'route', 
      render: (_: any, record: any) => (
        <Space direction="vertical" size={0}>
          <Text type="secondary" style={{ fontSize: 12 }}>From: {record.origin}</Text>
          <Text style={{ fontSize: 12 }}>To: {record.destination}</Text>
        </Space>
      )
    },
    { 
      title: 'Mode', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => <Tag color={type === 'SEA' ? 'blue' : 'purple'}>{type}</Tag>
    },
    { 
      title: 'Progress', 
      dataIndex: 'progress', 
      key: 'progress',
      render: (v: number) => <Progress percent={v} size="small" strokeColor={v > 80 ? '#52c41a' : '#1677ff'} />
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { 'In Transit': 'processing', 'Arrived': 'success', 'Delayed': 'error', 'Pending': 'default' };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    { title: '', key: 'action', render: () => <MoreVertical size={16} cursor="pointer" /> }
  ];

  return (
    <div className="dashboard-content">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Dashboard Overview</Title>
          <Text type="secondary">Welcome back, Hoang! Monitoring 1,240 active logistics chains.</Text>
        </div>
        <Tag color="red" style={{ borderRadius: 20, padding: '2px 12px' }}>LIVE UPDATES ACTIVE</Tag>
      </div>

      {/* Top Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="status-card" loading={isLoading}>
            <Statistic
              title={<Text type="secondary">Total Shipments</Text>}
              value={1240}
              prefix={<Compass size={20} style={{ color: '#e30613', marginRight: 8 }} />}
              suffix={<Text type="success" style={{ fontSize: 12 }}><TrendingUp size={12} /> +12%</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="status-card" loading={isLoading}>
            <Statistic
              title={<Text type="secondary">In Transit</Text>}
              value={425}
              prefix={<Send size={20} style={{ color: '#e30613', marginRight: 8 }} />}
              suffix={<Text type="warning" style={{ fontSize: 12 }}><Activity size={12} /> Steady</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="status-card" loading={isLoading}>
            <Statistic
              title={<Text type="secondary">On Time Rate</Text>}
              value={94.2}
              precision={1}
              suffix="%"
              prefix={<CheckCircle size={20} style={{ color: '#52c41a', marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="status-card" loading={isLoading}>
            <Statistic
              title={<Text type="secondary">Pending Action</Text>}
              value={15}
              prefix={<Clock size={20} style={{ color: '#faad14', marginRight: 8 }} />}
              suffix={<Text type="danger" style={{ fontSize: 12 }}><TrendingUp size={12} /> High</Text>}
            />
          </Card>
        </Col>
      </Row>

      {/* Middle Section: Main Table */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card 
            title={<Space><Activity size={18} /> Active Shipment Monitor</Space>} 
            extra={<Tag color="blue">Total 842 Active</Tag>}
            bordered={false}
            bodyStyle={{ padding: 0 }}
          >
            <Table 
              loading={isLoading}
              dataSource={dataSource} 
              columns={columns} 
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
      </Row>

      {/* Analytics Grid */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<Space><History size={18} /> Operation Logs</Space>} bordered={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ background: '#f0f0f0', borderRadius: '50%', width: 32, height: 32, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <MapPin size={14} color="#e30613" />
                  </div>
                  <div>
                    <Text strong>Cargo Arrived at Port of Shanghai</Text>
                    <div><Text type="secondary" style={{ fontSize: 12 }}>Shipment #SHP-9281 reached terminal 4. Automatic customs clearance triggered for 42 units.</Text></div>
                    <Text type="secondary" style={{ fontSize: 11 }}>2 hours ago</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Volume Distribution" bordered={false}>
                <Text type="secondary">Asia-Pacific Operations</Text>
                <Progress percent={82} status="active" strokeColor="#e30613" />
                <div style={{ marginTop: 12 }}>
                  <Text type="secondary">Europe-Americas</Text>
                  <Progress percent={45} status="active" strokeColor="#1d1d1d" />
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
                <Statistic title="Emissions Saved" value={12.5} suffix="Tons" valueStyle={{ color: '#52c41a' }} />
                <ArrowUpRight size={14} />
              </Card>
            </Col>
            <Col span={12}>
              <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
                <Statistic title="Cost Efficiency" value={8.2} suffix="%" />
                <ArrowDownRight size={14} style={{ color: '#ff4d4f' }} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Footer Space test */}
      <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: 0.3, marginTop: 40, borderTop: '1px dashed #ccc' }}>
        <Text type="secondary">SYSTEM LOG END - SCROLL TEST COMPLETE</Text>
      </div>
    </div>
  );
};
