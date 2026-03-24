import React from "react";
import { LayoutDashboard, CalendarRange, MapPin, Database, Info } from "lucide-react";
import { ROUTES } from "../routes";

export const MENU_KEYS = {
  SHIPPING_PLAN: "shipping-plan",
  TRACKING: "shipment-tracking",
  TRACKING_MODE: "by-ship-mode",
  TRACKING_STATUS: "by-status",
  MASTER_DATA: "master-data-setup",
  MASTER_DATA_PART: "master-data-part",
};

const iconSize = 18;

import { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    key: ROUTES.HOME,
    icon: <LayoutDashboard size={iconSize} />,
    label: "Dashboard",
  },
  {
    key: MENU_KEYS.SHIPPING_PLAN,
    icon: <CalendarRange size={iconSize} />,
    label: "Shipping Plan",
    children: [
      { key: ROUTES.SHIPPING_PLAN.SERIAL, label: "Serial Shipping Plan" },
      { key: ROUTES.SHIPPING_PLAN.SAMPLE, label: "Sample Shipping Plan" },
    ],
  },
  {
    key: MENU_KEYS.TRACKING,
    icon: <MapPin size={iconSize} />,
    label: "Shipment Tracking",
    children: [
      {
        key: MENU_KEYS.TRACKING_MODE,
        label: "By Ship Mode",
        children: [
          { key: ROUTES.TRACKING.MODE_AIR, label: "AIR" },
          { key: ROUTES.TRACKING.MODE_SEA, label: "SEA" },
        ],
      },
      {
        key: MENU_KEYS.TRACKING_STATUS,
        label: "By Status",
        children: [
          { key: ROUTES.TRACKING.STATUS_TRANSIT, label: "In transit" },
          { key: ROUTES.TRACKING.STATUS_ARRIVED, label: "Arrived" },
        ],
      },
    ],
  },
  {
    key: ROUTES.SHIPPING_ADVICE,
    icon: <Info size={iconSize} />,
    label: "Shipping Advice",
  },
  {
    key: MENU_KEYS.MASTER_DATA,
    icon: <Database size={iconSize} />,
    label: "Master Data Setup",
    children: [
      { key: ROUTES.MASTER_DATA.CUSTOMER, label: "End Customer" },
      { key: ROUTES.MASTER_DATA.LEAD_TIME, label: "Transit Lead Time" },
      {
        key: MENU_KEYS.MASTER_DATA_PART,
        label: "Part",
        children: [
          { key: ROUTES.MASTER_DATA.PART_OVERVIEW, label: "Master Data Overview" },
          { key: ROUTES.MASTER_DATA.PART_ADD, label: "Manual Add" },
          { key: ROUTES.MASTER_DATA.PART_IMPORT, label: "Import by file" },
        ],
      },
    ],
  },
];
