import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { startProgress, stopProgress } from '../utils/progress';

export const useRouteProgress = () => {
  const location = useLocation();

  useEffect(() => {
    startProgress();

    const timer = setTimeout(() => {
      stopProgress();
    }, 150);

    return () => {
      clearTimeout(timer);
      stopProgress();
    };
  }, [location.pathname]);
};
