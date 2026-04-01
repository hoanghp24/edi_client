import React from 'react';
import { motion } from 'framer-motion';
import vacLogo from '../../../assets/VAC_Logo.png';
import './SplashScreen.scss';

export const SplashScreen: React.FC = () => {
  return (
    <motion.div 
      className="splash-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="splash-main-container">
        <motion.div 
          className="orbit-system"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="core-glow"></div>
          <motion.img 
            initial={{ filter: 'brightness(0)' }}
            animate={{ filter: 'brightness(1.3)' }}
            transition={{ delay: 0.5, duration: 1 }}
            src={vacLogo} 
            alt="VAC Logo" 
            className="splash-logo-core" 
          />
          
          <div className="orbit-ring ring-red">
            <div className="comet"></div>
          </div>
          <div className="orbit-ring ring-white">
            <div className="comet"></div>
          </div>
        </motion.div>

        <motion.div 
          className="brand-reveal"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="brand-name">
            SHIPPING <span className="highlight">PLAN</span>
          </h1>
          <div className="loading-status">
            {[0, 1, 2].map((i) => (
              <motion.span 
                key={i}
                className="dot"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
