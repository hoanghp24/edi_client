/**
 * Dashboard Service
 * Cung cấp dữ liệu KPIs và danh sách vận chuyển chủ chốt cho Dashboard Overview
 */

export interface DashboardStats {
  totalShipments: number;
  totalChange: number;
  inTransit: number;
  transitStatus: 'steady' | 'busy' | 'relax';
  onTimeRate: number;
  pendingActions: number;
  pendingStatus: 'high' | 'low' | 'normal';
}

export interface ShipmentItem {
  key: string | number;
  id: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  status: 'In Transit' | 'Arrived' | 'Delayed' | 'Pending';
  eta: string;
  progress: number;
  type: 'SEA' | 'AIR';
}

/**
 * Giả lập fetch dữ liệu KPIs
 */
export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Giả lập delay mạng 800ms
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    totalShipments: 1240,
    totalChange: 12,
    inTransit: 425,
    transitStatus: 'steady',
    onTimeRate: 94.2,
    pendingActions: 15,
    pendingStatus: 'high'
  };
};

/**
 * Giả lập danh sách Shipment đang hoạt động
 */
export const getActiveShipments = async (): Promise<ShipmentItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const origins = [
    { name: 'Hamburg, DE', code: 'DE' },
    { name: 'Shanghai, CN', code: 'CN' },
    { name: 'Singapore, SG', code: 'SG' },
    { name: 'Rotterdam, NL', code: 'NL' },
    { name: 'Ho Chi Minh, VN', code: 'VN' }
  ];
  
  const destinations = [
    { name: 'New York, US', code: 'US' },
    { name: 'Long Beach, US', code: 'US' },
    { name: 'Haiphong, VN', code: 'VN' },
    { name: 'Tokyo, JP', code: 'JP' },
    { name: 'Bangkok, TH', code: 'TH' }
  ];

  return Array.from({ length: 15 }).map((_, i) => ({
    key: i,
    id: `SHP-2024-${1000 + i}`,
    origin: origins[i % 5].name,
    originCode: origins[i % 5].code,
    destination: destinations[i % 5].name,
    destinationCode: destinations[i % 5].code,
    status: ['In Transit', 'Arrived', 'Delayed', 'Pending'][i % 4] as 'In Transit' | 'Arrived' | 'Delayed' | 'Pending',
    eta: '2024-04-15',
    progress: Math.floor(Math.random() * 85) + 10,
    type: i % 2 === 0 ? 'SEA' : 'AIR'
  }));
};
