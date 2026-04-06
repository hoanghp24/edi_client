export interface PartMasterRecord {
  id: string;
  type: 'Sample' | 'Serial';
  partNo: string;
  partName: string;
  oemNo: string;
  tier1No: string;
  pcsPerBox: number | null;
  boxDim: string;
  weight: number | null;
  nomCap: number | null;
  safetyStock: number | null;
  maxStock: number | null;
  sop: string | null;
  eop: string | null;
  kam: string;
  transitToCustomers: Array<{
    name: string;
    transitLeadTimes: number;
    date: string;
  }>;
  poNoHac: string;
  acaCs: string;
  saleCategory: string;
  shipTo: string;
  customer: string;
  project: string;
  plant: string;
  openPoQty: number | null;
  whOpenQty: number | null;
}
