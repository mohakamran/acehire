
import React from 'react';
import { EvaluationReport as ReportType } from '../types';

interface EvaluationReportProps {
  report: ReportType;
  onRestart: () => void;
}

export const EvaluationReport: React.FC<EvaluationReportProps> = ({ report, onRestart }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-500';
    if (score >= 5) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getRecommendationStyle = (rec: string) => {
    switch(rec) {
      case 'Strong Hire': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Hire': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Borderline': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'No Hire': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-full w-full py-12 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {/* Header Summary */}
        <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50 rounded-full -mr-40 -mt-40 blur-3xl opacity-50"></div>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                Post-Interview Internal Report
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Technical Assessment</h1>
              <p className="text-lg text-slate-500 font-medium">
                {report.profile.specialization} • {report.profile.level} Candidate
              </p>
            </div>
            
            <div className="flex items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="text-center">
                <div className={`text-6xl font-black ${getScoreColor(report.score)}`}>{report.score}<span className="text-xl text-slate-300 font-light">/10</span></div>
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-2">Overall Quality</div>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className={`px-5 py-3 rounded-xl border-2 text-xs font-black uppercase tracking-widest ${getRecommendationStyle(report.recommendation)}`}>
                {report.recommendation}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Strengths */}
            <div className="space-y-5">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Key Strengths
              </h3>
              <div className="space-y-3">
                {report.technicalCompetency.strengths.map((s, i) => (
                  <div key={i} className="flex gap-3 text-slate-600 text-sm font-medium bg-slate-50 p-3 rounded-lg">
                    <span className="text-emerald-500 font-black">•</span> {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="space-y-5">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-rose-500 flex items-center justify-center">
                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                Critical Gaps
              </h3>
              <div className="space-y-3">
                {report.technicalCompetency.weaknesses.map((w, i) => (
                  <div key={i} className="flex gap-3 text-slate-600 text-sm font-medium bg-slate-50 p-3 rounded-lg">
                    <span className="text-rose-500 font-black">•</span> {w}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Behavioral Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-4 shadow-xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Depth</h4>
            <div className="flex gap-1.5 h-3">
              {['Low', 'Medium', 'High'].map(d => (
                <div key={d} className={`flex-1 rounded-full transition-all duration-700 ${
                  report.technicalCompetency.depth === d 
                  ? (d === 'High' ? 'bg-emerald-500 shadow-lg shadow-emerald-200' : d === 'Medium' ? 'bg-amber-500 shadow-lg shadow-amber-200' : 'bg-rose-500 shadow-lg shadow-rose-200')
                  : 'bg-slate-100'
                }`}></div>
              ))}
            </div>
            <p className="text-slate-900 font-bold">{report.technicalCompetency.depth} Proficiency</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 col-span-2 shadow-xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Risk Factors & Red Flags</h4>
            <div className="flex flex-wrap gap-3">
              {report.redFlags.length > 0 ? report.redFlags.map((flag, i) => (
                <span key={i} className="bg-rose-50 text-rose-600 border border-rose-100 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight">
                  {flag}
                </span>
              )) : (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   No significant behavioral risks detected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Narrative */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="space-y-3">
              <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Logic & Problem Solving</label>
              <p className="text-slate-700 text-md leading-relaxed font-medium">{report.problemSolving}</p>
            </section>
            <section className="space-y-3">
              <label className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Clarity & Communication</label>
              <p className="text-slate-700 text-md leading-relaxed font-medium">{report.communication}</p>
            </section>
          </div>

          <div className="pt-10 border-t border-slate-100">
            <div className="bg-slate-900 rounded-[2rem] p-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Hiring Manager Suggestions
               </h3>
               <p className="text-indigo-100 text-lg italic leading-relaxed font-medium opacity-90">
                 "{report.suggestions}"
               </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 pt-10 pb-20">
          <button
            onClick={onRestart}
            className="group relative bg-slate-900 hover:bg-slate-800 text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-3">
              START NEW SESSION
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">AceHire Technical Evaluation Platform v3.1</p>
        </div>
      </div>
    </div>
  );
};
