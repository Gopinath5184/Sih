import React, { useState, useEffect } from 'react';
import { stateService } from './services/stateService';
import { UserRole } from './types';

// Layout & Global Components
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { NotificationPanel } from './components/common/NotificationPanel';
import { RoleSwitcherModal } from './components/common/RoleSwitcherModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';

// Pages
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { ProduceManagement } from './pages/ProduceManagement';
import { Marketplace } from './pages/Marketplace';
import { PriceIntelligence } from './pages/PriceIntelligence';
import { StorageManagement } from './pages/StorageManagement';
import { PostHarvestLoss } from './pages/PostHarvestLoss';
import { ProcessingHub } from './pages/ProcessingHub';
import { TransportLogistics } from './pages/TransportLogistics';
import { TraceabilityPage } from './pages/TraceabilityPage';
import { FpoDashboard } from './pages/FpoDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminGovDashboard } from './pages/AdminGovDashboard';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { AuthPage } from './pages/AuthPage';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState<boolean>(false);
  const [activeTraceProduceId, setActiveTraceProduceId] = useState<string>('AGR-2026-004582');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Reactive state from StateService
  const [produceList, setProduceList] = useState(stateService.getProduce());
  const [storageList, setStorageList] = useState(stateService.getStorage());
  const [marketPrices, setMarketPrices] = useState(stateService.getMarketPrices());
  const [processingBatches, setProcessingBatches] = useState(stateService.getProcessingBatches());
  const [shipments, setShipments] = useState(stateService.getShipments());
  const [schemes, setSchemes] = useState(stateService.getSchemes());
  const [notifications, setNotifications] = useState(stateService.getNotifications());
  const [buyerOrders, setBuyerOrders] = useState(stateService.getBuyerOrders());
  const [currentUser, setCurrentUser] = useState(stateService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(stateService.isAuthenticated());

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const unsubscribe = stateService.subscribe(() => {
      setProduceList(stateService.getProduce());
      setStorageList(stateService.getStorage());
      setMarketPrices(stateService.getMarketPrices());
      setProcessingBatches(stateService.getProcessingBatches());
      setShipments(stateService.getShipments());
      setSchemes(stateService.getSchemes());
      setNotifications(stateService.getNotifications());
      setBuyerOrders(stateService.getBuyerOrders());
      setCurrentUser(stateService.getCurrentUser());
      setIsAuthenticated(stateService.isAuthenticated());
    });

    return () => unsubscribe();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTraceability = (produceId: string) => {
    setActiveTraceProduceId(produceId);
    handleNavigate('traceability');
  };

  const navigateToRoleHome = (role: UserRole) => {
    if (role === 'farmer') handleNavigate('farmer');
    else if (role === 'fpo') handleNavigate('fpo');
    else if (role === 'processor') handleNavigate('processing');
    else if (role === 'transporter') handleNavigate('transport');
    else if (role === 'buyer') handleNavigate('buyer');
    else if (role === 'admin' || role === 'government') handleNavigate('admin');
  };

  const handleRoleChanged = (newRole: UserRole) => {
    stateService.switchUserRole(newRole);
    const updatedUser = stateService.getCurrentUser();
    showToast('Workspace Switched', `Signed in as ${updatedUser.name} (${newRole.toUpperCase()}).`, 'info');
    navigateToRoleHome(newRole);
  };

  const handleLoginSuccess = (role: UserRole) => {
    const updatedUser = stateService.getCurrentUser();
    showToast('Signed In', `Welcome back, ${updatedUser.name}.`, 'success');
    navigateToRoleHome(role);
  };

  const handleLogout = () => {
    stateService.logoutUser();
    showToast('Signed Out', 'You have signed out of your workspace.', 'info');
    handleNavigate('auth');
  };

  const isDashboardLayout = currentPage !== 'landing' && currentPage !== 'auth';

  return (
    <div className="min-h-screen bg-[#f6f4ee] text-slate-900 flex flex-col font-sans selection:bg-agri-200 selection:text-agri-950">
      {/* Top Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
        isAuthenticated={isAuthenticated}
        unreadNotificationsCount={unreadCount}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex w-full">
        {/* Conditional Sidebar for Dashboard Views */}
        {isDashboardLayout && (
          <div className="hidden lg:block shrink-0">
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              currentRole={currentUser.role}
            />
          </div>
        )}

        {/* Page Viewport */}
        <main className="flex-1 w-full min-w-0">
          {currentPage === 'landing' && (
            <LandingPage
              onNavigate={handleNavigate}
              onSelectRole={handleRoleChanged}
            />
          )}

          {currentPage === 'farmer' && (
            <FarmerDashboard
              produceList={produceList}
              marketPrices={marketPrices}
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onOpenAddProduce={() => handleNavigate('produce')}
              onViewTraceability={handleViewTraceability}
            />
          )}

          {currentPage === 'produce' && (
            <ProduceManagement
              produceList={produceList}
              currentUser={currentUser}
              onViewTraceability={handleViewTraceability}
            />
          )}

          {currentPage === 'marketplace' && (
            <Marketplace
              produceList={produceList}
              currentUser={currentUser}
              onViewTraceability={handleViewTraceability}
              onOrderPlaced={() => handleNavigate('buyer')}
            />
          )}

          {currentPage === 'price-intelligence' && (
            <PriceIntelligence
              marketPrices={marketPrices}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'storage' && (
            <StorageManagement
              storageFacilities={storageList}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'post-harvest-loss' && (
            <PostHarvestLoss
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'processing' && (
            <ProcessingHub
              batches={processingBatches}
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'transport' && (
            <TransportLogistics
              shipments={shipments}
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'traceability' && (
            <TraceabilityPage
              produceList={produceList}
              initialProduceId={activeTraceProduceId}
            />
          )}

          {currentPage === 'fpo' && (
            <FpoDashboard
              produceList={produceList}
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onViewTraceability={handleViewTraceability}
            />
          )}

          {currentPage === 'buyer' && (
            <BuyerDashboard
              produceList={produceList}
              buyerOrders={buyerOrders}
              currentUser={currentUser}
              onNavigate={handleNavigate}
              onViewTraceability={handleViewTraceability}
            />
          )}

          {currentPage === 'admin' && (
            <AdminGovDashboard
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'schemes' && (
            <GovernmentSchemes
              schemes={schemes}
              onNavigate={handleNavigate}
            />
          )}

          {currentPage === 'auth' && (
            <AuthPage
              onLoginSuccess={handleLoginSuccess}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-over Notifications Center */}
      <NotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onNavigate={handleNavigate}
      />

      {/* Stakeholder Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleSwitcherOpen}
        onClose={() => setIsRoleSwitcherOpen(false)}
        currentRole={currentUser.role}
        onRoleChanged={handleRoleChanged}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
