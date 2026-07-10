"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const hide = () => setVisible(false);
    if (document.readyState === "complete") {
      hide();
    } else {
      window.addEventListener("load", hide, { once: true });
      return () => window.removeEventListener("load", hide);
    }
  }, [pathname]);

  if (!visible || pathname.startsWith("/gallery/")) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </div>
  );
}
