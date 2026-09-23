import { 
  Produce, 
  StorageFacility, 
  MarketPrice, 
  ProcessingBatch, 
  Shipment, 
  GovernmentScheme, 
  NotificationItem, 
  BuyerOrder,
  UserSession 
} from '../types';

export const INITIAL_PRODUCE: Produce[] = [
  {
    id: 'AGR-2026-004582',
    cropName: 'Tomato',
    cropVariety: 'Sivam Hybrid (Firm Round)',
    quantityKg: 2500,
    harvestDate: '2026-09-20',
    shelfLifeDays: 8,
    remainingShelfLifeDays: 4,
    qualityGrade: 'A',
    freshnessPercent: 92,
    defectProbability: 6,
    farmerName: 'K. Murugesan',
    farmerPhone: '+91 98421 78201',
    fpoName: 'Dharmapuri Horti Farmer Producer Co.',
    location: {
      village: 'Palacode',
      district: 'Dharmapuri',
      state: 'Tamil Nadu',
      mandi: 'Dharmapuri APMC'
    },
    storageRequirement: 'Cold Storage (4°C - 6°C, 85% RH)',
    currentStorageId: 'store-cs-01',
    expectedPricePerKg: 24,
    currentMarketPricePerKg: 26,
    status: 'stored',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '20 Sep 2026, 06:30 AM',
        location: 'Palacode Farm Block 4, Dharmapuri',
        handler: 'K. Murugesan (Farmer)',
        note: 'Harvested under optimal morning temp (22°C), manual sorting into plastic crates',
        quality: 'Grade A Potential',
        status: 'completed'
      },
      {
        stage: 'Collection Center / FPO',
        timestamp: '20 Sep 2026, 11:15 AM',
        location: 'Dharmapuri FPO Primary Hub',
        handler: 'R. Velan (FPO Quality Lead)',
        note: 'Weighbridge gross verified 2,520 kg; inward batch lot sealed',
        quality: 'Visual inspection passed',
        status: 'completed'
      },
      {
        stage: 'AI Quality Assessment',
        timestamp: '20 Sep 2026, 02:40 PM',
        location: 'AgriFlow Smart Inspection Station #2',
        handler: 'AgriVision Computer Vision Suite v2.4',
        note: 'AI Score: 92% Freshness, 6% Surface Defect, Firmness Index 4.8/5.0. Certified Grade A.',
        quality: 'Certified Grade A',
        status: 'completed'
      },
      {
        stage: 'Cold Storage Intake',
        timestamp: '20 Sep 2026, 05:00 PM',
        location: 'Cold Storage A - Bay 3, Kallakurichi Hub',
        handler: 'S. Ramanathan (Cold Chain Manager)',
        note: 'Placed in Chamber 2, active cooling at 4.2°C, 68% RH',
        quality: 'Monitored',
        status: 'current'
      },
      {
        stage: 'Market Allocation / Sale',
        timestamp: 'Pending (Scheduled 23 Sep)',
        location: 'Chennai Koyambedu Terminal',
        handler: 'Smart Price Match Engine',
        note: 'Recommended for Chennai Koyambedu Mandi (+₹4/kg premium over local market)',
        quality: 'Pending',
        status: 'pending'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-004582-FARM-MURUGESAN-TAMILNADU-GRADE-A',
    recommendedMarket: {
      name: 'Koyambedu Wholesale Terminal',
      district: 'Chennai',
      distanceKm: 185,
      pricePerKg: 28,
      transportCostPerKg: 1.8,
      netAdvantageRevenue: 8500
    },
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-20T06:30:00Z'
  },
  {
    id: 'AGR-2026-003914',
    cropName: 'Onion',
    cropVariety: 'Nashik Red (Medium-Large Bulb)',
    quantityKg: 6000,
    harvestDate: '2026-09-18',
    shelfLifeDays: 45,
    remainingShelfLifeDays: 38,
    qualityGrade: 'A',
    freshnessPercent: 88,
    defectProbability: 5,
    farmerName: 'Sanjay B. Patil',
    farmerPhone: '+91 97654 32189',
    fpoName: 'Godavari Valley Kisan Producer Org',
    location: {
      village: 'Niphad',
      district: 'Nashik',
      state: 'Maharashtra',
      mandi: 'Lasalgaon APMC'
    },
    storageRequirement: 'Well-ventilated dry warehouse (< 65% RH)',
    currentStorageId: 'store-wh-02',
    expectedPricePerKg: 30,
    currentMarketPricePerKg: 31,
    status: 'listed',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '18 Sep 2026, 08:00 AM',
        location: 'Niphad Village, Nashik',
        handler: 'Sanjay B. Patil',
        note: 'Cured under sunlight for 48 hours for peel hardening',
        quality: 'Uniform Curing',
        status: 'completed'
      },
      {
        stage: 'AI Quality Assessment',
        timestamp: '19 Sep 2026, 10:30 AM',
        location: 'Lasalgaon Inward Center',
        handler: 'AgriVision Computer Vision',
        note: 'Grade A. Moisture content 13.8%, zero fungal sporulation detected.',
        quality: 'Grade A',
        status: 'completed'
      },
      {
        stage: 'Ventilated Storage',
        timestamp: '19 Sep 2026, 03:00 PM',
        location: 'Warehouse B - Unit 4, Lasalgaon',
        handler: 'Warehouse Supervisor',
        note: 'Stacked on aerated wooden pallets with continuous airflow fans',
        quality: 'Optimal',
        status: 'completed'
      },
      {
        stage: 'Listed on B2B Marketplace',
        timestamp: '21 Sep 2026, 09:00 AM',
        location: 'AgriFlow Wholesale Exchange',
        handler: 'System Auto-List',
        note: 'Listed for wholesale procurement (Min Order 1,000 kg)',
        quality: 'Ready for Purchase',
        status: 'current'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-003914-ONION-NASHIK-GRADE-A',
    recommendedMarket: {
      name: 'Vashi APMC Navi Mumbai',
      district: 'Thane / Mumbai',
      distanceKm: 165,
      pricePerKg: 35,
      transportCostPerKg: 1.5,
      netAdvantageRevenue: 15000
    },
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-18T08:00:00Z'
  },
  {
    id: 'AGR-2026-002187',
    cropName: 'Rice',
    cropVariety: 'Sona Masoori (BPT-5204)',
    quantityKg: 12000,
    harvestDate: '2026-09-15',
    shelfLifeDays: 365,
    remainingShelfLifeDays: 350,
    qualityGrade: 'A',
    freshnessPercent: 96,
    defectProbability: 2,
    farmerName: 'G. Harish Reddy',
    farmerPhone: '+91 94401 55290',
    fpoName: 'Tungabhadra Agro Producers Ltd',
    location: {
      village: 'Siruguppa',
      district: 'Bellary',
      state: 'Karnataka',
      mandi: 'Bellary APMC'
    },
    storageRequirement: 'Hermetic grain silo or dry pest-controlled godown',
    currentStorageId: 'store-silo-03',
    expectedPricePerKg: 40,
    currentMarketPricePerKg: 42,
    status: 'stored',
    statusTimeline: [
      {
        stage: 'Harvested & Threshed',
        timestamp: '15 Sep 2026, 05:00 PM',
        location: 'Siruguppa Paddy Fields',
        handler: 'Harish Reddy',
        note: 'Combine harvested; moisture 14.1%',
        quality: 'Super Fine Paddy',
        status: 'completed'
      },
      {
        stage: 'Silo Ingress & Testing',
        timestamp: '17 Sep 2026, 11:00 AM',
        location: 'Bellary Grain Silo Unit 1',
        handler: 'Silo Superintendent',
        note: 'Milled grain sample verified: Head rice recovery 67.5%',
        quality: 'Export Quality Grade A',
        status: 'completed'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-002187-RICE-SONA-MASOORI',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-15T17:00:00Z'
  },
  {
    id: 'AGR-2026-001844',
    cropName: 'Wheat',
    cropVariety: 'Sharbati Gold (Premium Durum)',
    quantityKg: 8500,
    harvestDate: '2026-09-10',
    shelfLifeDays: 300,
    remainingShelfLifeDays: 285,
    qualityGrade: 'A',
    freshnessPercent: 95,
    defectProbability: 3,
    farmerName: 'Rajeshwar Singh',
    farmerPhone: '+91 98260 41109',
    fpoName: 'Malwa Nimar Krishi FPO',
    location: {
      village: 'Ashta',
      district: 'Sehore',
      state: 'Madhya Pradesh',
      mandi: 'Sehore Mandi'
    },
    storageRequirement: 'Dry airtight storage with insect monitoring',
    currentStorageId: 'store-wh-02',
    expectedPricePerKg: 28,
    currentMarketPricePerKg: 29.5,
    status: 'listed',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '10 Sep 2026, 04:00 PM',
        location: 'Ashta Tehsil, Sehore',
        handler: 'Rajeshwar Singh',
        note: 'Harvested with grain moisture 11.2%',
        quality: 'Golden Luster',
        status: 'completed'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-001844-WHEAT-SHARBATI',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-10T16:00:00Z'
  },
  {
    id: 'AGR-2026-005021',
    cropName: 'Potato',
    cropVariety: 'Kufri Jyoti (Table & Processing)',
    quantityKg: 4200,
    harvestDate: '2026-09-16',
    shelfLifeDays: 60,
    remainingShelfLifeDays: 52,
    qualityGrade: 'B',
    freshnessPercent: 84,
    defectProbability: 12,
    farmerName: 'Baldev Prasad',
    farmerPhone: '+91 94120 88204',
    fpoName: 'Brajbhumi Potato Grower Collective',
    location: {
      village: 'Khandauli',
      district: 'Agra',
      state: 'Uttar Pradesh',
      mandi: 'Agra APMC'
    },
    storageRequirement: 'Cold storage at 8°C - 10°C with sprout suppressants',
    currentStorageId: 'store-cs-01',
    expectedPricePerKg: 18,
    currentMarketPricePerKg: 19.5,
    status: 'stored',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '16 Sep 2026, 09:30 AM',
        location: 'Khandauli, Agra',
        handler: 'Baldev Prasad',
        note: 'Uniform tuber size 45mm-65mm, superficial soil coat intact',
        quality: 'Grade B (Minor skin blemishes)',
        status: 'completed'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-005021-POTATO-KUFRI-JYOTI',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-16T09:30:00Z'
  },
  {
    id: 'AGR-2026-007812',
    cropName: 'Mango',
    cropVariety: 'Alphonso (Hapus - Export Grade)',
    quantityKg: 1800,
    harvestDate: '2026-09-19',
    shelfLifeDays: 14,
    remainingShelfLifeDays: 10,
    qualityGrade: 'A',
    freshnessPercent: 94,
    defectProbability: 4,
    farmerName: 'Vasantrao Sawant',
    farmerPhone: '+91 94220 91874',
    fpoName: 'Konkan Fruit Growers Federation',
    location: {
      village: 'Devgad',
      district: 'Ratnagiri',
      state: 'Maharashtra',
      mandi: 'Ratnagiri Market Yard'
    },
    storageRequirement: 'Pre-cooled cold chamber at 12°C with ethylene scrubbing',
    currentStorageId: 'store-cs-01',
    expectedPricePerKg: 120,
    currentMarketPricePerKg: 135,
    status: 'in_transit',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '19 Sep 2026, 07:00 AM',
        location: 'Devgad Coastal Orchards',
        handler: 'Vasantrao Sawant',
        note: 'Harvested with 8mm stalk intact to prevent latex burn',
        quality: 'Grade A Export',
        status: 'completed'
      },
      {
        stage: 'Dispatch in Reefer',
        timestamp: '21 Sep 2026, 08:30 AM',
        location: 'Ratnagiri Hub',
        handler: 'Transporter TN-25-AX-4819',
        note: 'Reefer container active at 12°C to Mumbai Export Terminal',
        quality: 'Verified Reefer Log',
        status: 'current'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-007812-MANGO-ALPHONSO-GRADE-A',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-19T07:00:00Z'
  },
  {
    id: 'AGR-2026-006233',
    cropName: 'Banana',
    cropVariety: 'Grand Naine (G9 Premium)',
    quantityKg: 3500,
    harvestDate: '2026-09-21',
    shelfLifeDays: 12,
    remainingShelfLifeDays: 9,
    qualityGrade: 'A',
    freshnessPercent: 91,
    defectProbability: 5,
    farmerName: 'M. Selvaraj',
    farmerPhone: '+91 94432 17822',
    fpoName: 'Vaigai Valley Agro Producer Company',
    location: {
      village: 'Cumbum',
      district: 'Theni',
      state: 'Tamil Nadu',
      mandi: 'Theni Banana Market'
    },
    storageRequirement: 'Cold storage (13.5°C, 90% RH)',
    currentStorageId: 'store-cs-01',
    expectedPricePerKg: 22,
    currentMarketPricePerKg: 24,
    status: 'stored',
    statusTimeline: [
      {
        stage: 'Harvested',
        timestamp: '21 Sep 2026, 06:00 AM',
        location: 'Cumbum Valley, Theni',
        handler: 'M. Selvaraj',
        note: 'Calibrated hand cutting, foam washed and packed in telescopic cartons',
        quality: 'G9 Grade A',
        status: 'completed'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-006233-BANANA-G9',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-21T06:00:00Z'
  },
  {
    id: 'AGR-2026-009140',
    cropName: 'Cotton',
    cropVariety: 'MCU-5 (Extra Long Staple)',
    quantityKg: 5000,
    harvestDate: '2026-09-12',
    shelfLifeDays: 180,
    remainingShelfLifeDays: 170,
    qualityGrade: 'A',
    freshnessPercent: 97,
    defectProbability: 2,
    farmerName: 'Ch. Venkat Rao',
    farmerPhone: '+91 98480 33190',
    fpoName: 'Krishna Delta Cotton Growers Federation',
    location: {
      village: 'Tenali',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      mandi: 'Guntur Cotton Yard'
    },
    storageRequirement: 'Dry moisture-proof godown with fire detection',
    currentStorageId: 'store-wh-02',
    expectedPricePerKg: 72,
    currentMarketPricePerKg: 74.5,
    status: 'listed',
    statusTimeline: [
      {
        stage: 'Harvested & Cleaned',
        timestamp: '12 Sep 2026, 10:00 AM',
        location: 'Tenali, Guntur',
        handler: 'Venkat Rao',
        note: 'Staple length 33mm, trash content < 2.5%',
        quality: 'Certified Superior Staple',
        status: 'completed'
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80',
    qrCodeData: 'AGRIFLOW-TRACE-AGR-2026-009140-COTTON-MCU5',
    listedForSale: true,
    wholesaleLot: true,
    createdAt: '2026-09-12T10:00:00Z'
  }
];

export const INITIAL_STORAGE: StorageFacility[] = [
  {
    id: 'store-cs-01',
    name: 'Kallakurichi Precision Cold Hub',
    code: 'CS-TN-042',
    type: 'cold_storage',
    location: 'Near NH-79 Bypass, Kallakurichi',
    district: 'Kallakurichi',
    state: 'Tamil Nadu',
    capacityKg: 10000,
    occupiedKg: 7240,
    temperatureC: 4.2,
    targetTemperatureC: 4.0,
    humidityPercent: 68,
    targetHumidityPercent: 70,
    status: 'normal',
    managedBy: 'S. Ramanathan (Cold Chain Specialist)',
    contactPhone: '+91 94441 90812',
    sensorHistory: [
      { time: '06:00', temp: 4.1, humidity: 67 },
      { time: '08:00', temp: 4.3, humidity: 68 },
      { time: '10:00', temp: 4.4, humidity: 69 },
      { time: '12:00', temp: 4.2, humidity: 68 },
      { time: '14:00', temp: 4.2, humidity: 68 },
      { time: '16:00', temp: 4.1, humidity: 67 },
    ],
    alerts: [
      {
        id: 'alt-01',
        type: 'warning',
        message: '1,200 kg of hybrid tomatoes approaching 4-day shelf-life limit. Prioritize market allocation.',
        timestamp: '22 Sep 2026, 09:15 AM'
      }
    ]
  },
  {
    id: 'store-wh-02',
    name: 'Vellore Central Multi-Commodity Warehouse',
    code: 'WH-TN-118',
    type: 'warehouse',
    location: 'Ranipet Industrial Corridor, Vellore',
    district: 'Vellore',
    state: 'Tamil Nadu',
    capacityKg: 25000,
    occupiedKg: 21800,
    temperatureC: 24.0,
    targetTemperatureC: 22.0,
    humidityPercent: 55,
    targetHumidityPercent: 50,
    status: 'near_capacity',
    managedBy: 'K. Venkatesan (Facility Director)',
    contactPhone: '+91 98840 22104',
    sensorHistory: [
      { time: '06:00', temp: 22.5, humidity: 54 },
      { time: '08:00', temp: 23.2, humidity: 55 },
      { time: '10:00', temp: 24.5, humidity: 56 },
      { time: '12:00', temp: 25.1, humidity: 55 },
      { time: '14:00', temp: 24.0, humidity: 55 },
      { time: '16:00', temp: 23.8, humidity: 54 },
    ],
    alerts: [
      {
        id: 'alt-02',
        type: 'critical',
        message: 'Facility is at 87% occupancy. Divert incoming onion/grain shipments to Tiruvannamalai Silo.',
        timestamp: '22 Sep 2026, 11:30 AM'
      }
    ]
  },
  {
    id: 'store-silo-03',
    name: 'Tiruvannamalai Modern Grain Silo Complex',
    code: 'SILO-TN-009',
    type: 'silo',
    location: 'Polur Road Agro Logistics Park',
    district: 'Tiruvannamalai',
    state: 'Tamil Nadu',
    capacityKg: 50000,
    occupiedKg: 32500,
    temperatureC: 21.0,
    targetTemperatureC: 20.0,
    humidityPercent: 48,
    targetHumidityPercent: 45,
    status: 'normal',
    managedBy: 'P. Sivakumar (Grain Logistics Mgr)',
    contactPhone: '+91 94422 66310',
    sensorHistory: [
      { time: '06:00', temp: 20.8, humidity: 47 },
      { time: '08:00', temp: 21.0, humidity: 48 },
      { time: '10:00', temp: 21.4, humidity: 49 },
      { time: '12:00', temp: 21.2, humidity: 48 },
      { time: '14:00', temp: 21.0, humidity: 48 },
      { time: '16:00', temp: 20.9, humidity: 48 },
    ],
    alerts: []
  }
];

export const INITIAL_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mp-tom-01',
    crop: 'Tomato',
    variety: 'Hybrid Round',
    mandi: 'Koyambedu APMC',
    district: 'Chennai',
    state: 'Tamil Nadu',
    modalPricePerKg: 28,
    minPricePerKg: 25,
    maxPricePerKg: 31,
    unit: '₹/kg',
    changePercent24h: 8.5,
    demandLevel: 'High',
    supplyLevel: 'Deficit',
    arrivalQuantityQuintals: 1450,
    updatedAt: '22 Sep 2026, 07:00 AM',
    trend7d: [
      { day: '16 Sep', price: 22 },
      { day: '17 Sep', price: 23 },
      { day: '18 Sep', price: 23.5 },
      { day: '19 Sep', price: 25 },
      { day: '20 Sep', price: 26 },
      { day: '21 Sep', price: 26.5 },
      { day: '22 Sep', price: 28 },
    ],
    trend30d: [
      { day: '25 Aug', price: 18 },
      { day: '01 Sep', price: 20 },
      { day: '08 Sep', price: 22 },
      { day: '15 Sep', price: 24 },
      { day: '22 Sep', price: 28 },
    ]
  },
  {
    id: 'mp-tom-02',
    crop: 'Tomato',
    variety: 'Local Country',
    mandi: 'Mattuthavani APMC',
    district: 'Madurai',
    state: 'Tamil Nadu',
    modalPricePerKg: 27,
    minPricePerKg: 24,
    maxPricePerKg: 29,
    unit: '₹/kg',
    changePercent24h: 6.2,
    demandLevel: 'High',
    supplyLevel: 'Adequate',
    arrivalQuantityQuintals: 920,
    updatedAt: '22 Sep 2026, 06:45 AM',
    trend7d: [
      { day: '16 Sep', price: 22 },
      { day: '17 Sep', price: 23 },
      { day: '18 Sep', price: 24 },
      { day: '19 Sep', price: 25 },
      { day: '20 Sep', price: 25.5 },
      { day: '21 Sep', price: 26 },
      { day: '22 Sep', price: 27 },
    ],
    trend30d: [
      { day: '25 Aug', price: 19 },
      { day: '01 Sep', price: 21 },
      { day: '08 Sep', price: 23 },
      { day: '15 Sep', price: 25 },
      { day: '22 Sep', price: 27 },
    ]
  },
  {
    id: 'mp-tom-03',
    crop: 'Tomato',
    variety: 'Hybrid Firm',
    mandi: 'V.O.C. Market',
    district: 'Salem',
    state: 'Tamil Nadu',
    modalPricePerKg: 24,
    minPricePerKg: 22,
    maxPricePerKg: 26,
    unit: '₹/kg',
    changePercent24h: 1.5,
    demandLevel: 'Moderate',
    supplyLevel: 'Surplus',
    arrivalQuantityQuintals: 2100,
    updatedAt: '22 Sep 2026, 07:30 AM',
    trend7d: [
      { day: '16 Sep', price: 23 },
      { day: '17 Sep', price: 23.5 },
      { day: '18 Sep', price: 24 },
      { day: '19 Sep', price: 23.8 },
      { day: '20 Sep', price: 24 },
      { day: '21 Sep', price: 23.5 },
      { day: '22 Sep', price: 24 },
    ],
    trend30d: [
      { day: '25 Aug', price: 20 },
      { day: '01 Sep', price: 22 },
      { day: '08 Sep', price: 23 },
      { day: '15 Sep', price: 24 },
      { day: '22 Sep', price: 24 },
    ]
  },
  {
    id: 'mp-oni-01',
    crop: 'Onion',
    variety: 'Nashik Red',
    mandi: 'Lasalgaon APMC',
    district: 'Nashik',
    state: 'Maharashtra',
    modalPricePerKg: 31,
    minPricePerKg: 28,
    maxPricePerKg: 33,
    unit: '₹/kg',
    changePercent24h: -3.2,
    demandLevel: 'Moderate',
    supplyLevel: 'Surplus',
    arrivalQuantityQuintals: 4200,
    updatedAt: '22 Sep 2026, 08:00 AM',
    trend7d: [
      { day: '16 Sep', price: 34 },
      { day: '17 Sep', price: 33.5 },
      { day: '18 Sep', price: 33 },
      { day: '19 Sep', price: 32 },
      { day: '20 Sep', price: 32 },
      { day: '21 Sep', price: 31.5 },
      { day: '22 Sep', price: 31 },
    ],
    trend30d: [
      { day: '25 Aug', price: 28 },
      { day: '01 Sep', price: 30 },
      { day: '08 Sep', price: 33 },
      { day: '15 Sep', price: 34 },
      { day: '22 Sep', price: 31 },
    ]
  },
  {
    id: 'mp-ric-01',
    crop: 'Rice',
    variety: 'Sona Masoori (Raw)',
    mandi: 'Kurnool APMC',
    district: 'Kurnool',
    state: 'Andhra Pradesh',
    modalPricePerKg: 42,
    minPricePerKg: 39,
    maxPricePerKg: 45,
    unit: '₹/kg',
    changePercent24h: 4.8,
    demandLevel: 'High',
    supplyLevel: 'Adequate',
    arrivalQuantityQuintals: 3100,
    updatedAt: '22 Sep 2026, 08:30 AM',
    trend7d: [
      { day: '16 Sep', price: 39 },
      { day: '17 Sep', price: 39.5 },
      { day: '18 Sep', price: 40 },
      { day: '19 Sep', price: 40.5 },
      { day: '20 Sep', price: 41 },
      { day: '21 Sep', price: 41.5 },
      { day: '22 Sep', price: 42 },
    ],
    trend30d: [
      { day: '25 Aug', price: 38 },
      { day: '01 Sep', price: 39 },
      { day: '08 Sep', price: 40 },
      { day: '15 Sep', price: 41 },
      { day: '22 Sep', price: 42 },
    ]
  },
  {
    id: 'mp-pot-01',
    crop: 'Potato',
    variety: 'Kufri Jyoti',
    mandi: 'Agra APMC',
    district: 'Agra',
    state: 'Uttar Pradesh',
    modalPricePerKg: 19.5,
    minPricePerKg: 17,
    maxPricePerKg: 21,
    unit: '₹/kg',
    changePercent24h: 2.1,
    demandLevel: 'Moderate',
    supplyLevel: 'Adequate',
    arrivalQuantityQuintals: 5800,
    updatedAt: '22 Sep 2026, 08:15 AM',
    trend7d: [
      { day: '16 Sep', price: 18 },
      { day: '17 Sep', price: 18.5 },
      { day: '18 Sep', price: 18.8 },
      { day: '19 Sep', price: 19 },
      { day: '20 Sep', price: 19.2 },
      { day: '21 Sep', price: 19.3 },
      { day: '22 Sep', price: 19.5 },
    ],
    trend30d: [
      { day: '25 Aug', price: 16.5 },
      { day: '01 Sep', price: 17.5 },
      { day: '08 Sep', price: 18.0 },
      { day: '15 Sep', price: 19.0 },
      { day: '22 Sep', price: 19.5 },
    ]
  },
  {
    id: 'mp-whe-01',
    crop: 'Wheat',
    variety: 'Sharbati Durum',
    mandi: 'Khanna Grain Market',
    district: 'Ludhiana',
    state: 'Punjab',
    modalPricePerKg: 29.5,
    minPricePerKg: 27.5,
    maxPricePerKg: 31,
    unit: '₹/kg',
    changePercent24h: 3.2,
    demandLevel: 'High',
    supplyLevel: 'Adequate',
    arrivalQuantityQuintals: 6200,
    updatedAt: '22 Sep 2026, 09:00 AM',
    trend7d: [
      { day: '16 Sep', price: 28 },
      { day: '17 Sep', price: 28.2 },
      { day: '18 Sep', price: 28.5 },
      { day: '19 Sep', price: 28.8 },
      { day: '20 Sep', price: 29 },
      { day: '21 Sep', price: 29.2 },
      { day: '22 Sep', price: 29.5 },
    ],
    trend30d: [
      { day: '25 Aug', price: 27 },
      { day: '01 Sep', price: 27.8 },
      { day: '08 Sep', price: 28.3 },
      { day: '15 Sep', price: 29.0 },
      { day: '22 Sep', price: 29.5 },
    ]
  }
];

export const INITIAL_PROCESSING_BATCHES: ProcessingBatch[] = [
  {
    batchId: 'PROC-2026-0182',
    facilityName: 'Cauvery Bio-Foods & Processing Hub',
    location: 'SIPCOT Industrial Complex, Hosur, Tamil Nadu',
    rawProduceCrop: 'Tomato',
    rawProduceBatchId: 'AGR-2026-004582',
    rawProduceQuantityKg: 5000,
    processType: 'Tomato → Concentrated Puree → Commercial Ketchup',
    status: 'processing',
    outputProduct: 'Double Concentrated Tomato Puree (28-30° Brix)',
    outputQuantityKg: 1420,
    yieldPercent: 28.4,
    wasteKg: 480,
    wasteType: 'Tomato Pomace (Peels & Seeds)',
    wasteValorization: 'Diverted to organic poultry feed & soil enrichment compost',
    estimatedRevenue: 142000,
    startDate: '21 Sep 2026, 08:00 AM',
    estimatedFinish: '23 Sep 2026, 04:00 PM',
    operator: 'Dr. Anand Kumar (Lead Food Technologist)',
    timeline: [
      { step: 'Raw Material Received & Sanitized', timestamp: '21 Sep 08:30 AM', completed: true },
      { step: 'Hot-Break Thermal Inactivation', timestamp: '21 Sep 02:00 PM', completed: true },
      { step: 'Vacuum Evaporation & Pulping', timestamp: '22 Sep 10:00 AM', completed: true },
      { step: 'Quality & Brix Analysis', timestamp: '22 Sep 03:00 PM', completed: false },
      { step: 'Aseptic Filling & Packaging', timestamp: '23 Sep 11:00 AM', completed: false },
    ]
  },
  {
    batchId: 'PROC-2026-0164',
    facilityName: 'Sahyadri Agro Dehydration Ltd',
    location: 'Pimpalgaon Baswant, Nashik, Maharashtra',
    rawProduceCrop: 'Onion',
    rawProduceBatchId: 'AGR-2026-003914',
    rawProduceQuantityKg: 3200,
    processType: 'Fresh Red Onion → Slicing → Low-Temp Dehydration → Flakes',
    status: 'packaging',
    outputProduct: 'Export-Grade Dehydrated Red Onion Flakes',
    outputQuantityKg: 384,
    yieldPercent: 12.0,
    wasteKg: 280,
    wasteType: 'Dry Onion Outer Skins & Roots',
    wasteValorization: 'Natural quercetin bio-pigment extraction for textiles',
    estimatedRevenue: 96000,
    startDate: '19 Sep 2026, 09:00 AM',
    estimatedFinish: '22 Sep 2026, 06:00 PM',
    operator: 'Meera Deshmukh (Production Supervisor)',
    timeline: [
      { step: 'Raw Inspection & Root Trimming', timestamp: '19 Sep 09:30 AM', completed: true },
      { step: 'Mechanical Slicing (4mm)', timestamp: '19 Sep 02:30 PM', completed: true },
      { step: 'Continuous Tunnel Dehydration', timestamp: '20 Sep 08:00 PM', completed: true },
      { step: 'Moisture Audit (< 4.5%)', timestamp: '21 Sep 04:00 PM', completed: true },
      { step: 'Vacuum Foil Packaging', timestamp: '22 Sep 02:00 PM', completed: true },
    ]
  }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    shipmentId: 'AGT-20382',
    produceId: 'AGR-2026-004582',
    cropName: 'Tomato (Hybrid Round)',
    quantityKg: 2500,
    origin: 'Tiruvannamalai Cold Hub',
    destination: 'Chennai Koyambedu Terminal',
    distanceKm: 185,
    vehicleNumber: 'TN-25-AX-4819',
    vehicleType: 'Reefer Truck (Active Cooling @ 4.2°C)',
    driverName: 'S. Shanmugam',
    driverPhone: '+91 97890 44102',
    status: 'in_transit',
    departureTime: '22 Sep 2026, 06:30 AM',
    estimatedArrival: '22 Sep 2026, 12:45 PM',
    currentLocation: 'Sriperumbudur Tollway (KM 142/185)',
    temperatureC: 4.1,
    progressPercent: 72,
    checkpoints: [
      { name: 'Dispatched from Tiruvannamalai Hub', reached: true, time: '06:30 AM', status: 'Pre-cooling verified' },
      { name: 'Chengalpattu Checkpoint', reached: true, time: '09:45 AM', status: 'Chamber temp 4.2°C' },
      { name: 'Sriperumbudur Industrial Corridor', reached: true, time: '11:15 AM', status: 'In Transit on Schedule' },
      { name: 'Poonamallee Entry Junction', reached: false, status: 'Estimated 12:00 PM' },
      { name: 'Koyambedu Wholesale Terminal Bay 12', reached: false, status: 'Final Destination' }
    ]
  },
  {
    shipmentId: 'AGT-20395',
    produceId: 'AGR-2026-003914',
    cropName: 'Onion (Nashik Red)',
    quantityKg: 5000,
    origin: 'Lasalgaon Mandi Yard, Nashik',
    destination: 'Vashi APMC Navi Mumbai',
    distanceKm: 165,
    vehicleNumber: 'MH-15-EG-8291',
    vehicleType: 'Covered Ventilated 10-Tonner',
    driverName: 'Ganesh More',
    driverPhone: '+91 98230 77120',
    status: 'in_transit',
    departureTime: '22 Sep 2026, 05:00 AM',
    estimatedArrival: '22 Sep 2026, 01:15 PM',
    currentLocation: 'Kasara Ghat NH-160 (KM 110/165)',
    progressPercent: 64,
    checkpoints: [
      { name: 'Lasalgaon Origin Hub', reached: true, time: '05:00 AM' },
      { name: 'Igatpuri Hill Pass', reached: true, time: '08:30 AM' },
      { name: 'Kasara Downhill Toll', reached: true, time: '10:45 AM' },
      { name: 'Thane Majiwada Flyover', reached: false },
      { name: 'Vashi Market Yard', reached: false }
    ]
  },
  {
    shipmentId: 'AGT-20410',
    produceId: 'AGR-2026-006233',
    cropName: 'Banana (G9 Premium)',
    quantityKg: 3500,
    origin: 'Theni Banana Hub, Tamil Nadu',
    destination: 'Hosur Road Fruit Terminal, Bengaluru',
    distanceKm: 420,
    vehicleNumber: 'TN-60-BC-3190',
    vehicleType: 'Telescopic Ventilated Reefer',
    driverName: 'K. Palanivel',
    driverPhone: '+91 94430 88123',
    status: 'delivered',
    departureTime: '21 Sep 2026, 04:00 PM',
    estimatedArrival: '22 Sep 2026, 05:30 AM',
    currentLocation: 'Delivered at Hosur Distribution Warehouse',
    temperatureC: 13.2,
    progressPercent: 100,
    checkpoints: [
      { name: 'Theni Loading Facility', reached: true, time: '04:00 PM' },
      { name: 'Dindigul Bypass', reached: true, time: '06:15 PM' },
      { name: 'Salem Junction', reached: true, time: '09:40 PM' },
      { name: 'Hosur Border', reached: true, time: '04:30 AM' },
      { name: 'Hosur Warehouse Bay 4', reached: true, time: '05:25 AM' }
    ]
  }
];

export const INITIAL_SCHEMES: GovernmentScheme[] = [
  {
    id: 'sch-aif',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortCode: 'AIF-MoAFW',
    department: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    category: 'Storage',
    eligibility: [
      'Primary Agricultural Credit Societies (PACS)',
      'Farmer Producer Organizations (FPOs)',
      'Agricultural Entrepreneurs & Startups',
      'Individual Farmers with registered land records'
    ],
    benefits: '3% interest subvention per annum up to ₹2 Crore loan for setting up cold storage, pack-houses, sorting-grading units and testing labs.',
    subsidyPercent: 3,
    maxSubsidyAmount: '₹2,00,00,000 credit subvention for 7 years',
    requiredDocuments: [
      'Aadhaar & PAN of applicant/FPO directors',
      'Detailed Project Report (DPR) for Cold Chain/Warehouse',
      'Land Ownership / Registered Lease (minimum 10 years)',
      'Bank In-Principle Sanction Letter'
    ],
    applicableStates: ['All Indian States & UTs'],
    applicableCrops: ['All Perishable & Grain Crops'],
    status: 'Open for Applications',
    portalUrl: 'https://agriinfra.dac.gov.in'
  },
  {
    id: 'sch-pmfby',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortCode: 'PMFBY',
    department: 'Department of Agriculture & Cooperation',
    category: 'Insurance',
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Sharecroppers & tenant farmers with cultivation proof',
      'Loanee and non-loanee farmers alike'
    ],
    benefits: 'Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest losses. Farmers pay only 2% premium for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops.',
    subsidyPercent: 85,
    maxSubsidyAmount: '100% Sum Insured against verified yield loss',
    requiredDocuments: [
      'Land Possession Certificate (LPC) / Patta Passbook',
      'Sowing Certificate issued by Village Administrative Officer (VAO)',
      'Bank Account passbook linked to Aadhaar'
    ],
    applicableStates: ['Tamil Nadu', 'Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Madhya Pradesh', 'Andhra Pradesh'],
    applicableCrops: ['Rice', 'Wheat', 'Tomato', 'Onion', 'Cotton', 'Potato'],
    status: 'Active',
    portalUrl: 'https://pmfby.gov.in'
  },
  {
    id: 'sch-midh',
    name: 'Mission for Integrated Development of Horticulture (MIDH)',
    shortCode: 'MIDH',
    department: 'National Horticulture Board (NHB)',
    category: 'Infrastructure',
    eligibility: [
      'Horticultural farmers, FPOs, and private sector investors',
      'Minimum capacity requirements: Cold storage 5,000 MT, Packhouse 4 MT/hr'
    ],
    benefits: '35% capital subsidy for general areas (50% in North East & Hilly states) for integrated packhouses, cold rooms, refer vans, and ripening chambers.',
    subsidyPercent: 35,
    maxSubsidyAmount: 'Up to ₹1.25 Crore per project',
    requiredDocuments: [
      'Project appraisal report from scheduled commercial bank',
      'Civil and technical layout drawings',
      'Pollution control & local panchayat NOC'
    ],
    applicableStates: ['All Indian States'],
    applicableCrops: ['Tomato', 'Mango', 'Banana', 'Onion', 'Potato'],
    status: 'Open for Applications',
    portalUrl: 'https://midh.gov.in'
  },
  {
    id: 'sch-pmksy',
    name: 'PM Krishi Sinchayee Yojana (Per Drop More Crop)',
    shortCode: 'PMKSY-PDMC',
    department: 'Dept of Agriculture, Cooperation & Farmers Welfare',
    category: 'Technology',
    eligibility: [
      'Small and marginal farmers receive 55% subsidy',
      'Other category farmers receive 45% subsidy',
      'Applicable for drip & micro-sprinkler installations'
    ],
    benefits: 'Water efficiency enhancement of up to 40-50% with up to 55% subsidy on micro-irrigation system equipment.',
    subsidyPercent: 55,
    maxSubsidyAmount: '₹55,000 per hectare',
    requiredDocuments: [
      'Chitta / Adangal / Pahani land records',
      'Soil & Water testing report',
      'Quotation from approved micro-irrigation manufacturer'
    ],
    applicableStates: ['All Indian States'],
    applicableCrops: ['All Crops'],
    status: 'Active',
    portalUrl: 'https://pmksy.gov.in'
  },
  {
    id: 'sch-pmkisan',
    name: 'PM-KISAN Samman Nidhi',
    shortCode: 'PM-KISAN',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Financial',
    eligibility: [
      'All landholding farmer families with cultivable land in their names',
      'Subject to standard institutional exclusions'
    ],
    benefits: 'Direct income support of ₹6,000 per year in three equal installments of ₹2,000 directly transferred to Aadhaar-seeded bank accounts.',
    maxSubsidyAmount: '₹6,000 per annum direct transfer',
    requiredDocuments: [
      'Aadhaar card',
      'Citizenship proof',
      'Land ownership documents',
      'Bank account details'
    ],
    applicableStates: ['All Indian States'],
    applicableCrops: ['All Crops'],
    status: 'Active',
    portalUrl: 'https://pmkisan.gov.in'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'High Demand Surge: Chennai Koyambedu',
    message: 'Tomato wholesale rates jumped +8.5% today to ₹28/kg. Your stock in Kallakurichi Cold Hub can yield +₹8,500 additional revenue.',
    type: 'price_alert',
    timestamp: '15 mins ago',
    read: false,
    priority: 'high',
    actionUrl: 'price-intelligence'
  },
  {
    id: 'notif-02',
    title: 'Shelf-Life Advisory: 1,200 kg Tomatoes',
    message: 'Storage sensor indicates Lot AGR-2026-004582 has 4 days remaining shelf life. Allocation to Koyambedu buyer recommended.',
    type: 'shelf_life',
    timestamp: '1 hour ago',
    read: false,
    priority: 'high',
    actionUrl: 'storage'
  },
  {
    id: 'notif-03',
    title: 'Buyer Order Received: FreshMart Supermarkets',
    message: 'FreshMart Chennai placed a confirmed PO for 2,000 kg Grade-A Tomatoes at ₹28/kg. Escrow funds secured.',
    type: 'order',
    timestamp: '2 hours ago',
    read: false,
    priority: 'medium',
    actionUrl: 'orders'
  },
  {
    id: 'notif-04',
    title: 'Cold Chain Milestone: Reefer TN-25-AX-4819',
    message: 'Shipment AGT-20382 reached Sriperumbudur. Temperature sustained at steady 4.1°C throughout transit.',
    type: 'shipment',
    timestamp: '3 hours ago',
    read: true,
    priority: 'low',
    actionUrl: 'transport'
  }
];

export const INITIAL_BUYER_ORDERS: BuyerOrder[] = [
  {
    orderId: 'ORD-2026-9041',
    produceId: 'AGR-2026-004582',
    cropName: 'Tomato (Hybrid Round)',
    buyerName: 'R. Senthil Nathan',
    buyerCompany: 'FreshMart Hypermarkets South Pvt Ltd',
    buyerType: 'Retail Supermarket',
    quantityKg: 2000,
    pricePerKg: 28,
    totalAmount: 56000,
    orderDate: '22 Sep 2026, 09:30 AM',
    deliveryLocation: 'FreshMart Central DC, Madhavaram, Chennai',
    status: 'confirmed',
    paymentStatus: 'Escrow Secured'
  },
  {
    orderId: 'ORD-2026-8982',
    produceId: 'AGR-2026-003914',
    cropName: 'Onion (Nashik Red)',
    buyerName: 'Deepak Agrawal',
    buyerCompany: 'Mumbai APMC Bulk Agro Trading Co.',
    buyerType: 'Wholesaler',
    quantityKg: 4000,
    pricePerKg: 32,
    totalAmount: 128000,
    orderDate: '21 Sep 2026, 02:15 PM',
    deliveryLocation: 'Gala 41, Sector 19, Vashi APMC, Navi Mumbai',
    status: 'dispatched',
    paymentStatus: 'Escrow Secured'
  }
];

export const DEMO_USERS: Record<string, UserSession> = {
  farmer: {
    role: 'farmer',
    name: 'K. Murugesan',
    phone: '+91 98421 78201',
    email: 'murugesan.farmer@agriflow.in',
    organization: 'Dharmapuri Horti Collective',
    location: 'Palacode, Dharmapuri, Tamil Nadu'
  },
  fpo: {
    role: 'fpo',
    name: 'R. Velan',
    phone: '+91 94432 99011',
    email: 'dharmapuri.fpo@agriflow.in',
    organization: 'Dharmapuri Horti Farmer Producer Co.',
    location: 'Dharmapuri Main Hub, Tamil Nadu'
  },
  processor: {
    role: 'processor',
    name: 'Dr. Anand Kumar',
    phone: '+91 98841 55092',
    email: 'anand.proc@cauverybiofoods.com',
    organization: 'Cauvery Bio-Foods & Processing Hub',
    location: 'Hosur Industrial Complex, Tamil Nadu'
  },
  transporter: {
    role: 'transporter',
    name: 'S. Shanmugam',
    phone: '+91 97890 44102',
    email: 'shanmugam.fleet@agrilogix.in',
    organization: 'Tamil Nadu Reefer Logistics Express',
    location: 'Tiruvannamalai / Chennai Fleet Base'
  },
  buyer: {
    role: 'buyer',
    name: 'R. Senthil Nathan',
    phone: '+91 98400 12345',
    email: 'senthil.procure@freshmart.in',
    organization: 'FreshMart Hypermarkets South Pvt Ltd',
    location: 'Madhavaram DC, Chennai, Tamil Nadu'
  },
  admin: {
    role: 'admin',
    name: 'P. Rajeshwaran, IAS (Advisor)',
    phone: '+91 94440 00192',
    email: 'admin.agri@tn.gov.in',
    organization: 'Dept of Agricultural Marketing & Agri Business',
    location: 'Secretariat, Chennai, Tamil Nadu'
  },
  government: {
    role: 'government',
    name: 'Institutional Stakeholder / APMC Director',
    phone: '+91 94450 11223',
    email: 'director.horti@gov.in',
    organization: 'State Agricultural Marketing Board',
    location: 'Krishi Bhavan, New Delhi / Chennai'
  }
};
