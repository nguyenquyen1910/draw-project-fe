import React from "react";

const icons = ["✦", "▶", "☐", "T", "✎", "⛶", "☺", "💬", "+"];

export default function LeftToolbar() {
  return (
    <aside className="left-toolbar">
      <div className="tool-group">
        {icons.map((ic, idx) => (
          <button key={idx} className="tool-btn" title={`Tool ${idx + 1}`}>
            <span className="icon">{ic}</span>
          </button>
        ))}
      </div>

      <div className="undo-group">
        <button className="small-btn">↺</button>
        <button className="small-btn">↻</button>
      </div>
    </aside>
  );
}