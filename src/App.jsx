import React, { useState, useCallback } from "react";
import TopBar from "./components/TopBar";
import LeftToolbar from "./components/LeftToolbar";
import Canvas from "./components/Canvas";

export default function App() {
  const MIN_SCALE = 0.2;
  const MAX_SCALE = 3;
  const STEP = 0.1;

  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(MAX_SCALE, +(s + STEP).toFixed(2)));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => Math.max(MIN_SCALE, +(s - STEP).toFixed(2)));
  }, []);

  const resetZoom = useCallback(() => setScale(1), []);

  return (
    <div className="app-root">
      <TopBar />
      <LeftToolbar />
      <Canvas scale={scale} />
      <div className="zoom-control">
        <button className="zoom-btn" onClick={zoomOut} disabled={scale <= MIN_SCALE}>
          −
        </button>
        <div className="zoom-value">{Math.round(scale * 100)}%</div>
        <button className="zoom-btn" onClick={zoomIn} disabled={scale >= MAX_SCALE}>
          +
        </button>
        <button className="zoom-btn" onClick={resetZoom} title="Reset zoom">
          ⟲
        </button>
      </div>
    </div>
  );
}
