import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTE_NAMES } from '../routes/routes';

const APP_NAME = 'Shipping Plan';

export const usePageTitle = (customTitle?: string) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const titleFromRoute = ROUTE_NAMES[pathname];
    const displayTitle = customTitle || titleFromRoute;

    document.title = displayTitle ? `${displayTitle} | ${APP_NAME}` : APP_NAME;
    return () => {
      document.title = APP_NAME;
    };
  }, [pathname, customTitle]);
};
