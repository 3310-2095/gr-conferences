"use client";
import { motion, AnimatePresence } from "framer-motion";

interface TooltipProps {
  city: string;
  country: string;
  visible: boolean;
}

export default function Tooltip({ city, country, visible }: TooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 8 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
        >
          <div className="bg-white rounded-2xl border border-gray-100 px-4 py-2.5 whitespace-nowrap"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)" }}>
            <p className="text-gray-900 font-bold text-sm leading-none mb-1">{city}</p>
            <p className="text-gray-500 text-xs font-medium">{country}</p>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid white",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
