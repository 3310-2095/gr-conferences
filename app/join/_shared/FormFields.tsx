"use client";

// Shared field building blocks for the "Join Us" application forms
// (app/join/speaker, chair, advisory, reviewer, partner, conference).

export function SectionHeader({ id, label, hint }: { id: string; label: string; hint?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
      <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">{id}</span>
      <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">{label}</h3>
      {hint && <span className="text-xs text-gray-400 font-normal ml-1">({hint})</span>}
    </div>
  );
}

export function Field({ label, required, optional, hint, children }: {
  label: string; required?: boolean; optional?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-[#1A1A2E] flex items-center gap-1.5">
        {label}
        {required && <span className="text-primary text-lg leading-none">*</span>}
        {optional && <span className="text-gray-400 text-xs font-medium ml-1 bg-gray-100 px-2 py-0.5 rounded-xl">(Optional)</span>}
      </label>
      {hint && <p className="text-xs text-gray-500 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

export function Input({ name, value, onChange, placeholder, type = "text", required }: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <input name={name} value={value} onChange={onChange} type={type}
      placeholder={placeholder} required={required}
      className="w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-3.5 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 shadow-sm hover:border-gray-300 font-medium text-sm" />
  );
}

export function Select({ name, value, onChange, options, placeholder, required }: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="relative">
      <select name={name} value={value} onChange={onChange} required={required}
        className={`w-full bg-[#FAFAFC] border border-gray-200 rounded-sm px-5 py-3.5 outline-none transition-all duration-300 hover:border-gray-300 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer shadow-sm font-medium text-sm ${value ? "text-[#1A1A2E]" : "text-gray-400"}`}>
        <option value="" disabled>{placeholder ?? "Select…"}</option>
        {options.map(o => <option key={o} value={o} className="text-[#1A1A2E]">{o}</option>)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={value ? "text-primary" : "text-gray-400"}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  );
}
