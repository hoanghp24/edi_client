import { PartItem, PartStatus } from '../types/part';

/**
 * Service Fetch Parts
 * Giả lập nạp danh sách linh kiện từ Server
 */
export const getParts = async (): Promise<PartItem[]> => {
  // Giả lập delay mạng 1200ms
  await new Promise(resolve => setTimeout(resolve, 1200));

  const customers = ['Porsche', 'BMW', 'Airbus', 'Boeing', 'Ferrari', 'Tesla'];
  const categories = ['Automotive', 'Aerospace', 'Industrial', 'Prototype'];
  const materials = ['Carbon Fiber', 'Aluminum', 'Titanium', 'Composite'];
  const statuses: PartStatus[] = ['Active', 'Development', 'Obsolete'];

  return Array.from({ length: 25 }).map((_, i) => ({
    key: i,
    id: `PRT-${100 + i}`,
    partNo: `AC-2024-P${1000 + i}`,
    description: `Component Pillar Section ${i + 1} - Reinforced`,
    customerName: customers[i % customers.length],
    category: categories[i % categories.length],
    material: materials[i % materials.length],
    weight: `${(Math.random() * 5 + 0.5).toFixed(2)} kg`,
    status: statuses[i % 3],
    createdAt: '2024-03-15'
  }));
};
