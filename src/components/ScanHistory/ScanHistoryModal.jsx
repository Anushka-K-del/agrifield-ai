import React, { useState } from 'react';
import { X, Calendar, Activity, Volume2, Trash2, Shield, AlertTriangle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ScanHistoryModal() {
  const { isScanHistoryOpen, closeScanHistory, scanHistory, deleteScan, clearScanHistory } = useAuth();
  const [activeVoiceId, setActiveVoiceId] = useState(null);

  if (!isScanHistoryOpen) return null;

  const playVoice = (text, id) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (activeVoiceId === id) {
        setActiveVoiceId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.onend = () => setActiveVoiceId(null);
      utterance.onerror = () => setActiveVoiceId(null);
      window.speechSynthesis.speak(utterance);
      setActiveVoiceId(id);
    } else {
      alert('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#081C15]/95 border border-[#40916C]/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#40916C]/30 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#40916C]/15 blur-[80px] rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#40916C]/30">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1B4332] text-[#B9FBC0] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Farmer Field Records</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">My Scan History</h3>
            <p className="text-xs text-[#74C69D]">Past diagnostic assessments, pathogen findings, and dosage prescriptions.</p>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              closeScanHistory();
            }}
            className="p-2 rounded-full bg-[#1B4332]/60 hover:bg-[#1B4332] text-[#74C69D] hover:text-white border border-[#40916C]/30 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scan History Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          {scanHistory.length === 0 ? (
            <div className="py-16 text-center">
              <Activity className="w-12 h-12 text-[#74C69D]/40 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">No scans in your history yet</h4>
              <p className="text-xs text-[#74C69D] max-w-sm mx-auto mt-1 mb-6">
                Upload a crop leaf photograph in the interactive demo section to analyze disease symptoms and save your first scan.
              </p>
              <button
                onClick={() => {
                  closeScanHistory();
                  const el = document.getElementById('demo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#40916C] to-[#52B788] text-white font-bold text-xs shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Try Demo Scan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            scanHistory.map((scan) => {
              const isHealthy = scan.disease?.toLowerCase().includes('healthy');
              const isSpeaking = activeVoiceId === scan.id;

              return (
                <div
                  key={scan.id}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-[#40916C]/30 hover:border-[#B9FBC0]/50 transition-all bg-[#081C15]/70 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${
                        isHealthy
                          ? 'bg-[#1B4332] border-[#B9FBC0]/40 text-[#B9FBC0]'
                          : 'bg-[#1B4332] border-amber-500/40 text-amber-400'
                      }`}>
                        {isHealthy ? '🌱' : '🍂'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{scan.crop}</span>
                          <span className="text-[10px] text-[#74C69D] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(scan.timestamp).toLocaleDateString('en-IN', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <h4 className="text-sm font-extrabold text-[#B9FBC0] mt-0.5">
                          {scan.disease}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-extrabold px-2.5 py-1 rounded-full bg-[#1B4332] border border-[#B9FBC0]/30 text-[#B9FBC0]">
                        {scan.confidence}% Acc
                      </span>
                      <button
                        onClick={() => deleteScan(scan.id)}
                        className="p-1.5 text-[#74C69D] hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#081C15]/80 p-3 rounded-xl border border-[#40916C]/20">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#74C69D] block mb-0.5">
                        🌿 Organic Protocol:
                      </span>
                      <p className="text-white/90 leading-relaxed text-[11px]">{scan.remedyOrganic}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#74C69D] block mb-0.5">
                        🧪 Chemical Dosage:
                      </span>
                      <p className="text-white/90 leading-relaxed text-[11px]">{scan.remedyChemical}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#74C69D]">
                      Severity: <strong className="text-white">{scan.severity}</strong>
                    </span>
                    <button
                      onClick={() => playVoice(scan.voiceText || `${scan.crop} ${scan.disease}. ${scan.remedyOrganic}`, scan.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-[#B9FBC0] text-[#081C15] animate-pulse'
                          : 'bg-[#1B4332] hover:bg-[#2D6A4F] text-[#B9FBC0] border border-[#B9FBC0]/30'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Stop Audio' : 'Play Voice Advice'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {scanHistory.length > 0 && (
          <div className="pt-3 border-t border-[#40916C]/30 flex items-center justify-between">
            <span className="text-xs text-[#74C69D]">
              Total Records: <strong>{scanHistory.length} Scans</strong>
            </span>
            <button
              onClick={() => {
                if (window.confirm('Clear all your scan history?')) {
                  clearScanHistory();
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 font-semibold cursor-pointer"
            >
              Clear All Records
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
