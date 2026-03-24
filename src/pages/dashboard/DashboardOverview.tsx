import React from 'react';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import {
  Ship,
  Send,
  CheckCircle,
  Clock,
  Compass
} from 'lucide-react';

const { Title } = Typography;

export const DashboardOverview = () => {
  return (
    <div style={{ padding: '0 24px' }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={3} style={{ margin: 0 }}>Dashboard Overview</Title>
        <Typography.Text type="secondary">
          Welcome back! Here is the summary of your logistics operations today.
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <Statistic
              title="Total Shipments (This Month)"
              value={1240}
              prefix={<Compass size={20} style={{ color: '#1677ff', marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <Statistic
              title="In Transit"
              value={425}
              prefix={<Send size={20} style={{ color: '#faad14', marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <Statistic
              title="Arrived Successfully"
              value={810}
              prefix={<CheckCircle size={20} style={{ color: '#52c41a', marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <Statistic
              title="Pending Plans"
              value={15}
              prefix={<Clock size={20} style={{ color: '#ff4d4f', marginRight: 8 }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Shipment Volume via Air vs Sea" bordered={false} style={{ minHeight: 400, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            {/* Chart placeholder */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300, background: '#fafafa', borderRadius: 8, color: '#bfbfbf' }}>
              [ Chart Integration Area ]
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Notifications" bordered={false} style={{ minHeight: 400, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <Clock size={16} style={{ color: '#1677ff', marginTop: 4 }} />
                <div>
                  <div style={{ fontWeight: 500 }}>Vessel Delayed</div>
                  <div style={{ fontSize: 13, color: '#8c8c8c' }}>Shipment #1042 ETA extended by 2 days</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <CheckCircle size={16} style={{ color: '#52c41a', marginTop: 4 }} />
                <div>
                  <div style={{ fontWeight: 500 }}>Customs Cleared</div>
                  <div style={{ fontSize: 13, color: '#8c8c8c' }}>3 AIR shipments cleared in NY</div>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

