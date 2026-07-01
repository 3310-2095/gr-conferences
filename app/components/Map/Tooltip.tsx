"use client";
import { motion, AnimatePresence } from "framer-motion";

interface MapTooltipProps {
  cities: string[];
  visible: boolean;
  direction?: "up" | "down";
}

const CARD_BG = "rgba(8, 3, 18, 0.92)";

export default function MapTooltip({
  cities,
  visible,
  direction = "up",
}: MapTooltipProps) {
  const isDown = direction === "down";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: isDown ? -8 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: isDown ? -8 : 10 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={
            isDown
              ? "absolute top-full left-1/2 -translate-x-1/2 mt-3 z-200 pointer-events-none"
              : "absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-200 pointer-events-none"
          }
          style={{ filter: "drop-shadow(0 12px 32px rgba(82,3,128,0.45))" }}
        >
          {/* Up-pointing arrow — card is BELOW the pin */}
          {isDown && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderBottom: `7px solid ${CARD_BG}`,
                margin: "0 auto",
                marginBottom: -1,
              }}
            />
          )}

          {/* City name card */}
          <div
            style={{
              background: CARD_BG,
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* Top gradient accent */}
            <div
              style={{
                height: 3,
                background:
                  "linear-gradient(90deg, #7c3aed 0%, #c084fc 50%, #7c3aed 100%)",
              }}
            />
            <div style={{ padding: "9px 13px 10px" }}>
              {cities.map((city, i) => (
                <p
                  key={city}
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: 13,
                    lineHeight: 1,
                    margin: i === 0 ? 0 : "6px 0 0",
                    whiteSpace: "nowrap",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {city}
                </p>
              ))}
            </div>
          </div>

          {/* Down-pointing arrow — card is ABOVE the pin */}
          {!isDown && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderTop: `7px solid ${CARD_BG}`,
                margin: "0 auto",
                marginTop: -1,
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
