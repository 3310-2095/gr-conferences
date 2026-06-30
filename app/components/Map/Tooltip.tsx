"use client";
import { motion, AnimatePresence } from "framer-motion";

interface MapTooltipProps {
  city: string;
  country: string;
  lat: number;
  lng: number;
  visible: boolean;
  /** "up" = card above pin (default); "down" = card below pin (for high-latitude pins near map top edge) */
  direction?: "up" | "down";
}

function fmtLat(v: number) {
  return `${Math.abs(v).toFixed(2)}° ${v >= 0 ? "N" : "S"}`;
}
function fmtLng(v: number) {
  return `${Math.abs(v).toFixed(2)}° ${v >= 0 ? "E" : "W"}`;
}

const CARD_BG = "rgba(8, 3, 18, 0.92)";

export default function MapTooltip({
  city,
  country,
  lat,
  lng,
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
          style={{ filter: "drop-shadow(0 16px 48px rgba(82,3,128,0.5))" }}
        >
          {/* Up-pointing arrow — only when card is BELOW the pin */}
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

          {/* Dark glass card */}
          <div
            style={{
              background: CARD_BG,
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              borderRadius: 14,
              minWidth: 152,
              overflow: "hidden",
            }}
          >
            {/* Top gradient accent bar */}
            <div
              style={{
                height: 3,
                background:
                  "linear-gradient(90deg, #7c3aed 0%, #c084fc 45%, #a855f7 75%, #7c3aed 100%)",
              }}
            />

            {/* Body */}
            <div style={{ padding: "11px 15px 12px" }}>
              <p
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1.2,
                  margin: 0,
                  marginBottom: 3,
                  letterSpacing: "-0.015em",
                  whiteSpace: "nowrap",
                }}
              >
                {city}
              </p>

              <p
                style={{
                  color: "#c084fc",
                  fontWeight: 500,
                  fontSize: 11,
                  margin: 0,
                  marginBottom: 9,
                  letterSpacing: "0.025em",
                  whiteSpace: "nowrap",
                }}
              >
                {country}
              </p>

              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.07)",
                  marginBottom: 9,
                }}
              />

              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "ui-monospace, 'Courier New', monospace",
                  fontSize: 9.5,
                  margin: 0,
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}
              >
                {fmtLat(lat)} · {fmtLng(lng)}
              </p>
            </div>
          </div>

          {/* Down-pointing arrow — only when card is ABOVE the pin */}
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
