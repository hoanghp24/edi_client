export type PartStatus = 'Active' | 'Development' | 'Obsolete';

export interface PartItem {
  key: string | number;
  id: string; // Internal ID
  partNo: string; // Official Part Number (e.g. AC-2024-001)
  description: string;
  customerName: string;
  category: string; // e.g. Automotive, Aerospace
  material: string;
  weight: string; // e.g. "1.2 kg"
  status: PartStatus;
  createdAt: string;
}
