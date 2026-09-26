import React, { useState } from 'react';
import { 
  Upload, 
  Warehouse, 
  DollarSign, 
  ArrowRight,
  Layers,
  Scale,
  CheckCircle2
} from 'lucide-react';
import { 
  SAMPLE_PRODUCE_OPTIONS, 
  analyzeProduceQuality, 
  QualityAnalysisResult 
} from '../../services/aiRecommendation';
import { StatusBadge } from '../common/StatusBadge';

interface QualityInspectorProps {
  onProduceGraded?: (gradeData: {
    cropName: string;
    grade: 'A' | 'B' | 'C';
    freshness: number;
    defect: number;
    shelfLife: number;
    storageReq: string;
    suggestedPrice: number;
  }) => void;
}

export const QualityInspector: React.FC<QualityInspectorProps> = ({ onProduceGraded }) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(SAMPLE_PRODUCE_OPTIONS[0].type);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<QualityAnalysisResult>(
    analyzeProduceQuality(SAMPLE_PRODUCE_OPTIONS[0].name, undefined, SAMPLE_PRODUCE_OPTIONS[0].type)
  );

  const activePreset = SAMPLE_PRODUCE_OPTIONS.find((p) => p.type === selectedPreset) || SAMPLE_PRODUCE_OPTIONS[0];

  const handleSelectPreset = (presetType: string) => {
    setSelectedPreset(presetType);
    setCustomImage(null);
    runAnalysis(presetType);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setSelectedPreset('');
        runAnalysis(undefined, reader.result as string, file.name.split('.')[0]);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = (presetType?: string, imageUri?: string, fallbackName?: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const result = analyzeProduceQuality(
        fallbackName || (presetType ? activePreset.name : 'Submitted Lot Sample'),
        imageUri,
        presetType
      );
      setAnalysisResult(result);
      setIsScanning(false);
    }, 450);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200/90 shadow-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-agri-800 bg-agri-50 px-2.5 py-0.5 rounded-md border border-agri-200">
            <Scale className="w-3.5 h-3.5" />
            AGMARK & e-NAM Assay Desk
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-serif mt-2">
            Produce Lot Grading & Moisture Assay
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Inspect crate samples for skin blemishes, size uniformity, and keeping quality before weighbridge entry
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200 self-start md:self-auto">
          <CheckCircle2 className="w-4 h-4 text-agri-700" />
          <span>Standardized FPO Intake Norms</span>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="my-6">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Select Crate Sample or Upload Lot Photo:
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PRODUCE_OPTIONS.map((sample) => (
            <button
              key={sample.type}
              onClick={() => handleSelectPreset(sample.type)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                selectedPreset === sample.type
                  ? 'bg-agri-900 text-white border-agri-900 shadow-xs'
                  : 'bg-white text-slate-700 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
              }`}
            >
              <img 
                src={sample.image} 
                alt={sample.name} 
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{sample.label}</span>
            </button>
          ))}

          {/* Upload Button */}
          <label className="px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border border-dashed border-stone-300 hover:border-agri-600 bg-stone-50 hover:bg-stone-100 text-slate-700 flex items-center gap-2 transition-colors">
            <Upload className="w-3.5 h-3.5 text-agri-700" />
            <span>Upload Crate Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload} 
            />
          </label>
        </div>
      </div>

      {/* Main Analysis Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Sample Crate Inspection View (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 aspect-4/3 flex items-center justify-center group">
            <img 
              src={customImage || activePreset.image} 
              alt={analysisResult.cropName} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isScanning ? 'opacity-50' : 'opacity-95'
              }`}
            />

            {isScanning && (
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none bg-slate-950/30">
                <span className="text-xs font-semibold text-white bg-slate-900/90 px-3.5 py-1.5 rounded-lg border border-white/20">
                  Checking sample uniformity...
                </span>
              </div>
            )}

            {/* Sample Region Markers */}
            {!isScanning && analysisResult.visionBoundingBoxes.map((box, idx) => (
              <div
                key={idx}
                className={`absolute border-2 rounded pointer-events-none transition-all duration-300 ${
                  box.type === 'good' 
                    ? 'border-emerald-400 bg-emerald-500/10' 
                    : 'border-amber-400 bg-amber-500/15'
                }`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                }}
              >
                <span className={`absolute -top-6 left-0 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm text-white ${
                  box.type === 'good' ? 'bg-agri-800' : 'bg-amber-700'
                }`}>
                  {box.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Assay Bench: FPO Inward Gate #2</span>
            <span className="font-medium text-agri-800 bg-agri-50 px-2 py-0.5 rounded border border-agri-200">
              Verified Sample
            </span>
          </div>
        </div>

        {/* Right: Inspection Results & Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Assigned Grade</span>
              <div className="mt-1 flex items-center gap-1.5">
                <StatusBadge status={`Grade ${analysisResult.qualityGrade}`} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Freshness Index</span>
              <div className="mt-1 flex items-baseline gap-1 tabular-nums">
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {analysisResult.freshnessPercent}%
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Sound</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Surface Blemish</span>
              <div className="mt-1 flex items-baseline gap-1 tabular-nums">
                <span className={`text-xl font-extrabold font-display ${
                  analysisResult.defectProbability > 10 ? 'text-amber-700' : 'text-slate-900'
                }`}>
                  {analysisResult.defectProbability}%
                </span>
                <span className="text-[11px] text-slate-500">By weight</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Keeping Life</span>
              <div className="mt-1 flex items-baseline gap-1 tabular-nums">
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {analysisResult.shelfLifeDays}
                </span>
                <span className="text-[11px] text-slate-500">Days</span>
              </div>
            </div>
          </div>

          {/* Physical Assay Parameters */}
          <div className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-agri-700" />
              Physical Lot Assay Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysisResult.detectedFeatures.map((feat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-stone-200 flex items-center justify-between">
                  <span className="text-slate-600 truncate pr-2">{feat.feature}</span>
                  <span className={`font-semibold tabular-nums shrink-0 ${
                    feat.status === 'optimal' ? 'text-agri-800' : 'text-amber-700'
                  }`}>
                    {feat.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage & Market Recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                <Warehouse className="w-4 h-4 text-agri-700" />
                <span>Recommended Cold Room / Godown</span>
              </div>
              <p className="font-semibold text-slate-900">{analysisResult.recommendedStorage.facilityType}</p>
              <p className="text-slate-600">Temp: {analysisResult.recommendedStorage.temperatureRange} | Humidity: {analysisResult.recommendedStorage.humidityRange}</p>
              <p className="text-slate-500 text-[11px] pt-1">{analysisResult.recommendedStorage.specialCare}</p>
            </div>

            <div className="p-4 rounded-xl bg-agri-50/70 border border-agri-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-agri-950 font-bold">
                <DollarSign className="w-4 h-4 text-agri-700" />
                <span>Expected Mandi Rate Band</span>
              </div>
              <p className="text-2xl font-bold text-agri-900 font-display tabular-nums">
                ₹{analysisResult.estimatedMarketValue.minPrice} – ₹{analysisResult.estimatedMarketValue.maxPrice}
                <span className="text-xs font-normal text-slate-600"> / kg</span>
              </p>
              <p className="text-slate-600 text-[11px]">
                Based on today's Grade {analysisResult.qualityGrade} arrivals at regional APMC yards
              </p>
            </div>
          </div>

          {/* Action Row */}
          {onProduceGraded && (
            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={() => onProduceGraded({
                  cropName: analysisResult.cropName,
                  grade: analysisResult.qualityGrade,
                  freshness: analysisResult.freshnessPercent,
                  defect: analysisResult.defectProbability,
                  shelfLife: analysisResult.shelfLifeDays,
                  storageReq: `${analysisResult.recommendedStorage.facilityType} (${analysisResult.recommendedStorage.temperatureRange})`,
                  suggestedPrice: analysisResult.estimatedMarketValue.minPrice
                })}
                className="px-5 py-2.5 rounded-xl bg-agri-800 hover:bg-agri-900 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Enter Lot into Weighbridge Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
