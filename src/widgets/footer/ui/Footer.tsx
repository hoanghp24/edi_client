import React from 'react';
import { Layout } from 'antd';
import './Footer.scss'; // Add this file later if needed

const { Footer } = Layout;

/**
 * 🧱 Footer Layout Component
 * 
 * Target: Display global footer (e.g., Copyright, Version, Links).
 * Usage: Placed inside MainLayout beneath the main content area.
 */
export const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center', backgroundColor: 'transparent', color: '#888' }}>
      VAC Logistics Modern App ©{new Date().getFullYear()} - Version 1.0.0
    </Footer>
  );
};
