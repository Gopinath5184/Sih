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
  assayNote: string;
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
    label: 'Table Grade Tomato (Minor Skin Scar)',
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
    label: 'Export Grade Alphonso Mango',
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
        facilityType: isGradeA ? 'Pre-Cooled Cold Room' : 'Ventilated Dry Godown',
        temperatureRange: isGradeA ? '4°C – 6°C' : '18°C – 22°C',
        humidityRange: isGradeA ? '85% – 90% RH' : '60% – 65% RH',
        specialCare: isGradeA 
          ? 'Keep in perforated plastic crates; store away from ethylene-producing fruits.' 
          : 'Maintain cross-ventilation fans to prevent neck moisture.'
      },
      estimatedMarketValue: {
        minPrice: matchedPreset.priceMin,
        maxPrice: matchedPreset.priceMax,
        currency: '₹',
        unit: 'kg'
      },
      detectedFeatures: [
        { feature: 'Color & Ripeness Uniformity', status: isGradeA ? 'optimal' : 'moderate', score: isGradeA ? '96% Uniform' : '84% Uniform' },
        { feature: 'Skin Firmness & Cuticle Intactness', status: isGradeA ? 'optimal' : 'moderate', score: isGradeA ? '4.8 / 5.0' : '4.1 / 5.0' },
        { feature: 'Fungal Rot or Wet Spoilage', status: 'optimal', score: 'None Found' },
        { feature: 'Surface Handling Bruises', status: isGradeA ? 'optimal' : 'defect', score: isGradeA ? '2.1% (Minimal)' : '11.8% (Skin scar)' }
      ],
      visionBoundingBoxes: [
        { label: `${matchedPreset.expectedGrade === 'A' ? 'Grade A Sample' : 'Standard Lot'}`, confidence: 0.96, x: 22, y: 25, width: 48, height: 46, type: 'good' },
        ...(isGradeA ? [] : [
          { label: 'Minor Surface Scar', confidence: 0.88, x: 52, y: 38, width: 22, height: 20, type: 'defect' as const }
        ])
      ],
      assayNote: 'Assessed against AGMARK & e-NAM physical grading norms. Final settlement subject to FPO weighbridge moisture check.'
    };
  }

  const isOnion = cropName.toLowerCase().includes('onion');
  const isPotato = cropName.toLowerCase().includes('potato');

  const grade: 'A' | 'B' | 'C' = 'A';
  const freshness = 92;
  const defect = 6;
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
    cropName: cropName || 'Submitted Lot Sample',
    qualityGrade: grade,
    freshnessPercent: freshness,
    defectProbability: defect,
    shelfLifeDays: shelfLife,
    recommendedStorage: {
      facilityType: 'Cold Room / Ventilated Pack-House',
      temperatureRange: '4°C – 10°C depending on crop',
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
      { feature: 'Size & Caliber Consistency', status: 'optimal', score: '93.4% Uniform' },
      { feature: 'Surface Moisture Content', status: 'optimal', score: 'Within Norm' },
      { feature: 'Foreign Matter / Chaff', status: 'optimal', score: '< 1.5%' },
      { feature: 'Visible Rot / Splitting', status: 'optimal', score: 'Nil' }
    ],
    visionBoundingBoxes: [
      { label: 'Assayed Sample Lot', confidence: 0.94, x: 20, y: 20, width: 60, height: 60, type: 'good' }
    ],
    assayNote: 'Assessed against AGMARK & e-NAM physical grading norms. Final settlement subject to FPO weighbridge moisture check.'
  };
}
