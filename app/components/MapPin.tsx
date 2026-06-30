"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Tooltip from "./Tooltip";

export interface PinData {
  city: string;
  country: string;
  left: string;
  top: string;
}

interface MapPinProps extends PinData {
  delay: number;
  visible: boolean;
}

export default function MapPin({ city, country, left, top, delay, visible }: MapPinProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute" style={{ left, top }}>
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: 28, height: 28, marginLeft: -14, marginTop: -14 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={
          visible
            ? { type: "spring", stiffness: 420, damping: 20, delay }
            : { duration: 0.15, delay: 0 }
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Outermost pulse ring */}
        <motion.span
          className="absolute rounded-full"
          style={{ width: 28, height: 28, background: "rgba(167,139,250,0.18)" }}
          animate={visible ? { scale: [1, 2.4], opacity: [0.8, 0] } : false}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
        />

        {/* Inner pulse ring */}
        <motion.span
          className="absolute rounded-full"
          style={{ width: 16, height: 16, background: "rgba(167,139,250,0.32)" }}
          animate={visible ? { scale: [1, 2], opacity: [1, 0] } : false}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.35, repeatDelay: 0.4 }}
        />

        {/* Pin dot */}
        <div
          className="relative z-10 rounded-full cursor-pointer"
          style={{
            width: 10,
            height: 10,
            background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
            border: "2px solid white",
            boxShadow: "0 2px 10px rgba(124,58,237,0.65), 0 0 0 1px rgba(124,58,237,0.3)",
          }}
        />

        {/* Tooltip */}
        <Tooltip city={city} country={country} visible={hovered} />
      </motion.div>
    </div>
  );
}
