import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './TopProgressBar.scss';

NProgress.configure({ 
  showSpinner: false,
  speed: 400,
  minimum: 0.1,
  trickleSpeed: 200 
});

export const TopProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 150);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};
