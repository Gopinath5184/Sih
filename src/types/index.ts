export type UserRole = 
  | 'farmer' 
  | 'fpo' 
  | 'processor' 
  | 'transporter' 
  | 'buyer' 
  | 'admin' 
  | 'government';

export type ProduceStatus = 
  | 'harvested' 
  | 'quality_checked' 
  | 'stored' 
  | 'listed' 
  | 'sold' 
  | 'in_transit' 
  | 'delivered';

export type QualityGrade = 'A' | 'B' | 'C' | 'Recheck';

export type StorageType = 'cold_storage' | 'warehouse' | 'silo' | 'dry_godown';

export interface TimelineEvent {
  stage: string;
  timestamp: string;
  location: string;
  handler: string;
  note: string;
  quality?: string;
  status: 'completed' | 'current' | 'pending';
}

export interface Produce {
  id: string; // e.g. AGR-2026-004582
  cropName: string;
  cropVariety: string;
  quantityKg: number;
  harvestDate: string;
  shelfLifeDays: number;
  remainingShelfLifeDays: number;
  qualityGrade: QualityGrade;
  freshnessPercent: number;
  defectProbability: number;
  farmerName: string;
  farmerPhone: string;
  fpoName: string;
  location: {
    district: string;
    state: string;
    village?: string;
    mandi?: string;
  };
  storageRequirement: string;
  currentStorageId?: string;
  expectedPricePerKg: number;
  currentMarketPricePerKg: number;
  status: ProduceStatus;
  statusTimeline: TimelineEvent[];
  imageUrl: string;
  qrCodeData: string;
  recommendedMarket?: {
    name: string;
    district: string;
    distanceKm: number;
    pricePerKg: number;
    transportCostPerKg: number;
    netAdvantageRevenue: number;
  };
  listedForSale: boolean;
  wholesaleLot: boolean;
  createdAt: string;
}

export interface StorageFacility {
  id: string;
  name: string;
  code: string;
  type: StorageType;
  location: string;
  district: string;
  state: string;
  capacityKg: number;
  occupiedKg: number;
  temperatureC: number;
  targetTemperatureC: number;
  humidityPercent: number;
  targetHumidityPercent: number;
  status: 'normal' | 'near_capacity' | 'warning' | 'critical';
  managedBy: string;
  contactPhone: string;
  sensorHistory: {
    time: string;
    temp: number;
    humidity: number;
  }[];
  alerts: {
    id: string;
    type: 'warning' | 'critical' | 'info';
    message: string;
    timestamp: string;
  }[];
}

export interface MarketPrice {
  id: string;
  crop: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  modalPricePerKg: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  unit: string; // '₹/kg'
  changePercent24h: number;
  demandLevel: 'High' | 'Moderate' | 'Low';
  supplyLevel: 'Surplus' | 'Adequate' | 'Deficit';
  arrivalQuantityQuintals: number;
  updatedAt: string;
  trend7d: { day: string; price: number }[];
  trend30d: { day: string; price: number }[];
}

export interface ProcessingBatch {
  batchId: string; // e.g. PROC-2026-0182
  facilityName: string;
  location: string;
  rawProduceCrop: string;
  rawProduceBatchId: string;
  rawProduceQuantityKg: number;
  processType: string; // e.g. "Puree Concentration & Aseptic Packaging"
  status: 'raw_received' | 'processing' | 'quality_check' | 'packaging' | 'ready_for_distribution';
  outputProduct: string;
  outputQuantityKg: number;
  yieldPercent: number;
  wasteKg: number;
  wasteType: string;
  wasteValorization: string; // e.g. "Pomace converted to organic vermicompost"
  estimatedRevenue: number;
  startDate: string;
  estimatedFinish: string;
  operator: string;
  timeline: {
    step: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface ShipmentCheckpoint {
  name: string;
  reached: boolean;
  time?: string;
  status?: string;
}

export interface Shipment {
  shipmentId: string; // e.g. AGT-20382
  produceId: string;
  cropName: string;
  quantityKg: number;
  origin: string;
  destination: string;
  distanceKm: number;
  vehicleNumber: string;
  vehicleType: string;
  driverName: string;
  driverPhone: string;
  status: 'scheduled' | 'in_transit' | 'delayed' | 'delivered';
  departureTime: string;
  estimatedArrival: string;
  currentLocation: string;
  temperatureC?: number;
  progressPercent: number;
  checkpoints: ShipmentCheckpoint[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortCode: string;
  department: string;
  category: 'Financial' | 'Infrastructure' | 'Insurance' | 'Technology' | 'Storage';
  eligibility: string[];
  benefits: string;
  subsidyPercent?: number;
  maxSubsidyAmount?: string;
  requiredDocuments: string[];
  applicableStates: string[];
  applicableCrops: string[];
  status: 'Active' | 'Open for Applications';
  portalUrl: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'price_alert' | 'shelf_life' | 'order' | 'shipment' | 'storage' | 'quality';
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export interface BuyerOrder {
  orderId: string;
  produceId: string;
  cropName: string;
  buyerName: string;
  buyerCompany: string;
  buyerType: 'Wholesaler' | 'Processor' | 'Retail Supermarket' | 'Exporter';
  quantityKg: number;
  pricePerKg: number;
  totalAmount: number;
  orderDate: string;
  deliveryLocation: string;
  status: 'pending' | 'confirmed' | 'dispatched' | 'completed' | 'cancelled';
  paymentStatus: 'Escrow Secured' | 'Released' | 'Pending';
}

export interface UserSession {
  role: UserRole;
  name: string;
  phone: string;
  email: string;
  organization?: string;
  location: string;
}
