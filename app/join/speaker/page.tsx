"use client";
import { useState, useEffect, useRef } from "react";
import { TITLES, PRONOUNS, DEGREES, SPEAKER_ROLES, CONFERENCES, COUNTRIES } from "../../lib/formData";
import { Field, Input, Select } from "../_shared/FormFields";

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

type F = {
  title: string; firstName: string; middleName: string; lastName: string;
  pronouns: string; designation: string; country: string;
  email: string; institutionalEmail: string; contactNumber: string;
  degree: string; affiliation: string; academicProfile: string;
  yearsOfExperience: string; publications: string; briefProfile: string; researchArea: string;
  conference: string; speakerRole: string;
  cv: File | null; additionalFiles: File | null;
};

const EMPTY: F = {
  title: "", firstName: "", middleName: "", lastName: "",
  pronouns: "", designation: "", country: "",
  email: "", institutionalEmail: "", contactNumber: "",
  degree: "", affiliation: "", academicProfile: "",
  yearsOfExperience: "", publications: "", briefProfile: "", researchArea: "",
  conference: "", speakerRole: "",
  cv: null, additionalFiles: null,
};

export default function SpeakerPage() {
  const [form, setForm] = useState<F>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const setFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm(p => ({ ...p, [e.target.name]: file }));
  };

  const handleBriefProfile = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    const words = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
    if (words <= 100) {
      setWordCount(words);
      setForm(p => ({ ...p, briefProfile: val }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network delay for nice effect
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="bg-[#FAFAFC] min-h-[80vh] flex items-center justify-center section-padding relative overflow-hidden">
        
        <div className="max-w-md w-full p-10 md:p-14 bg-white/80 backdrop-blur-2xl border border-white/40 rounded-xl text-center relative z-10 animate-fade-up shadow-[0_20px_60px_-15px_rgba(82,3,128,0.1)] overflow-hidden">
          {/* Soft Purple Ambient Background Effects moved inside */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[80px] rounded-full z-0 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 relative shadow-inner">
              <div className="absolute inset-0 rounded-xl animate-glow-pulse opacity-50"></div>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Application Received</p>
            <h2 className="text-4xl font-heading text-[#1A1A2E] mb-5">Thank You!</h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Your speaker application has been submitted successfully. Our team will review your profile and respond within 5–7 business days.
            </p>
            <a href="/" className="inline-flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-xl shadow-[0_8px_20px_rgba(82,3,128,0.25)] transition-all hover:-translate-y-1 text-sm tracking-wide uppercase">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#fff] overflow-hidden text-[#1A1A2E]">
      
      {/* Subtle dotted pattern overlay for texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #520380 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

      <div className="container-custom pt-32 pb-24 relative z-10">

        {/* SINGLE Form Container Box */}
        <div className="max-w-[1000px] mx-auto">
          <form onSubmit={handleSubmit} noValidate
            style={{ opacity: 0, animation: 'pageEntry 0.6s ease 0.05s forwards' }}>
            
            <div className="bg-white/80 backdrop-blur-2xl border border-white/80 rounded-xl shadow-[0_20px_60px_-15px_rgba(82,3,128,0.08)] relative overflow-hidden group">
              
              {/* Top Gradient Moving Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 overflow-hidden z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-[#C084FC] to-primary opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-line-sweep" />
              </div>

              {/* Form Header */}
              <div className="relative px-8 md:px-14 pt-14 pb-10 border-b border-gray-100 bg-white/40 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/15 to-[#C084FC]/10 blur-[100px] rounded-full z-0 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[80px] rounded-full z-0 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>
                <div className="relative z-10" style={{ opacity: 0, animation: 'slideUp 0.55s ease 0.2s forwards' }}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-medium text-[#1A1A2E] mb-6 leading-tight">
                    Speaker <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#8A2BE2]">Application</span>
                  </h1>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                    Please complete all required fields below to register your profile. Your information will be used to review your application and communicate conference details.
                  </p>
                </div>
              </div>
              
              <div className="p-8 md:p-14 space-y-12 relative z-10 bg-white/60">

                {/* Section A — Personal Details */}
                <RevealSection delay={0}>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">A</span>
                    <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">Personal Details</h3>
                  </div>

                  {/* Row 1: Title + First Name | Middle Name + Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                    <div className="grid grid-cols-3 gap-x-4">
                      <div className="col-span-1">
                        <Field label="Title" required>
                          <Select name="title" value={form.title} onChange={set} options={TITLES} placeholder="Title" required />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="First Name" required>
                          <Input name="firstName" value={form.firstName} onChange={set} placeholder="First name" required />
                        </Field>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4">
                      <Field label="Middle Name" optional>
                        <Input name="middleName" value={form.middleName} onChange={set} placeholder="Middle" />
                      </Field>
                      <Field label="Last Name" required>
                        <Input name="lastName" value={form.lastName} onChange={set} placeholder="Last name" required />
                      </Field>
                    </div>
                  </div>

                  {/* Row 2: Pronouns + Designation + Country — 3 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5 mb-5">
                    <Field label="Preferred Pronouns" optional>
                      <Select name="pronouns" value={form.pronouns} onChange={set} options={PRONOUNS} placeholder="Select pronouns" />
                    </Field>
                    <Field label="Designation" required>
                      <Input name="designation" value={form.designation} onChange={set} placeholder="e.g. Associate Professor" required />
                    </Field>
                    <Field label="Country" required>
                      <Select name="country" value={form.country} onChange={set} options={COUNTRIES} placeholder="Select country" required />
                    </Field>
                  </div>

                  {/* Row 3: Email + Institutional Email + Contact — 3 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5">
                    <Field label="Email ID" required>
                      <Input name="email" value={form.email} onChange={set} type="email" placeholder="you@example.com" required />
                    </Field>
                    <Field label="Institutional Email" optional>
                      <Input name="institutionalEmail" value={form.institutionalEmail} onChange={set} type="email" placeholder="you@university.edu" />
                    </Field>
                    <Field label="Contact Number" optional>
                      <Input name="contactNumber" value={form.contactNumber} onChange={set} type="tel" placeholder="+1 234 567 8900" />
                    </Field>
                  </div>
                </RevealSection>

                {/* Section B — Academic Profile */}
                <RevealSection delay={0.08}>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">B</span>
                    <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">Academic Profile</h3>
                  </div>

                  {/* Row 1: Degree + Affiliation — 2 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5 mb-5">
                    <Field label="Highest Degree" required>
                      <Select name="degree" value={form.degree} onChange={set} options={DEGREES} placeholder="Select degree" required />
                    </Field>
                    <Field label="Current Affiliation / Institution" required>
                      <Input name="affiliation" value={form.affiliation} onChange={set} placeholder="e.g. University of Cambridge" required />
                    </Field>
                  </div>

                  {/* Row 2: Academic Profile + Years Exp + Publications + Research Area — 4 cols */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-5 mb-5">
                    <div className="md:col-span-2">
                      <Field label="Academic Profile URL" optional>
                        <Input name="academicProfile" value={form.academicProfile} onChange={set} type="url" placeholder="Google Scholar / ORCID / ResearchGate" />
                      </Field>
                    </div>
                    <Field label="Years of Experience" optional>
                      <Input name="yearsOfExperience" value={form.yearsOfExperience} onChange={set} type="number" placeholder="e.g. 10" />
                    </Field>
                    <Field label="No. of Publications" optional>
                      <Input name="publications" value={form.publications} onChange={set} type="number" placeholder="e.g. 25" />
                    </Field>
                  </div>

                  {/* Row 3: Research Area — full width */}
                  <div className="grid grid-cols-1 mb-5">
                    <Field label="Research Area / Expertise" optional>
                      <Input name="researchArea" value={form.researchArea} onChange={set} placeholder="e.g. Machine Learning, Bioinformatics, Renewable Energy" />
                    </Field>
                  </div>

                  {/* Row 4: Brief Profile — full width textarea */}
                  <div>
                    <Field label="Brief Profile" required hint="Max 100 words · Write in third person · Will appear on conference programme">
                      <div className="relative">
                        <textarea
                          name="briefProfile"
                          value={form.briefProfile}
                          onChange={handleBriefProfile}
                          rows={4}
                          placeholder="Write a short professional bio in third person..."
                          className="w-full bg-[#FAFAFC] border border-gray-200 rounded-lg px-5 py-4 text-[#1A1A2E] placeholder:text-gray-400 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 resize-none shadow-sm hover:border-gray-300 text-sm"
                          required
                        />
                        <div className={`absolute bottom-3 right-3 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-white shadow-sm border border-gray-100 ${wordCount >= 95 ? 'text-red-500' : 'text-gray-400'}`}>
                          {wordCount} / 100
                        </div>
                      </div>
                    </Field>
                  </div>
                </RevealSection>

                {/* Section C — Conference Preference */}
                <RevealSection delay={0.08}>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">C</span>
                    <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">Conference Preference</h3>
                  </div>

                  {/* Conference full-width, role 1/3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-5">
                    <div className="md:col-span-2">
                      <Field label="Preferred Conference" required>
                        <Select name="conference" value={form.conference} onChange={set} options={CONFERENCES} placeholder="Choose a conference" required />
                      </Field>
                    </div>
                    <Field label="Preferred Speaker Role" optional>
                      <Select name="speakerRole" value={form.speakerRole} onChange={set} options={SPEAKER_ROLES} placeholder="Select role" />
                    </Field>
                  </div>
                </RevealSection>

                {/* Section D — Upload Documents */}
                <RevealSection delay={0.08}>
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/15">D</span>
                    <h3 className="text-sm font-bold text-[#1A1A2E] uppercase tracking-[0.1em]">Upload Documents</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field label="CV / Resume" required hint="PDF or DOC · Max 10 MB">
                      <label className="flex items-center gap-4 w-full px-5 py-4 bg-[#FAFAFC] border border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/[0.02] transition-all duration-300 group/upload">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover/upload:bg-primary group-hover/upload:border-primary transition-colors duration-300">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover/upload:text-white transition-colors duration-300">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A2E] group-hover/upload:text-primary transition-colors truncate">
                            {form.cv ? form.cv.name : "Click to upload CV / Resume"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, DOCX · Max 10 MB</p>
                        </div>
                        <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full flex-shrink-0">Required</span>
                        <input type="file" name="cv" accept=".pdf,.doc,.docx" onChange={setFile} className="hidden" required />
                      </label>
                    </Field>

                    <Field label="Additional Files" optional hint="Certifications, past presentations, etc.">
                      <label className="flex items-center gap-4 w-full px-5 py-4 bg-[#FAFAFC] border border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/[0.02] transition-all duration-300 group/upload">
                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover/upload:bg-primary group-hover/upload:border-primary transition-colors duration-300">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover/upload:text-white transition-colors duration-300">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A2E] group-hover/upload:text-primary transition-colors truncate">
                            {form.additionalFiles ? form.additionalFiles.name : "Click to upload additional files"}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, PPT · Max 10 MB</p>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full flex-shrink-0">Optional</span>
                        <input type="file" name="additionalFiles" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={setFile} className="hidden" />
                      </label>
                    </Field>
                  </div>
                </RevealSection>

              </div>

              {/* Submit Section Footer */}
              <div className="px-8 md:px-14 py-8 bg-gray-50/80 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md">
                <div className="flex items-start gap-3 text-sm text-gray-500 max-w-md">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5 opacity-70">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <p>
                    Fields marked with <span className="text-primary font-bold">*</span> are required. Your data is handled securely and in accordance with our privacy policy.
                  </p>
                </div>
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-10 md:px-12 py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold tracking-[0.15em] uppercase rounded-xl shadow-[0_10px_25px_-5px_rgba(82,3,128,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(82,3,128,0.5)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex-shrink-0"
                  disabled={isSubmitting}
                >
                  {/* Button highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>

                  <span className={`flex items-center justify-center gap-3 transition-transform duration-300 ${isSubmitting ? '-translate-y-16' : 'translate-y-0'}`}>
                    Submit Application
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                  <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isSubmitting ? 'translate-y-0' : 'translate-y-16'}`}>
                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes pageEntry { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revealUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lineSweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .animate-line-sweep { animation: lineSweep 2.4s ease-in-out infinite; }
      `}} />
    </div>
  );
}

/* ── RevealSection ── */
function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

