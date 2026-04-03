import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ 
  showSpinner: false, 
  speed: 400, 
  minimum: 0.1,
  trickleSpeed: 200 
});

let activeTasks = 0;

export const startProgress = () => {
  if (activeTasks === 0) {
    NProgress.start();
  }
  activeTasks++;
};

export const stopProgress = () => {
  activeTasks--;
  if (activeTasks <= 0) {
    activeTasks = 0;
    NProgress.done();
  }
};
