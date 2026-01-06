
import React, { useState } from 'react';
import { FIELDS, LEVELS, ASSESSMENT_RULES } from '../constants';
import { CandidateProfile } from '../types';

interface SetupFormProps {
  onComplete: (profile: CandidateProfile) => void;
}

export const SetupForm: React.FC<SetupFormProps> = ({ onComplete }) => {
  const [field, setField] = useState(FIELDS[0].name);
  const [specialization, setSpecialization] = useState(FIELDS[0].specializations[0]);
  const [level, setLevel] = useState<CandidateProfile['level']>('Junior');
  const [rulesAccepted, setRulesAccepted] = useState(false);

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedField = e.target.value;
    setField(selectedField);
    const found = FIELDS.find(f => f.name === selectedField);
    if (found) setSpecialization(found.specializations[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rulesAccepted) return;
    onComplete({ field, specialization, level });
  };

  const currentFieldData = FIELDS.find(f => f.name === field);

  return (
    <div className="max-w-xl w-full flex flex-col gap-6">
      <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Secured Session
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">AceHire Pro Assessment</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Authentic Human Intelligence Verification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Industry</label>
              <select
                value={field}
                onChange={handleFieldChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
              >
                {FIELDS.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
              >
                {currentFieldData?.specializations.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l as any)}
                  className={`py-2 rounded-xl text-xs font-black transition-all border ${
                    level === l ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              Assessment Protocols
            </h3>
            <ul className="space-y-2">
              {ASSESSMENT_RULES.map((rule, i) => (
                <li key={i} className="text-[11px] text-slate-600 font-medium flex gap-2">
                  <span className="text-amber-600 font-black">!</span> {rule}
                </li>
              ))}
            </ul>
            <label className="flex items-center gap-3 pt-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rulesAccepted}
                onChange={(e) => setRulesAccepted(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
              />
              <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900">I acknowledge these rules and understand that violation leads to immediate rejection.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!rulesAccepted}
            className={`w-full font-black py-4 rounded-2xl transition-all shadow-xl active:scale-[0.98] ${
              rulesAccepted ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
            }`}
          >
            CONFIRM & START ASSESSMENT
          </button>
        </form>
      </div>
    </div>
  );
};
