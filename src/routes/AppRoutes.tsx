import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../pages/login/Login";
import { MainLayout } from "../layouts/MainLayout";
import { DashboardOverview } from "../pages/dashboard/DashboardOverview";
import { Placeholder } from "../pages/Placeholder";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTES } from "./routes";
import { useAuth } from "../context/AuthContext";

export const AppRoutes = () => {
  const { loading } = useAuth();

  // Show a stable background during auth state transitions to prevent white flashes
  if (loading) {
    return <div style={{ background: '#0f172a', height: '100vh', width: '100vw' }} />;
  }

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardOverview />} />
          
          <Route path={ROUTES.SHIPPING_PLAN.SERIAL} element={<Placeholder title="Serial Shipping Plan" />} />
          <Route path={ROUTES.SHIPPING_PLAN.SAMPLE} element={<Placeholder title="Sample Shipping Plan" />} />

          <Route path={ROUTES.TRACKING.MODE_AIR} element={<Placeholder title="Tracking Ship AIR" />} />
          <Route path={ROUTES.TRACKING.MODE_SEA} element={<Placeholder title="Tracking Ship SEA" />} />
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

      <Route element={<PublicRoute />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
};
