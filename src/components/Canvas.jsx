import React from "react";

export default function Canvas({ scale = 1 }) {
  return (
    <main className="canvas-area">
      <div
        className="canvas-content"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <div className="grid" />
      </div>
    </main>
  );
}