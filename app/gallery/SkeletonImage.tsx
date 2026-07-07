"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/** Next/Image wrapper that shows a pulsing gray skeleton in place of the image
 *  until it finishes loading, then cross-fades it in. Parent must be `relative`. */
export default function SkeletonImage({ className, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
      <Image
        {...props}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={`${className ?? ""} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
