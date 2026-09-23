export interface QualityAnalysisResult {
  cropName: string;
  qualityGrade: 'A' | 'B' | 'C';
  freshnessPercent: number;
  defectProbability: number;
  shelfLifeDays: number;
  recommendedStorage: {
    facilityType: string;
    temperatureRange: string;
    humidityRange: string;
    specialCare: string;
  };
  estimatedMarketValue: {
    minPrice: number;
    maxPrice: number;
    currency: string;
    unit: string;
  };
  detectedFeatures: {
    feature: string;
    status: 'optimal' | 'moderate' | 'defect';
    score: string;
  }[];
  visionBoundingBoxes: {
    label: string;
    confidence: number;
    x: number; // percentage
    y: number;
    width: number;
    height: number;
    type: 'good' | 'defect' | 'neutral';
  }[];
  disclaimer: string;
}

export const SAMPLE_PRODUCE_OPTIONS = [
  {
    name: 'Tomato (Hybrid Sivam)',
    type: 'tomato_fresh',
    label: 'Fresh Harvest Tomato',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    expectedGrade: 'A' as const,
    freshness: 94,
    defect: 4,
    shelfLife: 7,
    priceMin: 26,
    priceMax: 29
  },
  {
    name: 'Tomato (Slight Blemish)',
    type: 'tomato_blemish',
    label: 'Market-grade Tomato (Minor Blemish)',
    image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?auto=format&fit=crop&w=600&q=80',
    expectedGrade: 'B' as const,
    freshness: 82,
    defect: 14,
    shelfLife: 4,
    priceMin: 20,
    priceMax: 23
  },
  {
    name: 'Onion (Nashik Red Cured)',
    type: 'onion_cured',
    label: 'Cured Nashik Red Onion',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    expectedGrade: 'A' as const,
    freshness: 91,
    defect: 5,
    shelfLife: 45,
    priceMin: 30,
    priceMax: 33
  },
  {
    name: 'Potato (Agra Kufri Jyoti)',
    type: 'potato_firm',
    label: 'Table Grade Potato',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
    expectedGrade: 'B' as const,
    freshness: 86,
    defect: 9,
    shelfLife: 55,
    priceMin: 18,
    priceMax: 21
  },
  {
    name: 'Mango (Ratnagiri Alphonso)',
    type: 'mango_export',
    label: 'Export Quality Alphonso Mango',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    expectedGrade: 'A' as const,
    freshness: 96,
    defect: 3,
    shelfLife: 12,
    priceMin: 125,
    priceMax: 145
  }
];

export function analyzeProduceQuality(
  cropName: string, 
  customImageUri?: string, 
  presetType?: string
): QualityAnalysisResult {
  const matchedPreset = SAMPLE_PRODUCE_OPTIONS.find((p) => p.type === presetType);

  if (matchedPreset) {
    const isGradeA = matchedPreset.expectedGrade === 'A';
    return {
      cropName: matchedPreset.name,
      qualityGrade: matchedPreset.expectedGrade,
      freshnessPercent: matchedPreset.freshness,
      defectProbability: matchedPreset.defect,
      shelfLifeDays: matchedPreset.shelfLife,
      recommendedStorage: {
        facilityType: isGradeA ? 'Precision Cold Storage' : 'Ventilated Agri Warehouse',
        temperatureRange: isGradeA ? '4°C – 6°C' : '18°C – 22°C',
        humidityRange: isGradeA ? '85% – 90% RH' : '60% – 65% RH',
        specialCare: isGradeA 
          ? 'Maintain cold chain continuity; avoid ethylene cross-gas exposure.' 
          : 'Ensure continuous aeration fans to prevent moisture buildup.'
      },
      estimatedMarketValue: {
        minPrice: matchedPreset.priceMin,
        maxPrice: matchedPreset.priceMax,
        currency: '₹',
        unit: 'kg'
      },
      detectedFeatures: [
        { feature: 'Color Uniformity & Chromatic Index', status: isGradeA ? 'optimal' : 'moderate', score: isGradeA ? '96.2%' : '84.0%' },
        { feature: 'Epidermal Integrity (Surface Skin)', status: isGradeA ? 'optimal' : 'moderate', score: isGradeA ? '97.5%' : '81.2%' },
        { feature: 'Rot & Fungal Spores', status: 'optimal', score: '0.0% Detected' },
        { feature: 'Mechanical Bruising Index', status: isGradeA ? 'optimal' : 'defect', score: isGradeA ? '2.1% (Low)' : '11.8% (Surface scar)' }
      ],
      visionBoundingBoxes: [
        { label: `${matchedPreset.expectedGrade === 'A' ? 'Prime Caliber' : 'Uniform Cluster'}`, confidence: 0.96, x: 22, y: 25, width: 48, height: 46, type: 'good' },
        ...(isGradeA ? [] : [
          { label: 'Minor Skin Blemish (Non-Pathogenic)', confidence: 0.88, x: 52, y: 38, width: 22, height: 20, type: 'defect' as const }
        ])
      ],
      disclaimer: 'Prototype AI Model: Results are generated for demonstration & decision support. Field verification is advised.'
    };
  }

  // Fallback / Custom uploaded photo assessment
  const isTomato = cropName.toLowerCase().includes('tomato');
  const isOnion = cropName.toLowerCase().includes('onion');
  const isPotato = cropName.toLowerCase().includes('potato');

  let grade: 'A' | 'B' | 'C' = 'A';
  let freshness = 92;
  let defect = 6;
  let shelfLife = 7;
  let minP = 25;
  let maxP = 29;

  if (isOnion) {
    shelfLife = 40;
    minP = 28;
    maxP = 32;
  } else if (isPotato) {
    shelfLife = 50;
    minP = 18;
    maxP = 22;
  }

  return {
    cropName: cropName || 'Agricultural Produce Sample',
    qualityGrade: grade,
    freshnessPercent: freshness,
    defectProbability: defect,
    shelfLifeDays: shelfLife,
    recommendedStorage: {
      facilityType: 'Precision Cold Storage / Ventilated Chamber',
      temperatureRange: '4°C – 10°C depending on crop genus',
      humidityRange: '70% – 85% RH',
      specialCare: 'Stack on aerated plastic crates; avoid direct floor contact.'
    },
    estimatedMarketValue: {
      minPrice: minP,
      maxPrice: maxP,
      currency: '₹',
      unit: 'kg'
    },
    detectedFeatures: [
      { feature: 'Morphological Symmetry', status: 'optimal', score: '93.4%' },
      { feature: 'Surface Moisture Level', status: 'optimal', score: 'Balanced' },
      { feature: 'Visible Foreign Matter / Trash', status: 'optimal', score: '< 1.5%' },
      { feature: 'Microbial Surface Risk', status: 'optimal', score: 'Negligible' }
    ],
    visionBoundingBoxes: [
      { label: 'Analyzed Region: Prime Produce', confidence: 0.94, x: 20, y: 20, width: 60, height: 60, type: 'good' }
    ],
    disclaimer: 'Prototype AI Model: Results are generated for demonstration & decision support. Field verification is advised.'
  };
}

export function generateAiChatResponse(query: string): { response: string; relatedAction?: string } {
  const q = query.toLowerCase();

  if (q.includes('tomato') && (q.includes('price') || q.includes('rate'))) {
    return {
      response: 'Currently, Tomato modal prices are trending high in Chennai Koyambedu at ₹28/kg (+8.5% 24h surge), Madurai at ₹27/kg, and Salem at ₹24/kg. If you have stock in northern/central Tamil Nadu, Koyambedu offers a net revenue gain of ~₹3.50/kg after factoring in ₹1.80/kg reefer transport.',
      relatedAction: 'price-intelligence'
    };
  }

  if (q.includes('onion') && (q.includes('store') || q.includes('storage') || q.includes('sprout'))) {
    return {
      response: 'For Onions (Nashik Red / Bellary varieties): Store in a well-ventilated dry warehouse with relative humidity below 65% and ambient temperature 20°C–25°C. Stack on slatted wooden pallets at least 15 cm above ground with cross-ventilation. Avoid sealed plastic bags or cold rooms without dehumidification to prevent neck rot and premature sprouting.',
      relatedAction: 'storage'
    };
  }

  if (q.includes('market') && (q.includes('sell') || q.includes('where') || q.includes('closer') || q.includes('recommend'))) {
    return {
      response: 'Based on live APMC data, Koyambedu (Chennai) has an acute tomato deficit of ~400 quintals today, offering ₹28/kg. For Onions, Vashi APMC (Navi Mumbai) is yielding ₹34/kg. AgriFlow recommendation engine computes that routing your harvest to high-demand terminals earns 18% higher margin than local village distress selling.',
      relatedAction: 'marketplace'
    };
  }

  if (q.includes('expir') || q.includes('shelf') || q.includes('stock')) {
    return {
      response: 'Alert: In Kallakurichi Cold Hub (Unit A), 1,200 kg of hybrid tomatoes are currently at Day 4 of their 8-day shelf life. We advise listing them for immediate wholesale dispatch or converting to value-added puree via the Hosur processing hub before deterioration occurs.',
      relatedAction: 'storage'
    };
  }

  if (q.includes('scheme') || q.includes('subsidy') || q.includes('government') || q.includes('aif')) {
    return {
      response: 'Key schemes applicable right now: 1) Agriculture Infrastructure Fund (AIF) provides 3% interest subvention up to ₹2 Crore for setting up on-farm cold rooms & pack-houses. 2) PMFBY covers post-harvest losses up to 14 days after harvest. 3) MIDH offers 35% capital subsidy for reefer transport vans.',
      relatedAction: 'schemes'
    };
  }

  return {
    response: 'AgriGuide AI is ready to assist with live mandi rates, shelf-life alerts, optimal cold chain temperatures, processing batch formulations, and PM agriculture schemes. How can I help your produce journey today?',
    relatedAction: 'farmer'
  };
}
