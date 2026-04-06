export const ROUTES = {
  HOME: '/',
  LOGIN: '/',
  DASHBOARD: '/dashboard',
  SHIPPING_PLAN: {
    SERIAL: '/shipping-plan/serial',
    SAMPLE: '/shipping-plan/sample',
  },
  TRACKING: {
    MODE_AIR: '/tracking/mode/air',
    MODE_SEA: '/tracking/mode/sea',
    STATUS_TRANSIT: '/tracking/status/transit',
    STATUS_ARRIVED: '/tracking/status/arrived',
  },
  SHIPPING_ADVICE: '/shipping-advice',
  MASTER_DATA: {
    CUSTOMER: '/master-data/customer',
    LEAD_TIME: '/master-data/lead-time',
    PART_OVERVIEW: '/master-data/overview',
    PART_ADD: '/master-data/add',
    PART_IMPORT: '/master-data/import',
  },
};

export const ROUTE_NAMES: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Home',
  [ROUTES.SHIPPING_PLAN.SERIAL]: 'Serial Shipping Plan',
  [ROUTES.SHIPPING_PLAN.SAMPLE]: 'Sample Shipping Plan',
  [ROUTES.TRACKING.MODE_AIR]: 'Air Freight Tracking',
  [ROUTES.TRACKING.MODE_SEA]: 'Sea Freight Tracking',
  [ROUTES.TRACKING.STATUS_TRANSIT]: 'In-Transit Monitoring',
  [ROUTES.TRACKING.STATUS_ARRIVED]: 'Shipment Arrivals',
  [ROUTES.SHIPPING_ADVICE]: 'Shipping Advice',
  [ROUTES.MASTER_DATA.CUSTOMER]: 'End Customer Registry',
  [ROUTES.MASTER_DATA.LEAD_TIME]: 'Transit Lead Times',
  [ROUTES.MASTER_DATA.PART_OVERVIEW]: 'Master Data Overview',
  [ROUTES.MASTER_DATA.PART_ADD]: 'Master Data - Add',
  [ROUTES.MASTER_DATA.PART_IMPORT]: 'Master Data - Import',
  [ROUTES.LOGIN]: 'Sign In',
};

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export const ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  [ROUTES.SHIPPING_PLAN.SERIAL]: [
    { label: 'Shipping Plan' },
    { label: 'Serial' },
  ],
  [ROUTES.SHIPPING_PLAN.SAMPLE]: [
    { label: 'Shipping Plan' },
    { label: 'Sample' },
  ],
  [ROUTES.TRACKING.MODE_AIR]: [
    { label: 'Shipment Tracking' },
    { label: 'Air Freight' },
  ],
  [ROUTES.TRACKING.MODE_SEA]: [
    { label: 'Shipment Tracking' },
    { label: 'Sea Freight' },
  ],
  [ROUTES.TRACKING.STATUS_TRANSIT]: [
    { label: 'Shipment Tracking' },
    { label: 'In Transit' },
  ],
  [ROUTES.TRACKING.STATUS_ARRIVED]: [
    { label: 'Shipment Tracking' },
    { label: 'Arrived' },
  ],
  [ROUTES.SHIPPING_ADVICE]: [
    { label: 'Shipping Advice' },
  ],
  [ROUTES.MASTER_DATA.CUSTOMER]: [
    { label: 'Master Data' },
    { label: 'End Customer' },
  ],
  [ROUTES.MASTER_DATA.LEAD_TIME]: [
    { label: 'Master Data' },
    { label: 'Transit Lead Times' },
  ],
  [ROUTES.MASTER_DATA.PART_OVERVIEW]: [
    { label: 'Master Data' },
    { label: 'Overview' },
  ],
  [ROUTES.MASTER_DATA.PART_ADD]: [
    { label: 'Master Data', path: ROUTES.MASTER_DATA.PART_OVERVIEW },
    { label: 'Add' },
  ],
  [ROUTES.MASTER_DATA.PART_IMPORT]: [
    { label: 'Master Data', path: ROUTES.MASTER_DATA.PART_OVERVIEW },
    { label: 'Import' },
  ],
};

