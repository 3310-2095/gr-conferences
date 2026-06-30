"use client";
import { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import MapPins from "./MapPins";

const GEO_URL = "/world-110m.json";

interface WorldMapProps {
  visiblePins: number;
  className?: string;
}

const countryStyle = {
  default: { fill: "#E2E4E9", stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none" },
  hover:   { fill: "#E2E4E9", stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none" },
  pressed: { fill: "#E2E4E9", stroke: "#FFFFFF", strokeWidth: 0.5, outline: "none" },
};

const WorldMap = memo(function WorldMap({ visiblePins, className = "" }: WorldMapProps) {
  return (
    <div className={`w-full h-full ${className}`} style={{ background: "transparent" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 155, center: [15, 10] }}
        style={{ width: "100%", height: "100%" }}
        width={800}
        height={500}
      >
        {/*
          ZoomableGroup intentionally removed — it is the only source of
          mouse-wheel zoom and drag-to-pan in react-simple-maps.
          Without it the map is completely static; pin hover still works
          because that is handled by foreignObject HTML elements, not SVG events.
        */}
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={countryStyle}
              />
            ))
          }
        </Geographies>

        <MapPins visibleCount={visiblePins} />
      </ComposableMap>
    </div>
  );
});

export default WorldMap;
