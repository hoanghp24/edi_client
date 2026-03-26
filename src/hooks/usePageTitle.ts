import { useEffect } from 'react';

const APP_NAME = 'Shipping Plan';

export const usePageTitle = (pageTitle?: string) => {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${APP_NAME}` : APP_NAME;
    return () => {
      document.title = APP_NAME;
    };
  }, [pageTitle]);
};
