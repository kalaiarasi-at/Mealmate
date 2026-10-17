/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Toast } from './components/common/Toast';
import { HomePage } from './components/home/HomePage';
import { MenuPage } from './components/menu/MenuPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/orders/OrderConfirmationPage';
import { OrdersPage } from './components/orders/OrdersPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AboutPage } from './components/about/AboutPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'confirmation':
        return <OrderConfirmationPage />;
      case 'orders':
        return <OrdersPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
