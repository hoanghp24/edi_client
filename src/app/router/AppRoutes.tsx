import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth';

import { Login } from '@/pages/login';
import { MainLayout } from '@/app/layouts/MainLayout';
import { Placeholder } from '@/shared/ui';

import { PrivateRoute } from './PrivateRoute';
import { ROUTES } from '@/shared/constants';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Placeholder title="Dashboard" />} />

          <Route path={ROUTES.SHIPPING_PLAN.SERIAL} element={<Placeholder title="Serial Shipping Plan" />} />
          <Route path={ROUTES.SHIPPING_PLAN.SAMPLE} element={<Placeholder title="Sample Shipping Plan" />} />
          <Route path={ROUTES.TRACKING.MODE_AIR} element={<Placeholder title="Tracking Ship AIR" />} />
          <Route path={ROUTES.TRACKING.MODE_SEA} element={<Placeholder title="Tracking Ship SEA" />} />
          <Route path={ROUTES.TRACKING.STATUS_TRANSIT} element={<Placeholder title="Tracking In Transit" />} />
          <Route path={ROUTES.TRACKING.STATUS_ARRIVED} element={<Placeholder title="Tracking Arrived" />} />
          <Route path={ROUTES.SHIPPING_ADVICE} element={<Placeholder title="Shipping Advice" />} />
          <Route path={ROUTES.MASTER_DATA.CUSTOMER} element={<Placeholder title="Master Data End Customer" />} />
          <Route path={ROUTES.MASTER_DATA.LEAD_TIME} element={<Placeholder title="Master Data Transit Lead Time" />} />
          <Route path={ROUTES.MASTER_DATA.PART_OVERVIEW} element={<Placeholder title="Part Overview" />} />
          <Route path={ROUTES.MASTER_DATA.PART_ADD} element={<Placeholder title="Master Data Manual Add" />} />
          <Route path={ROUTES.MASTER_DATA.PART_IMPORT} element={<Placeholder title="Master Data Import by file" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
