import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../pages/login/Login";
import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardOverview } from "../pages/dashboard/DashboardOverview";
import { Placeholder } from "../pages/Placeholder";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTES } from "./routes";
import { SerialShippingPlan } from "../pages/shipping-plan/SerialShippingPlan";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root Route: Switch between Login and Dashboard Home depending on Auth */}
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <DashboardLayout />
          ) : (
            <Login />
          )
        }
      >
        <Route index element={isAuthenticated ? <DashboardOverview /> : null} />
      </Route>

      {/* Internal Dashboard Routes (All Root-Relative) */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.SHIPPING_PLAN.SERIAL} element={<SerialShippingPlan />} />
          <Route path={ROUTES.SHIPPING_PLAN.SAMPLE} element={<Placeholder title="Sample Shipping Plan" />} />

          <Route path={ROUTES.TRACKING.MODE_AIR} element={<Placeholder title="Tracking By Ship Mode (AIR)" />} />
          <Route path={ROUTES.TRACKING.MODE_SEA} element={<Placeholder title="Tracking By Ship Mode (SEA)" />} />
          <Route path={ROUTES.TRACKING.STATUS_TRANSIT} element={<Placeholder title="Tracking In Transit" />} />
          <Route path={ROUTES.TRACKING.STATUS_ARRIVED} element={<Placeholder title="Tracking Arrived" />} />

          <Route path={ROUTES.SHIPPING_ADVICE} element={<Placeholder title="Shipping Advice" />} />

          <Route path={ROUTES.MASTER_DATA.CUSTOMER} element={<Placeholder title="Master Data End Customer" />} />
          <Route path={ROUTES.MASTER_DATA.LEAD_TIME} element={<Placeholder title="Master Data Transit Lead Time" />} />
          <Route path={ROUTES.MASTER_DATA.PART_OVERVIEW} element={<Placeholder title="Master Data Overview" />} />
          <Route path={ROUTES.MASTER_DATA.PART_ADD} element={<Placeholder title="Master Data Manual Add" />} />
          <Route path={ROUTES.MASTER_DATA.PART_IMPORT} element={<Placeholder title="Master Data Import by file" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
