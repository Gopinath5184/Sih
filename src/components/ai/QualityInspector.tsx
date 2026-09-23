import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Warehouse, 
  Award, 
  DollarSign, 
  Clock, 
  Eye, 
  ShieldAlert,
  ArrowRight,
  Layers
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
        fallbackName || (presetType ? activePreset.name : 'Uploaded Produce'),
        imageUri,
        presetType
      );
      setAnalysisResult(result);
      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            AI Computer Vision Grading
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 font-display mt-2">
            Automated Agricultural Produce Quality Assessment
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            Simulated edge-vision neural network evaluating surface integrity, chromatic grading, and estimated shelf life
          </p>
        </div>

        {/* Prototype AI Disclaimer Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80 self-start md:self-auto">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Demo Prototype &bull; For Decision Support</span>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="my-6">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Select Indian Produce Sample or Upload Your Own Photo:
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PRODUCE_OPTIONS.map((sample) => (
            <button
              key={sample.type}
              onClick={() => handleSelectPreset(sample.type)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                selectedPreset === sample.type
                  ? 'bg-agri-900 text-white border-agri-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
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
          <label className="px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer border border-dashed border-slate-300 hover:border-agri-500 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center gap-2 transition-colors">
            <Upload className="w-3.5 h-3.5 text-agri-700" />
            <span>Upload Photo</span>
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
        {/* Left: Simulated Computer Vision Canvas (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-950 aspect-4/3 flex items-center justify-center group shadow-inner">
            <img 
              src={customImage || activePreset.image} 
              alt={analysisResult.cropName} 
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isScanning ? 'opacity-40 blur-2xs' : 'opacity-90'
              }`}
            />

            {/* Scanning Laser Animation */}
            {isScanning && (
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] animate-pulse" />
                <span className="mt-3 text-xs font-mono font-semibold text-emerald-300 bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/40">
                  Processing Convolutional Features...
                </span>
              </div>
            )}

            {/* Computer Vision Bounding Boxes Overlay */}
            {!isScanning && analysisResult.visionBoundingBoxes.map((box, idx) => (
              <div
                key={idx}
                className={`absolute border-2 rounded pointer-events-none transition-all duration-300 ${
                  box.type === 'good' 
                    ? 'border-emerald-400 bg-emerald-500/10' 
                    : 'border-rose-400 bg-rose-500/15'
                }`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`,
                }}
              >
                <span className={`absolute -top-6 left-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm text-white ${
                  box.type === 'good' ? 'bg-emerald-700' : 'bg-rose-700'
                }`}>
                  {box.label} &bull; {(box.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}

            {/* Camera Corner Target Marks */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/60 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/60 pointer-events-none" />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-mono">Sensor: 12MP RGB + Multispectral</span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Confidence: 96.8%
            </span>
          </div>
        </div>

        {/* Right: Inspection Results & Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Score Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Quality Grade</span>
              <div className="mt-1 flex items-center gap-1.5">
                <StatusBadge status={`Grade ${analysisResult.qualityGrade}`} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Freshness</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {analysisResult.freshnessPercent}%
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">Optimal</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Defect Index</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className={`text-xl font-extrabold font-display ${
                  analysisResult.defectProbability > 10 ? 'text-amber-700' : 'text-slate-900'
                }`}>
                  {analysisResult.defectProbability}%
                </span>
                <span className="text-[11px] text-slate-500">Surface</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Est. Shelf Life</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-slate-900 font-display">
                  {analysisResult.shelfLifeDays}
                </span>
                <span className="text-[11px] text-slate-500">Days</span>
              </div>
            </div>
          </div>

          {/* Deep Feature Scores */}
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-agri-700" />
              Detailed Morphological & Defect Analysis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysisResult.detectedFeatures.map((feat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 truncate pr-2">{feat.feature}</span>
                  <span className={`font-semibold font-mono shrink-0 ${
                    feat.status === 'optimal' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {feat.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage & Market Recommendations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-950 font-bold">
                <Warehouse className="w-4 h-4 text-cyan-700" />
                <span>Recommended Storage</span>
              </div>
              <p className="font-semibold text-slate-900">{analysisResult.recommendedStorage.facilityType}</p>
              <p className="text-slate-600">Temp: {analysisResult.recommendedStorage.temperatureRange} | Humidity: {analysisResult.recommendedStorage.humidityRange}</p>
              <p className="text-slate-500 text-[11px] pt-1">{analysisResult.recommendedStorage.specialCare}</p>
            </div>

            <div className="p-4 rounded-xl bg-agri-50/70 border border-agri-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-agri-950 font-bold">
                <DollarSign className="w-4 h-4 text-agri-700" />
                <span>Fair Market Valuation Band</span>
              </div>
              <p className="text-2xl font-bold text-agri-900 font-display">
                ₹{analysisResult.estimatedMarketValue.minPrice} – ₹{analysisResult.estimatedMarketValue.maxPrice}
                <span className="text-xs font-normal text-slate-600"> / kg</span>
              </p>
              <p className="text-slate-600 text-[11px]">
                Grade {analysisResult.qualityGrade} premium pricing based on current regional APMC arrivals
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
                <span>Use this AI Grade to Register Produce Lot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
