import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../pages/Login";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardOverview } from "../pages/dashboard/DashboardOverview";
import { Placeholder } from "../pages/Placeholder";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTES } from "./routes";
import { SerialShippingPlan } from "../pages/shipping-plan/SerialShippingPlan";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.HOME} element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />

          <Route path={ROUTES.SHIPPING_PLAN.SERIAL.substring(1)} element={<SerialShippingPlan />} />
          <Route path={ROUTES.SHIPPING_PLAN.SAMPLE.substring(1)} element={<Placeholder title="Sample Shipping Plan" />} />

          <Route path={ROUTES.TRACKING.MODE_AIR.substring(1)} element={<Placeholder title="Tracking By Ship Mode (AIR)" />} />
          <Route path={ROUTES.TRACKING.MODE_SEA.substring(1)} element={<Placeholder title="Tracking By Ship Mode (SEA)" />} />
          <Route path={ROUTES.TRACKING.STATUS_TRANSIT.substring(1)} element={<Placeholder title="Tracking In Transit" />} />
          <Route path={ROUTES.TRACKING.STATUS_ARRIVED.substring(1)} element={<Placeholder title="Tracking Arrived" />} />

          <Route path={ROUTES.SHIPPING_ADVICE.substring(1)} element={<Placeholder title="Shipping Advice" />} />

          <Route path={ROUTES.MASTER_DATA.CUSTOMER.substring(1)} element={<Placeholder title="Master Data End Customer" />} />
          <Route path={ROUTES.MASTER_DATA.LEAD_TIME.substring(1)} element={<Placeholder title="Master Data Transit Lead Time" />} />
          <Route path={ROUTES.MASTER_DATA.PART_OVERVIEW.substring(1)} element={<Placeholder title="Master Data Overview" />} />
          <Route path={ROUTES.MASTER_DATA.PART_ADD.substring(1)} element={<Placeholder title="Master Data Manual Add" />} />
          <Route path={ROUTES.MASTER_DATA.PART_IMPORT.substring(1)} element={<Placeholder title="Master Data Import by file" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
