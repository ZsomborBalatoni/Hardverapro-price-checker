import React from 'react';
import { createRoot } from 'react-dom/client';
import DashboardLayout from './dashboard/dashboardLayout';

const rootElement = document.createElement('div');
document.body.appendChild(rootElement);
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <DashboardLayout />
  </React.StrictMode>
);
