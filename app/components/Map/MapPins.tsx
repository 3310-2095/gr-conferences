"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Marker } from "react-simple-maps";
import { destinations, type Destination } from "./destinations";

const LABEL_CYCLE_MS = 1400;
const SIMULTANEOUS = 3;

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

const LABEL_PLACEMENT: Record<string, "above" | "below" | "left" | "right"> = {
  "Ahmedabad":  "left",
  "Udaipur":    "below",
  "Chandigarh": "above",
  "Almaty":     "above",
  "Goa":        "left",
};

function getLabelPos(city: string, lat: number, ph: number, s: number) {
  const side = LABEL_PLACEMENT[city] ?? (lat > 20 ? "above" : "below");
  switch (side) {
    case "above": return { x: -60 * s, y: -ph - 22 * s, align: "center" as const };
    case "below": return { x: -60 * s, y: s * 2,         align: "center" as const };
    case "left":  return { x: -130 * s, y: -ph + 4 * s,  align: "right"  as const };
    case "right": return { x: 10 * s,   y: -ph + 4 * s,  align: "left"   as const };
  }
}

function CityLabel({ city, lat, ph, s }: { city: string; lat: number; ph: number; s: number }) {
  const { x, y, align } = getLabelPos(city, lat, ph, s);
  const transform =
    align === "right" ? "translateX(-100%)" :
    align === "left"  ? "translateX(0)" :
    "translateX(-50%)";
  const marginLeft = align === "center" ? "50%" : 0;

  return (
    <AnimatePresence>
      <motion.g
        key={city}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: "0px", originY: "0px" }}
      >
        <foreignObject
          x={x}
          y={y}
          width={120 * s}
          height={30 * s}
          style={{ overflow: "visible", pointerEvents: "none" }}
        >
          <div style={{ display: "inline-block", transform, marginLeft, whiteSpace: "nowrap" }}>
            <span
              style={{
                color: "#3a015c",
                fontWeight: 700,
                fontSize: 11 * s,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                textShadow: "0 1px 2px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.9)",
              }}
            >
              {city}
            </span>
          </div>
        </foreignObject>
      </motion.g>
    </AnimatePresence>
  );
}

function ClusterPin({ cluster, index, visible, zoom, activeCity }: ClusterPinProps) {
  const [hovered, setHovered] = useState(false);
  const { lat, lng, cities } = cluster;
  const isActive = activeCity !== null && cities.includes(activeCity);
  const isMulti = cities.length > 1;
  const gradId = `pg-${index}-${cities[0].replace(/\s/g, "")}`;

  const s = 1 / zoom;
  const pw = 11 * s;
  const ph = 14 * s;
  const pr = 3.5 * s;
  const tipY = ph;

  return (
    <Marker coordinates={[lng, lat]}>
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      >
        {hovered && (
          <circle cx={0} cy={-tipY + pr} r={pw * 0.9} fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth={s * 1.5}>
            <animate attributeName="r" from={pw * 0.9} to={pw * 2.2} dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" repeatCount="indefinite" />
          </circle>
        )}

        <ellipse cx={0} cy={0} rx={pw * 0.55} ry={s * 1.2} fill="rgba(82,3,128,0.18)" />

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
              <stop offset="0%"   stopColor={hovered ? "#a78bfa" : "#c084fc"} />
              <stop offset="100%" stopColor={hovered ? "#5b21b6" : "#4c0080"} />
            </linearGradient>
            <filter id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy={s * 2} stdDeviation={s * 3} floodColor="rgba(82,3,128,0.6)" />
            </filter>
          </defs>

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

          <circle cx={0} cy={-tipY + pr} r={pr * 0.65} fill="none" stroke="white" strokeWidth={s * 1.2} opacity={0.9} />

          {isMulti ? (
            <text x={0} y={-tipY + pr + s * 2.2} textAnchor="middle" fill="white" fontSize={s * 5} fontWeight="bold" fontFamily="sans-serif" opacity={0.95}>
              {cities.length}
            </text>
          ) : (
            <circle cx={0} cy={-tipY + pr} r={s * 1.2} fill="white" opacity={0.85} />
          )}
        </motion.g>

        <rect x={-pw} y={-ph - s * 2} width={pw * 2} height={ph + s * 2} fill="transparent" />

        {isActive && activeCity && (
          <CityLabel city={activeCity} lat={lat} ph={ph} s={s} />
        )}
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
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!allRevealed) return;
    const id = setInterval(() => setTick((t) => t + 1), LABEL_CYCLE_MS);
    return () => clearInterval(id);
  }, [allRevealed]);

  const activeCities = useMemo(() => {
    if (!allRevealed) return new Set<string>();
    const n = destinations.length;
    const step = Math.floor(n / SIMULTANEOUS);
    return new Set(
      Array.from({ length: SIMULTANEOUS }, (_, k) =>
        destinations[(tick + k * step) % n].city
      )
    );
  }, [tick, allRevealed]);

  return (
    <>
      {clusters.map((cluster, i) => (
        <ClusterPin
          key={`${cluster.cities[0]}-${zoom.toFixed(2)}`}
          cluster={cluster}
          index={i}
          visible={cluster.revealIndex < visibleCount}
          zoom={zoom}
          activeCity={cluster.cities.find((c) => activeCities.has(c)) ?? null}
        />
      ))}
    </>
  );
}
