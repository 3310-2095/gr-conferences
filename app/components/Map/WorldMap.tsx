"use client";
import { memo, useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import MapPins from "./MapPins";

const GEO_URL = "/world-110m.json";

const INDIA_CENTER: [number, number] = [78.9629, 22.5937];
const INDIA_ZOOM = 5;
const DEFAULT_CENTER: [number, number] = [15, 10];
const DEFAULT_ZOOM = 1;

function isIndia(geo: { properties: { name?: string; NAME?: string } }) {
  const name = (geo.properties.name || geo.properties.NAME || "").toLowerCase();
  return name === "india";
}

interface WorldMapProps {
  visiblePins: number;
  // false (default) = static card: no drag, no zoom, no tooltips
  // true            = fullscreen: India click-to-zoom enabled
  interactive?: boolean;
  className?: string;
}

const WorldMap = memo(function WorldMap({
  visiblePins,
  interactive = false,
  className = "",
}: WorldMapProps) {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [indiaZoomed, setIndiaZoomed] = useState(false);

  const handleIndiaClick = useCallback(() => {
    if (indiaZoomed) {
      setZoom(DEFAULT_ZOOM);
      setCenter(DEFAULT_CENTER);
      setIndiaZoomed(false);
    } else {
      setZoom(INDIA_ZOOM);
      setCenter(INDIA_CENTER);
      setIndiaZoomed(true);
    }
  }, [indiaZoomed]);

  return (
    <div
      className={`w-full h-full relative ${className}`}
      style={{ background: "transparent" }}
    >
      {/* Zoom hint — only when interactive (fullscreen) and not yet zoomed */}
      {interactive && !indiaZoomed && (
        <div
          className="absolute bottom-2 right-3 z-10 flex items-center gap-1.5 pointer-events-none"
          style={{ opacity: 0.65 }}
        >
          {/* <svg
            width="13" height="13" viewBox="0 0 24 24"
            fill="none" stroke="#520380" strokeWidth="2.5" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg> */}
          {/* <span style={{ fontSize: 10, color: "#520380", fontWeight: 600, letterSpacing: "0.08em" }}>
            Click India to zoom
          </span> */}
        </div>
      )}

      {/* Reset button — only when interactive and zoomed into India */}
      {interactive && indiaZoomed && (
        <button
          onClick={handleIndiaClick}
          className="absolute bottom-2 right-3 z-10 flex items-center gap-1.5 transition-all duration-200 hover:opacity-80"
          style={{
            fontSize: 10, color: "#520380", fontWeight: 600,
            letterSpacing: "0.08em", background: "rgba(82,3,128,0.08)",
            border: "1px solid rgba(82,3,128,0.2)", borderRadius: 6,
            padding: "4px 8px", cursor: "pointer",
          }}
        >
          <svg
            width="11" height="11" viewBox="0 0 24 24"
            fill="none" stroke="#520380" strokeWidth="2.5" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35M8 11h6" />
          </svg>
          Reset zoom
        </button>
      )}

      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, center: [15, 10] }}
        style={{ width: "100%", height: "100%" }}
        width={800}
        height={500}
      >
        <ZoomableGroup
          zoom={interactive ? zoom : DEFAULT_ZOOM}
          center={interactive ? center : DEFAULT_CENTER}
          // Block ALL D3-driven pan/drag/wheel events in both modes.
          // India zoom is driven purely by React onClick → handleIndiaClick,
          // which is independent of D3's event system and still fires normally.
          filterZoomEvent={() => false}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Only treat India as special when the map is interactive
                const india = interactive && isIndia(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={india ? handleIndiaClick : undefined}
                    style={{
                      default: {
                        fill: india
                          ? indiaZoomed ? "#d8b4fe" : "#c4b5fd"
                          : "#E2E4E9",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: india ? "pointer" : "default",
                        // Only India receives pointer events when interactive;
                        // all other countries (and everything in static mode)
                        // get pointerEvents:none to block drag/tooltips.
                        pointerEvents: india ? "auto" : ("none" as const),
                        transition: "fill 0.3s ease",
                      },
                      hover: {
                        fill: india ? "#a78bfa" : "#E2E4E9",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: india ? "pointer" : "default",
                        pointerEvents: india ? "auto" : ("none" as const),
                      },
                      pressed: {
                        fill: india ? "#7c3aed" : "#E2E4E9",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                        outline: "none",
                        pointerEvents: india ? "auto" : ("none" as const),
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          <MapPins visibleCount={visiblePins} zoom={interactive ? zoom : DEFAULT_ZOOM} />
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
});

export default WorldMap;
