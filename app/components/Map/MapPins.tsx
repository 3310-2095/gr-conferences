"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Marker } from "react-simple-maps";
import { destinations, type Destination } from "./destinations";

const LABEL_CYCLE_MS = 1400;

interface MapPinsProps {
  visibleCount: number;
  zoom?: number;
}

interface PinCluster {
  lat: number;
  lng: number;
  cities: string[];
  revealIndex: number;
}

function getClusterThreshold(zoom: number) {
  return 3.5 / zoom;
}

function buildClusters(dests: Destination[], threshold: number): PinCluster[] {
  const result: PinCluster[] = [];
  dests.forEach((dest, idx) => {
    for (const cluster of result) {
      const dLat = Math.abs(dest.lat - cluster.lat);
      const dLng = Math.abs(dest.lng - cluster.lng);
      if (Math.sqrt(dLat * dLat + dLng * dLng) < threshold) {
        const n = cluster.cities.length;
        cluster.lat = (cluster.lat * n + dest.lat) / (n + 1);
        cluster.lng = (cluster.lng * n + dest.lng) / (n + 1);
        cluster.cities.push(dest.city);
        return;
      }
    }
    result.push({ lat: dest.lat, lng: dest.lng, cities: [dest.city], revealIndex: idx });
  });
  return result;
}

interface ClusterPinProps {
  cluster: PinCluster;
  index: number;
  visible: boolean;
  zoom: number;
  activeCity: string | null;
}

function ClusterPin({ cluster, index, visible, zoom, activeCity }: ClusterPinProps) {
  const [hovered, setHovered] = useState(false);
  const { lat, lng, cities } = cluster;
  const isActive = activeCity !== null && cities.includes(activeCity);
  const isMulti = cities.length > 1;
  const gradId = `pg-${index}-${cities[0].replace(/\s/g, "")}`;

  // Scale pin inversely with zoom so it stays the same visual size
  // Base size at zoom=1, shrinks proportionally as zoom increases
  const s = 1 / zoom;

  // Pin dimensions in SVG units (scaled)
  const pw = 11 * s;   // pin width  (half = 5.5s)
  const ph = 14 * s;   // pin height
  const pr = 3.5 * s;  // circle radius inside pin
  const tipY = ph;     // tip of pin at y=ph (anchor point)

  return (
    <Marker coordinates={[lng, lat]}>
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {/* Pulse ring — only on hover */}
        {hovered && (
          <circle
            cx={0}
            cy={-tipY + pr}
            r={pw * 0.9}
            fill="none"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth={s * 1.5}
          >
            <animate attributeName="r" from={pw * 0.9} to={pw * 2.2} dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Ground shadow */}
        <ellipse
          cx={0}
          cy={0}
          rx={pw * 0.55}
          ry={s * 1.2}
          fill="rgba(82,3,128,0.18)"
        />

        {/* Pin body — SVG teardrop, tip at (0,0), body above */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={
            visible
              ? { type: "spring", stiffness: 340, damping: 30, delay: index * 0.08 }
              : { duration: 0.12 }
          }
          style={{ originX: "0px", originY: "0px" }}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1={-tipY} x2="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={hovered ? "#a78bfa" : "#c084fc"} />
              <stop offset="100%" stopColor={hovered ? "#5b21b6" : "#4c0080"} />
            </linearGradient>
            <filter id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy={s * 2}
                stdDeviation={s * 3}
                floodColor="rgba(82,3,128,0.6)"
              />
            </filter>
          </defs>

          {/* Teardrop: tip at (0,0), circle center at (0, -tipY + pr) */}
          <path
            d={`
              M 0 0
              C ${-pw * 0.35} ${-ph * 0.25}, ${-pw * 0.5} ${-ph * 0.55}, ${-pw * 0.5} ${-tipY + pr}
              A ${pr} ${pr} 0 1 1 ${pw * 0.5} ${-tipY + pr}
              C ${pw * 0.5} ${-ph * 0.55}, ${pw * 0.35} ${-ph * 0.25}, 0 0
              Z
            `}
            fill={`url(#${gradId})`}
            filter={`url(#shadow-${index})`}
          />

          {/* Inner white ring */}
          <circle
            cx={0}
            cy={-tipY + pr}
            r={pr * 0.65}
            fill="none"
            stroke="white"
            strokeWidth={s * 1.2}
            opacity={0.9}
          />

          {/* Count or dot */}
          {isMulti ? (
            <text
              x={0}
              y={-tipY + pr + s * 2.2}
              textAnchor="middle"
              fill="white"
              fontSize={s * 5}
              fontWeight="bold"
              fontFamily="sans-serif"
              opacity={0.95}
            >
              {cities.length}
            </text>
          ) : (
            <circle cx={0} cy={-tipY + pr} r={s * 1.2} fill="white" opacity={0.85} />
          )}
        </motion.g>

        {/* Invisible hit area for easier hover */}
        <rect
          x={-pw}
          y={-ph - s * 2}
          width={pw * 2}
          height={ph + s * 2}
          fill="transparent"
        />

        {/* Auto-cycling city label — small floating text, no popup card */}
        <AnimatePresence>
          {isActive && (
            <motion.g
              key={activeCity}
              initial={{ opacity: 0, scale: 0.7, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 4 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: "0px", originY: "0px" }}
            >
              <foreignObject
                x={-60 * s}
                y={lat > 30 ? s * 4 : (-ph - 34 * s)}
                width={120 * s}
                height={30 * s}
                style={{ overflow: "visible", pointerEvents: "none" }}
              >
                <div
                  style={{
                    display: "inline-block",
                    transform: "translateX(-50%)",
                    marginLeft: "50%",
                    background: "rgba(8,3,18,0.85)",
                    borderRadius: 999,
                    padding: `${4 * s}px ${10 * s}px`,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 11 * s, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                    {activeCity}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          )}
        </AnimatePresence>
      </g>
    </Marker>
  );
}

export default function MapPins({ visibleCount, zoom = 1 }: MapPinsProps) {
  const clusters = useMemo(
    () => buildClusters(destinations, getClusterThreshold(zoom)),
    [zoom]
  );

  const allRevealed = visibleCount >= destinations.length;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!allRevealed) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % destinations.length);
    }, LABEL_CYCLE_MS);
    return () => clearInterval(id);
  }, [allRevealed]);

  const activeCity = allRevealed ? destinations[activeIdx].city : null;

  return (
    <>
      {clusters.map((cluster, i) => (
        <ClusterPin
          key={`${cluster.cities[0]}-${zoom.toFixed(2)}`}
          cluster={cluster}
          index={i}
          visible={cluster.revealIndex < visibleCount}
          zoom={zoom}
          activeCity={activeCity}
        />
      ))}
    </>
  );
}
