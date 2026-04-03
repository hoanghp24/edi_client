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
    PART_OVERVIEW: '/master-data/part/overview',
    PART_ADD: '/master-data/part/add',
    PART_IMPORT: '/master-data/part/import',
  },
  SPLASH_GALLERY: '/splash-gallery',
};

export const ROUTE_NAMES: Record<string, string> = {
  [ROUTES.DASHBOARD]: 'Dashboard',
  [ROUTES.SHIPPING_PLAN.SERIAL]: 'Serial Shipping Plan',
  [ROUTES.SHIPPING_PLAN.SAMPLE]: 'Sample Shipping Plan',
  [ROUTES.TRACKING.MODE_AIR]: 'Air Freight Tracking',
  [ROUTES.TRACKING.MODE_SEA]: 'Sea Freight Tracking',
  [ROUTES.TRACKING.STATUS_TRANSIT]: 'In-Transit Monitoring',
  [ROUTES.TRACKING.STATUS_ARRIVED]: 'Shipment Arrivals',
  [ROUTES.SHIPPING_ADVICE]: 'Shipping Advice',
  [ROUTES.MASTER_DATA.CUSTOMER]: 'End Customer Registry',
  [ROUTES.MASTER_DATA.LEAD_TIME]: 'Transit Lead Times',
  [ROUTES.MASTER_DATA.PART_OVERVIEW]: 'Part Overview',
  [ROUTES.MASTER_DATA.PART_ADD]: 'Manual Part Entry',
  [ROUTES.MASTER_DATA.PART_IMPORT]: 'Batch Part Import',
  [ROUTES.SPLASH_GALLERY]: 'Visual Showcase',
  [ROUTES.LOGIN]: 'Sign In',
};
