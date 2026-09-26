import { 
  Produce, 
  StorageFacility, 
  MarketPrice, 
  ProcessingBatch, 
  Shipment, 
  GovernmentScheme, 
  NotificationItem, 
  BuyerOrder, 
  UserRole, 
  UserSession,
  TimelineEvent 
} from '../types';
import { 
  INITIAL_PRODUCE, 
  INITIAL_STORAGE, 
  INITIAL_MARKET_PRICES, 
  INITIAL_PROCESSING_BATCHES, 
  INITIAL_SHIPMENTS, 
  INITIAL_SCHEMES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_BUYER_ORDERS, 
  DEMO_USERS 
} from './mockData';

type Listener = () => void;

class StateService {
  private produce: Produce[] = [];
  private storage: StorageFacility[] = [];
  private marketPrices: MarketPrice[] = [];
  private processingBatches: ProcessingBatch[] = [];
  private shipments: Shipment[] = [];
  private schemes: GovernmentScheme[] = [];
  private notifications: NotificationItem[] = [];
  private buyerOrders: BuyerOrder[] = [];
  private currentUser: UserSession = DEMO_USERS.farmer;
  private isLoggedIn: boolean = true;
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.loadState();
  }

  private loadState() {
    try {
      const p = localStorage.getItem('agriflow_produce');
      this.produce = p ? JSON.parse(p) : INITIAL_PRODUCE;

      const s = localStorage.getItem('agriflow_storage');
      this.storage = s ? JSON.parse(s) : INITIAL_STORAGE;

      const m = localStorage.getItem('agriflow_market_prices');
      this.marketPrices = m ? JSON.parse(m) : INITIAL_MARKET_PRICES;

      const pb = localStorage.getItem('agriflow_processing');
      this.processingBatches = pb ? JSON.parse(pb) : INITIAL_PROCESSING_BATCHES;

      const sh = localStorage.getItem('agriflow_shipments');
      this.shipments = sh ? JSON.parse(sh) : INITIAL_SHIPMENTS;

      const sch = localStorage.getItem('agriflow_schemes');
      this.schemes = sch ? JSON.parse(sch) : INITIAL_SCHEMES;

      const n = localStorage.getItem('agriflow_notifications');
      this.notifications = n ? JSON.parse(n) : INITIAL_NOTIFICATIONS;

      const bo = localStorage.getItem('agriflow_buyer_orders');
      this.buyerOrders = bo ? JSON.parse(bo) : INITIAL_BUYER_ORDERS;

      const u = localStorage.getItem('agriflow_user');
      this.currentUser = u ? JSON.parse(u) : DEMO_USERS.farmer;

      const auth = localStorage.getItem('agriflow_logged_in');
      this.isLoggedIn = auth !== null ? JSON.parse(auth) : true;
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      this.resetToDefaults();
    }
  }

  private saveState() {
    try {
      localStorage.setItem('agriflow_produce', JSON.stringify(this.produce));
      localStorage.setItem('agriflow_storage', JSON.stringify(this.storage));
      localStorage.setItem('agriflow_market_prices', JSON.stringify(this.marketPrices));
      localStorage.setItem('agriflow_processing', JSON.stringify(this.processingBatches));
      localStorage.setItem('agriflow_shipments', JSON.stringify(this.shipments));
      localStorage.setItem('agriflow_schemes', JSON.stringify(this.schemes));
      localStorage.setItem('agriflow_notifications', JSON.stringify(this.notifications));
      localStorage.setItem('agriflow_buyer_orders', JSON.stringify(this.buyerOrders));
      localStorage.setItem('agriflow_user', JSON.stringify(this.currentUser));
      localStorage.setItem('agriflow_logged_in', JSON.stringify(this.isLoggedIn));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
    this.notify();
  }

  public subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  // --- Produce Methods ---
  public getProduce(): Produce[] {
    return [...this.produce];
  }

  public getProduceById(id: string): Produce | undefined {
    return this.produce.find((p) => p.id.toUpperCase() === id.toUpperCase());
  }

  public addProduce(produceData: Omit<Produce, 'id' | 'createdAt' | 'qrCodeData' | 'statusTimeline'>): Produce {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `AGR-2026-00${randomSuffix}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const initialTimeline: TimelineEvent[] = [
      {
        stage: 'Harvest Registered',
        timestamp: formattedDate,
        location: `${produceData.location.village || 'Farm Lot'}, ${produceData.location.district}`,
        handler: produceData.farmerName,
        note: `Registered ${produceData.quantityKg} kg of ${produceData.cropVariety}. Expected price: ₹${produceData.expectedPricePerKg}/kg.`,
        quality: `AGMARK Grade ${produceData.qualityGrade}`,
        status: 'completed'
      },
      {
        stage: 'FPO Quality Verification',
        timestamp: 'Scheduled within 4h',
        location: `${produceData.fpoName} Inward Bay`,
        handler: 'FPO Aggregation Incharge',
        note: 'Lot weighbridge ticket and moisture/grade verification',
        status: 'current'
      }
    ];

    const newProduce: Produce = {
      ...produceData,
      id: newId,
      createdAt: now.toISOString(),
      qrCodeData: `AGRIFLOW-TRACE-${newId}-${produceData.cropName.toUpperCase()}-${produceData.qualityGrade}`,
      statusTimeline: initialTimeline
    };

    this.produce.unshift(newProduce);

    // Auto-create notification
    this.addNotification({
      title: `Produce Registered: ${newProduce.id}`,
      message: `${newProduce.quantityKg} kg of ${newProduce.cropName} (${newProduce.cropVariety}) successfully recorded and issued QR passport.`,
      type: 'quality',
      priority: 'medium'
    });

    this.saveState();
    return newProduce;
  }

  public updateProduceStatus(id: string, status: Produce['status'], timelineEvent?: TimelineEvent) {
    const item = this.produce.find((p) => p.id === id);
    if (item) {
      item.status = status;
      if (timelineEvent) {
        item.statusTimeline.push(timelineEvent);
      }
      this.saveState();
    }
  }

  // --- Storage Methods ---
  public getStorage(): StorageFacility[] {
    return [...this.storage];
  }

  public updateStorageFacility(id: string, patch: Partial<StorageFacility>) {
    const store = this.storage.find((s) => s.id === id);
    if (store) {
      Object.assign(store, patch);
      this.saveState();
    }
  }

  // --- Market Methods ---
  public getMarketPrices(): MarketPrice[] {
    return [...this.marketPrices];
  }

  // --- Processing Methods ---
  public getProcessingBatches(): ProcessingBatch[] {
    return [...this.processingBatches];
  }

  public addProcessingBatch(batchData: Omit<ProcessingBatch, 'batchId' | 'startDate' | 'timeline'>): ProcessingBatch {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const batchId = `PROC-2026-0${randomSuffix}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newBatch: ProcessingBatch = {
      ...batchData,
      batchId,
      startDate: formattedDate,
      timeline: [
        { step: 'Raw Material Received & Sanitized', timestamp: formattedDate, completed: true },
        { step: 'Thermal & Mechanical Processing', timestamp: 'In Progress', completed: false },
        { step: 'Laboratory QA & Brix Analysis', timestamp: 'Scheduled', completed: false },
        { step: 'Finished Packaging & Dispatch', timestamp: 'Scheduled', completed: false },
      ]
    };

    this.processingBatches.unshift(newBatch);
    this.saveState();
    return newBatch;
  }

  // --- Shipment Methods ---
  public getShipments(): Shipment[] {
    return [...this.shipments];
  }

  public addShipment(shipmentData: Omit<Shipment, 'shipmentId' | 'departureTime' | 'progressPercent' | 'checkpoints'>): Shipment {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const shipmentId = `AGT-2${randomSuffix.toString().slice(0, 4)}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newShipment: Shipment = {
      ...shipmentData,
      shipmentId,
      departureTime: formattedDate,
      progressPercent: 15,
      checkpoints: [
        { name: `Dispatched from ${shipmentData.origin}`, reached: true, time: formattedDate, status: 'Departed' },
        { name: 'Midway Enroute Checkpoint', reached: false, status: 'Expected' },
        { name: `Arrival at ${shipmentData.destination}`, reached: false, status: 'Final Destination' }
      ]
    };

    this.shipments.unshift(newShipment);

    this.addNotification({
      title: `Shipment Created: ${shipmentId}`,
      message: `${shipmentData.quantityKg} kg ${shipmentData.cropName} dispatched via ${shipmentData.vehicleNumber} to ${shipmentData.destination}.`,
      type: 'shipment',
      priority: 'medium'
    });

    this.saveState();
    return newShipment;
  }

  // --- Buyer Orders ---
  public getBuyerOrders(): BuyerOrder[] {
    return [...this.buyerOrders];
  }

  public addBuyerOrder(orderData: Omit<BuyerOrder, 'orderId' | 'orderDate' | 'status' | 'paymentStatus'>): BuyerOrder {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `ORD-2026-${randomSuffix}`;
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} 2026, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newOrder: BuyerOrder = {
      ...orderData,
      orderId,
      orderDate: formattedDate,
      status: 'confirmed',
      paymentStatus: 'Escrow Secured'
    };

    this.buyerOrders.unshift(newOrder);

    this.addNotification({
      title: `New Order Placed: ${orderId}`,
      message: `${orderData.buyerCompany} confirmed purchase of ${orderData.quantityKg} kg ${orderData.cropName} (₹${orderData.totalAmount.toLocaleString('en-IN')}). Escrow held safely.`,
      type: 'order',
      priority: 'high'
    });

    this.saveState();
    return newOrder;
  }

  // --- Schemes Methods ---
  public getSchemes(): GovernmentScheme[] {
    return [...this.schemes];
  }

  // --- Notification Methods ---
  public getNotifications(): NotificationItem[] {
    return [...this.notifications];
  }

  public markNotificationAsRead(id: string) {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.read = true;
      this.saveState();
    }
  }

  public markAllNotificationsAsRead() {
    this.notifications.forEach((n) => (n.read = true));
    this.saveState();
  }

  public addNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: 'Just now',
      read: false
    };
    this.notifications.unshift(newNotif);
    this.saveState();
  }

  // --- Auth & Role Methods ---
  public getCurrentUser(): UserSession {
    return { ...this.currentUser };
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  public switchUserRole(role: UserRole) {
    if (DEMO_USERS[role]) {
      this.currentUser = { ...DEMO_USERS[role] };
      this.isLoggedIn = true;
      this.saveState();
    }
  }

  public loginUser(role: UserRole, customEmailOrPhone?: string) {
    const baseUser = DEMO_USERS[role] || DEMO_USERS.farmer;
    this.currentUser = {
      ...baseUser,
      ...(customEmailOrPhone
        ? customEmailOrPhone.includes('@')
          ? { email: customEmailOrPhone }
          : { phone: customEmailOrPhone }
        : {})
    };
    this.isLoggedIn = true;
    this.saveState();
  }

  public registerUser(userData: UserSession) {
    this.currentUser = { ...userData };
    this.isLoggedIn = true;
    this.addNotification({
      title: `Welcome to AgriFlow, ${userData.name}`,
      message: `Your ${userData.role.toUpperCase()} account for ${userData.location} is now active.`,
      type: 'quality',
      priority: 'medium'
    });
    this.saveState();
  }

  public logoutUser() {
    this.isLoggedIn = false;
    this.saveState();
  }

  // --- Reset to Defaults ---
  public resetToDefaults() {
    this.produce = [...INITIAL_PRODUCE];
    this.storage = [...INITIAL_STORAGE];
    this.marketPrices = [...INITIAL_MARKET_PRICES];
    this.processingBatches = [...INITIAL_PROCESSING_BATCHES];
    this.shipments = [...INITIAL_SHIPMENTS];
    this.schemes = [...INITIAL_SCHEMES];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.buyerOrders = [...INITIAL_BUYER_ORDERS];
    this.currentUser = { ...DEMO_USERS.farmer };
    this.isLoggedIn = true;
    this.saveState();
  }
}

export const stateService = new StateService();
