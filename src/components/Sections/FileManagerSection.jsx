import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  FileText, 
  FileCode, 
  FileSpreadsheet, 
  Sparkles, 
  Plus, 
  Download, 
  Eye, 
  Trash2, 
  Search, 
  Filter, 
  CheckCircle, 
  Loader2, 
  HardDrive, 
  Cpu, 
  X, 
  FileCheck,
  RefreshCw,
  Zap,
  ArrowDownToLine,
  FolderOpen,
  Copy,
  Check,
  Edit3,
  Save
} from 'lucide-react';

const DEFAULT_FOLDER_PATH = "C:\\Users\\MR SALUER\\Downloads\\Agrifield-Files";

const INITIAL_FILES = (folderPath) => [
  {
    id: 'file-1',
    name: 'SOIL_HEALTH_SECTOR_4.json',
    category: 'Soil Health',
    type: 'json',
    crop: 'Wheat',
    field: 'North Parcel - Field 4',
    size: '14.2 KB',
    date: '2026-09-03',
    confidence: '98.5%',
    filePath: `${folderPath}\\SOIL_HEALTH_SECTOR_4.json`,
    content: JSON.stringify({
      reportTitle: "Soil Health & Micro-Nutrient Analysis",
      generatedAt: "2026-09-03T10:30:00Z",
      field: "North Parcel - Field 4",
      cropType: "Wheat",
      soilMetrics: {
        pH: 6.8,
        nitrogen: "42 mg/kg (Optimal)",
        phosphorus: "18 mg/kg (Moderate)",
        potassium: "195 mg/kg (High)",
        organicCarbon: "1.15%",
        moistureIndex: "38%"
      },
      aiPrescription: [
        "Apply 25kg/hectare Organic Nitrogen Supplement within 48 hours",
        "Maintain drip irrigation schedule at 4.5 L/min per row",
        "Soil fungal micro-biome healthy - no bio-fungicide required"
      ]
    }, null, 2)
  },
  {
    id: 'file-2',
    name: 'CROP_DIAGNOSTICS_SEPT2026.csv',
    category: 'Diagnostics',
    type: 'csv',
    crop: 'Corn',
    field: 'East Basin - Plot 2B',
    size: '28.6 KB',
    date: '2026-09-02',
    confidence: '96.2%',
    filePath: `${folderPath}\\CROP_DIAGNOSTICS_SEPT2026.csv`,
    content: `Timestamp,Zone,Pathogen_Detected,Severity,Action_Required,Status
2026-09-02 08:15,Zone A1,Corn Common Rust,Mild (8%),Apply Neem Spray,Resolved
2026-09-02 09:40,Zone B4,Northern Corn Leaf Blight,Moderate (14%),Targeted Copper Hydroxide,In Progress
2026-09-02 11:20,Zone C2,None (Healthy),0%,Continue Regular Audit,Normal
2026-09-02 14:05,Zone D1,Fall Armyworm Early Stage,Low (4%),Deploy Bio-Pheromone Traps,Active`
  },
  {
    id: 'file-3',
    name: 'SMART_IRRIGATION_SCHEDULE.json',
    category: 'Irrigation',
    type: 'json',
    crop: 'Rice',
    field: 'Riverland - Pad 1',
    size: '8.4 KB',
    date: '2026-09-01',
    confidence: '99.1%',
    filePath: `${folderPath}\\SMART_IRRIGATION_SCHEDULE.json`,
    content: JSON.stringify({
      scheduleName: "AI Adaptive Drip Irrigation Matrix",
      weatherSync: "Integrated with Real-Time Rain Sensor",
      cycles: [
        { time: "05:30 AM", durationMinutes: 45, targetVPD: "1.2 kPa", flowRateGPM: 120 },
        { time: "01:00 PM", durationMinutes: 20, targetVPD: "2.4 kPa", flowRateGPM: 85 },
        { time: "06:15 PM", durationMinutes: 40, targetVPD: "1.1 kPa", flowRateGPM: 110 }
      ],
      waterSavingsEstimatedPercent: "34.2%"
    }, null, 2)
  },
  {
    id: 'file-4',
    name: 'DRONE_THERMAL_SCAN_OCT2026.csv',
    category: 'Drone Scans',
    type: 'csv',
    crop: 'Soybean',
    field: 'Greenhouse Sector A',
    size: '45.1 KB',
    date: '2026-08-30',
    confidence: '97.8%',
    filePath: `${folderPath}\\DRONE_THERMAL_SCAN_OCT2026.csv`,
    content: `Grid_X,Grid_Y,NDVI_Index,Surface_Temp_C,Canopy_Stress_Score
12.4,45.8,0.84,24.2,Low
12.5,45.8,0.81,24.5,Low
12.6,45.8,0.62,28.1,Moderate Stress
12.7,45.8,0.48,31.4,High Moisture Deficit`
  },
  {
    id: 'file-5',
    name: 'AI_FARM_ACTION_PLAN.txt',
    category: 'Action Plans',
    type: 'txt',
    crop: 'Cotton',
    field: 'South Ridge - Field 8',
    size: '12.0 KB',
    date: '2026-08-28',
    confidence: '99.4%',
    filePath: `${folderPath}\\AI_FARM_ACTION_PLAN.txt`,
    content: `# AGRIFIELD.AI - 7-DAY CROP MASTER ACTION PLAN

## Executive Summary
Field Scan completed on South Ridge - Field 8 for Cotton Crop. Overall ecosystem score is **89/100**.

### Priority Tasks
1. **Bio-Fungicide Drenching**: Execute localized application on Grid D3 where humidity levels spiked above 82%.
2. **Potassium Hydroxide Foliar Feed**: Boost boll development before forecasted temp elevation on Thursday.
3. **Moisture Balancing**: Reduce night irrigation cycle by 15% due to soil moisture saturation in lower clay layers.

### Expected Yield Impact
+18.4% improvement compared to standard regional baseline.`
  }
];

export default function FileManagerSection() {
  const [folderPath, setFolderPath] = useState(() => {
    return localStorage.getItem('agrifield_folder_path') || DEFAULT_FOLDER_PATH;
  });
  const [isEditingPath, setIsEditingPath] = useState(false);
  const [tempPath, setTempPath] = useState(folderPath);

  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem('agrifield_files');
    const curPath = localStorage.getItem('agrifield_folder_path') || DEFAULT_FOLDER_PATH;
    if (saved) {
      try { 
        const parsed = JSON.parse(saved); 
        return parsed.map(f => ({
          ...f,
          filePath: f.filePath || `${curPath}\\${f.name}`
        }));
      } catch (e) { return INITIAL_FILES(curPath); }
    }
    return INITIAL_FILES(curPath);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Generation form state
  const [genCategory, setGenCategory] = useState('Soil Health');
  const [genCrop, setGenCrop] = useState('Wheat');
  const [genField, setGenField] = useState('North Parcel - Field 4');
  const [genFormat, setGenFormat] = useState('json');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [genStep, setGenStep] = useState('');

  // Save folder path & sync file paths
  useEffect(() => {
    localStorage.setItem('agrifield_folder_path', folderPath);
    setFiles(prev => prev.map(f => ({
      ...f,
      filePath: `${folderPath}\\${f.name}`
    })));
  }, [folderPath]);

  // Save files to local storage
  useEffect(() => {
    localStorage.setItem('agrifield_files', JSON.stringify(files));
  }, [files]);

  // Show Toast helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Save Path Handler
  const handleSavePath = () => {
    const cleanPath = tempPath.trim();
    if (cleanPath) {
      setFolderPath(cleanPath);
      setIsEditingPath(false);
      showToast(`Updated File Manager Storage Location to: ${cleanPath}`);
    }
  };

  // Copy path helper
  const copyPath = (path, id) => {
    navigator.clipboard.writeText(path);
    setCopiedId(id);
    showToast(`Copied file location: ${path}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Categories list
  const categories = ['All', 'Soil Health', 'Diagnostics', 'Irrigation', 'Drone Scans', 'Action Plans'];

  // Filtered files
  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (f.filePath && f.filePath.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate Total Storage Used
  const totalSizeBytes = files.reduce((acc, curr) => acc + parseFloat(curr.size || '10'), 0);

  // File Generation Logic
  const handleGenerateFile = () => {
    setIsGenerating(true);
    setGenProgress(10);
    setGenStep('Accessing Agrifield.ai IoT Sensors & Satellite Feed...');

    setTimeout(() => {
      setGenProgress(40);
      setGenStep('Running MobileNetV3 AI Neural Network Diagnostic...');
    }, 700);

    setTimeout(() => {
      setGenProgress(75);
      setGenStep('Formatting Agronomic telemetry into file payload...');
    }, 1400);

    setTimeout(() => {
      setGenProgress(100);
      setGenStep('File successfully generated and compiled!');

      const fileId = `file-${Date.now()}`;
      const timeStr = new Date().toISOString().split('T')[0];
      const sanitizedField = genField.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
      const sanitizedCrop = genCrop.toUpperCase();

      let filename = `${genCategory.replace(/\s+/g, '_').toUpperCase()}_${sanitizedCrop}_${sanitizedField}.${genFormat}`;
      let fullPath = `${folderPath}\\${filename}`;
      
      let generatedContent = '';
      if (genFormat === 'json') {
        generatedContent = JSON.stringify({
          system: "Agrifield.ai Farm Intelligence Engine v3.4",
          generatedAt: new Date().toISOString(),
          field: genField,
          cropType: genCrop,
          category: genCategory,
          aiConfidenceScore: "99.2%",
          filePath: fullPath,
          telemetrySummary: {
            temperatureC: 27.4,
            humidityPercent: 62,
            soilNitrogenPPM: 48,
            leafMoistureIndex: 0.88,
            solarRadiation: "780 W/m²"
          },
          aiRecommendations: [
            `Maintain optimal fertigation for ${genCrop} during current vegetative phase.`,
            `Apply precision nitrogen dosing based on NDVI spectral variance on ${genField}.`,
            `Schedule next drone thermal inspection in 7 days.`
          ]
        }, null, 2);
      } else if (genFormat === 'csv') {
        generatedContent = `Timestamp,Field,Crop,Category,Metric_Value,AI_Confidence,Status,File_Location\n` +
                           `${new Date().toISOString()},${genField},${genCrop},${genCategory},Optimal (94%),99.2%,Active,${fullPath}\n` +
                           `${new Date().toISOString()},${genField},${genCrop},Soil_pH,6.7,98.9%,Normal,${fullPath}`;
      } else {
        generatedContent = `# AGRIFIELD.AI - ${genCategory.toUpperCase()} REPORT\n\n` +
                           `**File Storage Path:** ${fullPath}\n` +
                           `**Field Location:** ${genField}\n` +
                           `**Crop Type:** ${genCrop}\n` +
                           `**Generation Timestamp:** ${new Date().toLocaleString()}\n` +
                           `**AI Diagnostic Model:** MobileNetV3 Agronomic Neural Net (Confidence: 99.2%)\n\n` +
                           `## Key Field Insights\n` +
                           `- Crop Canopy Vigor: Excellent (NDVI = 0.87)\n` +
                           `- Pest / Pathogen Status: Zero active infestations detected\n` +
                           `- Moisture Deficit: None detected (Soil Moisture at 41% capacity)\n\n` +
                           `## Automated Next Steps\n` +
                           `1. Continue current automated drip irrigation cycle.\n` +
                           `2. Export report to regional agronomy advisory board.\n`;
      }

      const newFile = {
        id: fileId,
        name: filename,
        category: genCategory,
        type: genFormat,
        crop: genCrop,
        field: genField,
        size: `${(Math.random() * 20 + 8).toFixed(1)} KB`,
        date: timeStr,
        confidence: '99.2%',
        filePath: fullPath,
        content: generatedContent
      };

      setFiles(prev => [newFile, ...prev]);
      setIsGenerating(false);
      setIsGenerateModalOpen(false);
      setGenProgress(0);
      showToast(`Successfully generated "${filename}" in File Manager!`);
    }, 2000);
  };

  // Delete file
  const handleDeleteFile = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from File Manager?`)) {
      setFiles(prev => prev.filter(f => f.id !== id));
      if (previewFile?.id === id) setPreviewFile(null);
      showToast(`Removed "${name}" from File Manager.`);
    }
  };

  // Trigger Actual Browser File Download
  const handleDownloadFile = (fileObj) => {
    const mimeTypes = {
      json: 'application/json',
      csv: 'text/csv',
      txt: 'text/plain',
      pdf: 'text/plain'
    };
    const mime = mimeTypes[fileObj.type] || 'text/plain';
    const blob = new Blob([fileObj.content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileObj.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Saved "${fileObj.name}" to ${folderPath}`);
  };

  // Reset to default sample files
  const handleResetDefaults = () => {
    setFiles(INITIAL_FILES(folderPath));
    showToast('Reset File Manager to default AgriField sample files.');
  };

  return (
    <section id="file-manager" className="min-h-screen relative py-20 px-4 sm:px-6 lg:px-8 bg-[#081C15]">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#40916C]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1B4332] text-[#B9FBC0] border border-[#B9FBC0]/40 px-5 py-3 rounded-2xl shadow-2xl animate-bounce">
          <CheckCircle className="w-5 h-5 text-[#B9FBC0]" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/30 text-[#B9FBC0] text-xs font-bold uppercase tracking-wider mb-3">
              <FolderKanban className="w-4 h-4 text-[#B9FBC0]" />
              <span>Agrifield.ai File Manager</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Agri-AI Document & Report <br />
              <span className="text-[#B9FBC0]">Storage & File Generator</span>
            </h2>
            <p className="text-sm sm:text-base text-[#74C69D] mt-2 max-w-2xl">
              Generate, preview, analyze, and download AI soil health diagnostics, IoT sensor logs, and crop yield plans directly in your File Manager.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4332]/60 hover:bg-[#1B4332] text-[#74C69D] text-xs font-bold border border-[#40916C]/30 transition-all cursor-pointer"
              title="Reset to default sample files"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Samples</span>
            </button>

            <button
              onClick={() => setIsGenerateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#40916C] to-[#52B788] hover:from-[#52B788] hover:to-[#74C69D] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#40916C]/40 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#B9FBC0]" />
              <span>Generate New File</span>
              <Plus className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Dynamic File Storage Location Banner */}
        <div className="glass-panel p-4 rounded-2xl border border-[#B9FBC0]/30 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#1B4332]/80 to-[#081C15]/90">
          <div className="flex items-center gap-3 flex-1 overflow-hidden w-full">
            <div className="w-9 h-9 rounded-xl bg-[#081C15] border border-[#B9FBC0]/40 flex items-center justify-center text-[#B9FBC0] shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#74C69D]">File Manager Location Path</span>
                {!isEditingPath && (
                  <button
                    onClick={() => { setTempPath(folderPath); setIsEditingPath(true); }}
                    className="text-[10px] text-[#B9FBC0] hover:underline inline-flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <Edit3 className="w-3 h-3" /> Change Path
                  </button>
                )}
              </div>

              {isEditingPath ? (
                <div className="flex items-center gap-2 mt-1 w-full">
                  <input
                    type="text"
                    value={tempPath}
                    onChange={(e) => setTempPath(e.target.value)}
                    className="flex-1 bg-[#081C15] border border-[#B9FBC0] rounded-lg px-3 py-1 text-xs font-mono text-[#B9FBC0] focus:outline-none"
                    placeholder="Enter file manager directory path..."
                  />
                  <button
                    onClick={handleSavePath}
                    className="px-3 py-1 bg-[#40916C] hover:bg-[#52B788] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                  <button
                    onClick={() => setIsEditingPath(false)}
                    className="px-2 py-1 text-xs text-[#74C69D] hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-sm font-mono text-[#B9FBC0] font-bold select-all truncate" title={folderPath}>
                  {folderPath}
                </p>
              )}
            </div>
          </div>

          {!isEditingPath && (
            <button
              onClick={() => copyPath(folderPath, 'banner')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081C15] hover:bg-[#1B4332] text-[#B9FBC0] border border-[#40916C]/40 text-xs font-semibold shrink-0 cursor-pointer"
            >
              {copiedId === 'banner' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedId === 'banner' ? 'Copied Path!' : 'Copy Location Path'}</span>
            </button>
          )}
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-2xl border border-[#40916C]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#74C69D]">Total Files in Manager</p>
              <h3 className="text-2xl font-extrabold text-white mt-1">{files.length} Files</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#B9FBC0]" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#40916C]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#74C69D]">Storage Allocated</p>
              <h3 className="text-2xl font-extrabold text-white mt-1">{totalSizeBytes.toFixed(1)} KB</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-[#74C69D]" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#40916C]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#74C69D]">AI Model Confidence</p>
              <h3 className="text-2xl font-extrabold text-[#B9FBC0] mt-1">98.9% Avg</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#B9FBC0]" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-[#40916C]/30 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#74C69D]">Export Status</p>
              <h3 className="text-2xl font-extrabold text-white mt-1">Ready (CSV/JSON)</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#081C15] border border-[#40916C]/40 flex items-center justify-center">
              <ArrowDownToLine className="w-5 h-5 text-[#FFB703]" />
            </div>
          </div>
        </div>

        {/* Toolbar (Search & Filter) */}
        <div className="glass-panel p-4 rounded-2xl border border-[#40916C]/30 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#74C69D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by file name, crop, field, or path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#081C15]/80 border border-[#40916C]/40 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-[#74C69D]/60 focus:outline-none focus:border-[#B9FBC0] transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-[#74C69D] mr-1 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#40916C] text-white shadow-md shadow-[#40916C]/40'
                    : 'bg-[#081C15]/60 text-[#74C69D] hover:bg-[#1B4332] hover:text-white border border-[#40916C]/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* File Manager Grid */}
        {filteredFiles.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-[#40916C]/20 text-center py-16">
            <FolderKanban className="w-12 h-12 text-[#74C69D]/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white">No files found</h3>
            <p className="text-xs text-[#74C69D] mt-1 mb-6">No Agrifield files match your current search or category filter.</p>
            <button
              onClick={() => setIsGenerateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#40916C] text-white font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Generate New File</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFiles.map((file) => {
              const isJson = file.type === 'json';
              const isCsv = file.type === 'csv';
              const filePathStr = file.filePath || `${folderPath}\\${file.name}`;

              return (
                <div
                  key={file.id}
                  className="glass-panel p-6 rounded-2xl border border-[#40916C]/30 hover:border-[#B9FBC0]/60 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          isJson 
                            ? 'bg-[#1B4332] border-[#B9FBC0]/40 text-[#B9FBC0]' 
                            : isCsv 
                            ? 'bg-[#1B4332] border-[#FFB703]/40 text-[#FFB703]' 
                            : 'bg-[#1B4332] border-[#74C69D]/40 text-[#74C69D]'
                        }`}>
                          {isJson ? <FileCode className="w-5 h-5" /> : isCsv ? <FileSpreadsheet className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#081C15] border border-[#40916C]/40 text-[#74C69D]">
                            {file.category}
                          </span>
                          <h4 className="text-sm font-bold text-white truncate max-w-[180px] mt-1 group-hover:text-[#B9FBC0] transition-colors" title={file.name}>
                            {file.name}
                          </h4>
                        </div>
                      </div>

                      <span className="text-[10px] font-semibold text-[#B9FBC0] bg-[#1B4332]/80 px-2 py-0.5 rounded-full border border-[#B9FBC0]/20">
                        {file.confidence}
                      </span>
                    </div>

                    {/* File Path Card Display */}
                    <div className="mb-3 bg-[#081C15]/90 p-2.5 rounded-xl border border-[#40916C]/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FolderOpen className="w-3.5 h-3.5 text-[#B9FBC0] shrink-0" />
                        <span className="text-[11px] font-mono text-[#D8F3DC]/90 truncate" title={filePathStr}>
                          {filePathStr}
                        </span>
                      </div>
                      <button
                        onClick={() => copyPath(filePathStr, file.id)}
                        className="p-1 rounded hover:bg-[#1B4332] text-[#74C69D] hover:text-[#B9FBC0] shrink-0 cursor-pointer"
                        title="Copy File Location"
                      >
                        {copiedId === file.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Metadata pills */}
                    <div className="space-y-1.5 mb-6 text-xs text-[#D8F3DC]/80 bg-[#081C15]/50 p-3 rounded-xl border border-[#40916C]/20">
                      <div className="flex justify-between">
                        <span className="text-[#74C69D]">Crop Target:</span>
                        <span className="font-semibold text-white">{file.crop}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#74C69D]">Field / Plot:</span>
                        <span className="font-semibold text-white truncate max-w-[150px]">{file.field}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#74C69D]">Created / Size:</span>
                        <span className="font-semibold text-[#74C69D]">{file.date} ({file.size})</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#40916C]/20 gap-2">
                    <button
                      onClick={() => setPreviewFile(file)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#081C15] hover:bg-[#1B4332] text-[#74C69D] hover:text-white border border-[#40916C]/30 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => handleDownloadFile(file)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#40916C]/40 hover:bg-[#40916C] text-white text-xs font-semibold border border-[#40916C]/60 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save File</span>
                    </button>

                    <button
                      onClick={() => handleDeleteFile(file.id, file.name)}
                      className="p-2 rounded-xl bg-[#081C15] hover:bg-red-950/60 text-red-400 border border-red-900/30 text-xs transition-all cursor-pointer"
                      title="Delete File"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GENERATE NEW FILE MODAL */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-[#B9FBC0]/40 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsGenerateModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-[#74C69D] hover:text-white rounded-full bg-[#081C15] border border-[#40916C]/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-center text-[#B9FBC0]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">Generate File in File Manager</h3>
                <p className="text-xs text-[#74C69D]">Agrifield.ai Autonomous AI Report Compiler</p>
              </div>
            </div>

            {isGenerating ? (
              <div className="py-10 text-center space-y-5">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <Loader2 className="w-16 h-16 text-[#B9FBC0] animate-spin" />
                  <Zap className="w-6 h-6 text-[#B9FBC0] absolute" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Generating Agricultural File...</h4>
                  <p className="text-xs text-[#74C69D]">{genStep}</p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[#081C15] h-2.5 rounded-full overflow-hidden border border-[#40916C]/40">
                  <div 
                    className="bg-gradient-to-r from-[#40916C] via-[#52B788] to-[#B9FBC0] h-full transition-all duration-300" 
                    style={{ width: `${genProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#74C69D] mb-1.5">File Report Category</label>
                  <select
                    value={genCategory}
                    onChange={(e) => setGenCategory(e.target.value)}
                    className="w-full bg-[#081C15] border border-[#40916C]/40 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B9FBC0]"
                  >
                    <option value="Soil Health">Soil Health & Micro-Nutrient Analysis</option>
                    <option value="Diagnostics">Crop Disease & Pathogen Diagnostic Log</option>
                    <option value="Irrigation">Smart Irrigation & Moisture Schedule</option>
                    <option value="Drone Scans">Multispectral Drone Canopy Scan</option>
                    <option value="Action Plans">AI Master Farm Action Plan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#74C69D] mb-1.5">Target Crop</label>
                    <select
                      value={genCrop}
                      onChange={(e) => setGenCrop(e.target.value)}
                      className="w-full bg-[#081C15] border border-[#40916C]/40 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B9FBC0]"
                    >
                      <option value="Wheat">Wheat</option>
                      <option value="Rice">Rice</option>
                      <option value="Cotton">Cotton</option>
                      <option value="Corn">Corn</option>
                      <option value="Soybean">Soybean</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Sugarcane">Sugarcane</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#74C69D] mb-1.5">Export File Format</label>
                    <select
                      value={genFormat}
                      onChange={(e) => setGenFormat(e.target.value)}
                      className="w-full bg-[#081C15] border border-[#40916C]/40 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B9FBC0]"
                    >
                      <option value="json">JSON (.json data format)</option>
                      <option value="csv">CSV (.csv tabular format)</option>
                      <option value="txt">Text / Markdown (.txt)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#74C69D] mb-1.5">Field / Sector Location</label>
                  <input
                    type="text"
                    value={genField}
                    onChange={(e) => setGenField(e.target.value)}
                    placeholder="e.g. North Parcel - Field 4"
                    className="w-full bg-[#081C15] border border-[#40916C]/40 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#B9FBC0]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setIsGenerateModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-[#081C15] text-[#74C69D] font-bold text-xs hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleGenerateFile}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#40916C] to-[#52B788] hover:from-[#52B788] hover:to-[#74C69D] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#40916C]/40 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#B9FBC0]" />
                    <span>Compile & Save File</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FILE PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-2xl max-h-[85vh] p-6 sm:p-8 rounded-3xl border border-[#B9FBC0]/40 shadow-2xl flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#40916C]/30 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1B4332] border border-[#B9FBC0]/40 flex items-center justify-center text-[#B9FBC0]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-sm">{previewFile.name}</h3>
                  <p className="text-xs text-[#74C69D]">{previewFile.category} • {previewFile.size} • {previewFile.date}</p>
                </div>
              </div>

              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 text-[#74C69D] hover:text-white rounded-full bg-[#081C15] border border-[#40916C]/40"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Display File Path inside Modal */}
            <div className="mb-3 bg-[#081C15] p-3 rounded-xl border border-[#40916C]/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <FolderOpen className="w-4 h-4 text-[#B9FBC0] shrink-0" />
                <span className="text-xs font-mono text-[#B9FBC0] truncate">
                  {previewFile.filePath || `${folderPath}\\${previewFile.name}`}
                </span>
              </div>
              <button
                onClick={() => copyPath(previewFile.filePath || `${folderPath}\\${previewFile.name}`, 'modal')}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B4332] text-[#B9FBC0] text-xs font-semibold hover:bg-[#2D6A4F] shrink-0 cursor-pointer"
              >
                {copiedId === 'modal' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'modal' ? 'Copied!' : 'Copy Path'}</span>
              </button>
            </div>

            {/* Content Display */}
            <div className="flex-1 overflow-y-auto bg-[#081C15] p-4 rounded-xl border border-[#40916C]/30 font-mono text-xs text-[#D8F3DC] whitespace-pre-wrap selection:bg-[#40916C]">
              {previewFile.content}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#40916C]/30">
              <span className="text-xs text-[#74C69D]">Agrifield.ai AI Model Confidence: <strong className="text-[#B9FBC0]">{previewFile.confidence}</strong></span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewFile(null)}
                  className="px-4 py-2 rounded-xl bg-[#081C15] text-[#74C69D] text-xs font-semibold hover:text-white"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDownloadFile(previewFile)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#40916C] text-white text-xs font-bold shadow-md hover:bg-[#52B788] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
