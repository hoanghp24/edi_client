import React from 'react';
import { Button, Input } from '@/shared/ui';
import { Card, Space, Row, Col, Statistic, Tag } from 'antd';
import { PartMasterTable } from '@/features/part-master';
import { PartMasterRecord } from '@/shared/types';
import { Plus, FileJson } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants';
import './MasterData.scss';

export const MasterDataOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');

  const filteredData = React.useMemo(() => {
    const data: PartMasterRecord[] = [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((r) =>
      [r.partNo, r.partName, r.shipTo, r.customer, r.project, r.plant].some((v) => v?.toLowerCase().includes(q))
    );
  }, [search]);

  return (
    <div className="master-data-page">
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card size="small" styles={{ body: { padding: '12px 24px' } }}>
          <Row gutter={48} align="middle">
            <Col>
              <Statistic title="Total PN" value={100} prefix={<Tag color="blue">All</Tag>} />
            </Col>
            <Col>
              <Statistic title="Generated Data" value={90} />
            </Col>
            <Col>
              <Statistic title="Pending Generate Data" value={10} valueStyle={{ color: '#faad14' }} />
            </Col>
            <Col>
              <Statistic title="Generation Completion" value={90} suffix="%" valueStyle={{ color: '#3f8600' }} />
            </Col>
          </Row>
        </Card>

        {/* Desktop Controls */}
        <Card
          title="Part Master Data"
          styles={{ body: { paddingTop: 0 } }}
          extra={
            <Space size={8}>
              <Button onClick={() => navigate(ROUTES.MASTER_DATA.PART_IMPORT)}>
                <Space size={4}>
                  <FileJson size={16} /> Import from File
                </Space>
              </Button>
              <Button onClick={() => navigate(ROUTES.MASTER_DATA.PART_ADD)} type="primary">
                <Space size={4}>
                  <Plus size={16} /> Manual Add
                </Space>
              </Button>
              <Button event="export" />
            </Space>
          }
        >
          <div style={{ padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Input
              type="search"
              placeholder="Search part no., name, customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: 320 }}
            />
          </div>

          <PartMasterTable data={filteredData} />
        </Card>
      </Space>
    </div>
  );
};
