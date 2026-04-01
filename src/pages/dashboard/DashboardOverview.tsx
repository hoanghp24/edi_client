import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Tag, Space, Progress, Skeleton } from 'antd';
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
  MapPin, 
  TrendingUp 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import ScrollContainer from 'react-indiana-drag-scroll';
import CountUp from 'react-countup';
import ReactCountryFlag from 'react-country-flag';
import { getDashboardStats, getActiveShipments, ShipmentItem } from '../../features/dashboard/services/dashboardApi';
import { usePageTitle } from '../../hooks/usePageTitle';

const { Title, Text } = Typography;

export const DashboardOverview = () => {
  usePageTitle('Dashboard');

  // TanStack Query for Data Fetching
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 30000 // Cache 30s
  });

  const { data: shipments, isLoading: shipmentsLoading } = useQuery({
    queryKey: ['active-shipments'],
    queryFn: getActiveShipments
  });

  const columns = [
    // ... (rest of columns stays the same)
    { 
      title: 'Shipment ID', 
      dataIndex: 'id', 
      key: 'id', 
      render: (text: string) => <Text strong style={{ color: '#e30613' }}>{text}</Text> 
    },
    { 
      title: 'Route', 
      key: 'route', 
      width: 280,
      render: (_: any, record: ShipmentItem) => (
        <Space direction="vertical" size={2}>
          <Space size={8}>
            <ReactCountryFlag countryCode={record.originCode} svg style={{ fontSize: '1.2em', borderRadius: 2 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>From: {record.origin}</Text>
          </Space>
          <Space size={8}>
            <ReactCountryFlag countryCode={record.destinationCode} svg style={{ fontSize: '1.2em', borderRadius: 2 }} />
            <Text style={{ fontSize: 13, fontWeight: 500 }}>To: {record.destination}</Text>
          </Space>
        </Space>
      )
    },
    { 
      title: 'Mode', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'SEA' ? 'blue' : 'purple'} style={{ borderRadius: 12 }}>{type}</Tag>
      )
    },
    { 
      title: 'Progress', 
      dataIndex: 'progress', 
      key: 'progress',
      render: (v: number) => (
        <div style={{ minWidth: 120 }}>
          <Progress percent={v} size="small" strokeColor={v > 80 ? '#52c41a' : '#1677ff'} />
        </div>
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const colors: Record<string, string> = { 
          'In Transit': 'processing', 
          'Arrived': 'success', 
          'Delayed': 'error', 
          'Pending': 'default' 
        };
        return <Tag bordered={false} color={colors[status]}>{status.toUpperCase()}</Tag>;
      }
    },
    { title: 'ETA', dataIndex: 'eta', key: 'eta', width: 120 },
    { title: '', key: 'action', render: () => <MoreVertical size={16} cursor="pointer" /> }
  ];

  return (
    <div className="dashboard-content">
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <Title level={3} style={{ margin: 0, fontWeight: 700 }}>Overview</Title>
          <Text type="secondary">Real-time logistics monitoring for EDI Client.</Text>
        </div>
        <div>
          <Tag color="cyan" style={{ borderRadius: 20, padding: '2px 12px', border: 'none', fontWeight: 600 }}>
            • LIVE UPDATES ACTIVE
          </Tag>
        </div>
      </div>

      {/* Top Stats Staggered */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            styles={{ body: { padding: 20, minHeight: 102 } }} 
            hoverable 
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
          >
            <Skeleton loading={statsLoading} active paragraph={{ rows: 1 }} title={false}>
              <Statistic
                title={<Text type="secondary">Total Shipments</Text>}
                value={stats?.totalShipments}
                formatter={(val) => <CountUp end={Number(val)} separator="," duration={2} />}
                prefix={<Compass size={20} style={{ color: '#e30613', marginRight: 8 }} />}
                suffix={<Text type="success" style={{ fontSize: 12 }}><TrendingUp size={12} /> +{stats?.totalChange}%</Text>}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            styles={{ body: { padding: 20, minHeight: 102 } }} 
            hoverable 
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
          >
            <Skeleton loading={statsLoading} active paragraph={{ rows: 1 }} title={false}>
              <Statistic
                title={<Text type="secondary">In Transit</Text>}
                value={stats?.inTransit}
                formatter={(val) => <CountUp end={Number(val)} duration={2} />}
                prefix={<Send size={20} style={{ color: '#e30613', marginRight: 8 }} />}
                suffix={<Tag bordered={false} color="orange" style={{ fontSize: 10, marginLeft: 8 }}>{stats?.transitStatus.toUpperCase()}</Tag>}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            styles={{ body: { padding: 20, minHeight: 102 } }} 
            hoverable 
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
          >
            <Skeleton loading={statsLoading} active paragraph={{ rows: 1 }} title={false}>
              <Statistic
                title={<Text type="secondary">On Time Rate</Text>}
                value={stats?.onTimeRate}
                formatter={(val) => <CountUp end={Number(val)} decimals={1} suffix="%" duration={2} />}
                prefix={<CheckCircle size={20} style={{ color: '#52c41a', marginRight: 8 }} />}
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            bordered={false} 
            styles={{ body: { padding: 20, minHeight: 102 } }} 
            hoverable 
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}
          >
            <Skeleton loading={statsLoading} active paragraph={{ rows: 1 }} title={false}>
              <Statistic
                title={<Text type="secondary">Pending Action</Text>}
                value={stats?.pendingActions}
                formatter={(val) => <CountUp end={Number(val)} duration={2} />}
                prefix={<Clock size={20} style={{ color: '#faad14', marginRight: 8 }} />}
                suffix={<Tag color="red" bordered={false} style={{ fontSize: 10, marginLeft: 8 }}>{stats?.pendingStatus.toUpperCase()}</Tag>}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      {/* Main Table Segment with Drag Scroll */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24}>
          <Card 
            title={<Space><Activity size={18} color="#e30613" /> Active Shipment Monitor</Space>} 
            extra={<Tag bordered={false} color="blue">{shipments?.length} Active Items</Tag>}
            bordered={false}
            styles={{ body: { padding: 0 } }}
          >
            <ScrollContainer className="scroll-container" hideScrollbars={false}>
              <Table 
                loading={shipmentsLoading}
                dataSource={shipments} 
                columns={columns} 
                pagination={false}
                size="middle"
                rowClassName="dashboard-table-row"
              />
            </ScrollContainer>
          </Card>
        </Col>
      </Row>

      {/* Bottom Analytics */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title={<Space><History size={18} color="#e30613" /> Recent Operation Logs</Space>} bordered={false}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ background: '#f5f5f5', borderRadius: '50%', width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <MapPin size={16} color="#e30613" />
                  </div>
                  <div>
                    <Text strong>Port Logistics Update - SHP-{9280 + i}</Text>
                    <div style={{ marginTop: 2 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Shipment reached destination terminal. Customs processing initiated for APAC region.
                      </Text>
                    </div>
                    <Text type="secondary" style={{ fontSize: 11, fontStyle: 'italic' }}>{i * 15} minutes ago</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Transport Distribution" bordered={false}>
            <div style={{ padding: '8px 0' }}>
              <Text strong>AIR Freight (Standard)</Text>
              <Progress percent={64} status="active" strokeColor="#e30613" />
            </div>
            <div style={{ marginTop: 24, padding: '8px 0' }}>
              <Text strong>SEA Cargo (Express)</Text>
              <Progress percent={92} status="active" strokeColor="#1d1d1d" />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
