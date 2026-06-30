"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Marker } from "react-simple-maps";
import MapTooltip from "./Tooltip";
import { destinations, type Destination } from "./destinations";

interface MapPinsProps {
  visibleCount: number;
}

interface SinglePinProps {
  destination: Destination;
  index: number;
  visible: boolean;
}

/*
  foreignObject geometry (SVG units ≈ screen px at natural zoom):
    x={-13} y={-30} width={26} height={36}

  Anchor [lng, lat] → SVG origin (0, 0):
    div-x = 13  (horizontal center of 26px div ✓)
    div-y = 30  (pin is 22×28; top-pad=2 → tip at 2+28=30 = anchor ✓)
    Shadow occupies div y=30–36 (6 px below anchor)

  Tooltip overflows above via `bottom-full` (pointer-events-none).
*/
function SinglePin({ destination, index, visible }: SinglePinProps) {
  const [hovered, setHovered] = useState(false);
  const { city, country, lat, lng } = destination;
  const gradId = `pg-${index}`;

  return (
    <Marker coordinates={[lng, lat]}>
      <foreignObject
        x={-13}
        y={-30}
        width={26}
        height={36}
        style={{ overflow: "visible" }}
      >
        <div
          style={{ position: "relative", width: 26, height: 36 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Tooltip: flip below the pin for high-latitude destinations (London, New York)
              so the card never gets clipped by the top edge of the map card. */}
          <MapTooltip
            city={city}
            country={country}
            lat={lat}
            lng={lng}
            visible={hovered}
            direction={lat > 30 ? "down" : "up"}
          />

          {/*
            Glow wrapper — CSS handles filter so it never conflicts with
            Framer Motion's transform (scale / y) on the inner motion.div.
          */}
          <div
            style={{
              position: "absolute",
              top: 2,
              left: 2,
              width: 22,
              height: 28,
              filter: hovered
                ? "drop-shadow(0 6px 20px rgba(139,92,246,0.88)) drop-shadow(0 2px 8px rgba(82,3,128,0.55))"
                : "drop-shadow(0 3px 10px rgba(82,3,128,0.55))",
              transition: "filter 0.25s ease",
            }}
          >
            <motion.div
              style={{ width: 22, height: 28, cursor: "pointer" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.22, y: -4 }}
              transition={
                visible
                  ? { type: "spring", stiffness: 420, damping: 18, delay: index * 0.14 }
                  : { duration: 0.12 }
              }
            >
              <svg
                width="22"
                height="28"
                viewBox="0 0 22 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Gradient: soft violet at top → deep purple at tip */}
                  <linearGradient
                    id={gradId}
                    x1="11"
                    y1="0"
                    x2="11"
                    y2="28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#4c0080" />
                  </linearGradient>
                </defs>

                {/* Teardrop body */}
                <path
                  d="M11 0C4.925 0 0 4.925 0 11c0 3.86 1.93 7.28 4.88 9.36L11 28l6.12-7.64C20.07 18.28 22 14.86 22 11 22 4.925 17.075 0 11 0z"
                  fill={`url(#${gradId})`}
                />

                {/* Hollow inner ring — more refined than a solid disc */}
                <circle
                  cx="11"
                  cy="11"
                  r="4.5"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Center dot */}
                <circle cx="11" cy="11" r="1.5" fill="white" opacity="0.85" />
              </svg>
            </motion.div>
          </div>

          {/* Ground shadow beneath pin tip */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 1,
              left: "50%",
              transform: "translateX(-50%)",
              width: 12,
              height: 4,
              borderRadius: "50%",
              background: "rgba(82,3,128,0.22)",
              filter: "blur(3px)",
            }}
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={visible ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.4 }}
            transition={
              visible
                ? { delay: index * 0.14 + 0.12, duration: 0.25 }
                : { duration: 0.1 }
            }
          />
        </div>
      </foreignObject>
    </Marker>
  );
}

export default function MapPins({ visibleCount }: MapPinsProps) {
  return (
    <>
      {destinations.map((dest, i) => (
        <SinglePin
          key={dest.city}
          destination={dest}
          index={i}
          visible={i < visibleCount}
        />
      ))}
    </>
  );
}
