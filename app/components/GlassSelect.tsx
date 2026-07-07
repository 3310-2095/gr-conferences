"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";

export type GlassSelectOption = { label: string; value: string };

export default function GlassSelect({
  value,
  onChange,
  options,
  placeholder,
  allowClear = true,
}: {
  value: string;
  onChange: (val: string) => void;
  options: GlassSelectOption[];
  placeholder: string;
  /** Set false for a field selector that must always have a value (no "clear" entry). */
  allowClear?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isActive = !!value;

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  // Close on window resize only (not scroll — scroll inside dropdown list would close it)
  useEffect(() => {
    if (!isOpen) return;
    function onResize() { setIsOpen(false); }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  function toggle() {
    if (isOpen) { setIsOpen(false); return; }
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dropH = 260;
    const top = window.innerHeight - rect.bottom >= dropH
      ? rect.bottom + 6
      : rect.top - dropH - 6;
    setCoords({ top, left: rect.left, width: rect.width });
    setIsOpen(true);
  }

  return (
    <div className="relative shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className={`flex items-center gap-2 pl-4 pr-9 py-2.5 rounded-2xl border text-[13px] font-semibold outline-none cursor-pointer transition-all whitespace-nowrap ${
          isActive
            ? "bg-[#520380] border-[#520380] text-white shadow-[0_4px_14px_rgba(82,3,128,0.22)]"
            : "bg-white border-gray-200 text-gray-700 hover:border-[#520380]/40 hover:text-[#520380]"
        }`}
      >
        {value ? (options.find(o => o.value === value)?.label ?? value) : placeholder}
      </button>
      <HiChevronDown
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform ${
          isActive ? "text-white/80" : "text-gray-400"
        } ${isOpen ? "rotate-180" : ""}`}
        size={14}
      />

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isOpen && coords && (
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: coords.top,
                left: coords.left,
                minWidth: Math.max(coords.width, 160),
                zIndex: 9999,
              }}
              className="w-max max-w-[320px] bg-white rounded-2xl border border-gray-100 shadow-[0_16px_48px_rgba(82,3,128,0.16)]"
            >
              <div
                className="max-h-[240px] overflow-y-auto flex flex-col p-1.5 gap-0.5"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(82,3,128,0.2) transparent" }}
              >
                {allowClear && (
                  <button
                    type="button"
                    onClick={() => { onChange(""); setIsOpen(false); }}
                    className={`text-left px-3 py-2.5 text-[13px] rounded-xl transition-colors ${
                      !value ? "bg-[#f3e8ff] text-[#520380] font-bold" : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {placeholder}
                  </button>
                )}
                {options.map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                    className={`text-left px-3 py-2.5 text-[13px] rounded-xl transition-colors ${
                      value === opt.value
                        ? "bg-[#520380] text-white font-bold"
                        : "text-gray-800 hover:bg-[#f3e8ff] hover:text-[#520380]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
