import React from "react";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo">miro</div>
        <div className="board-name">My board</div>
      </div>
      <div className="topbar-right">
        <button className="round-btn">Present</button>
        <button className="round-btn primary">Share</button>
      </div>
    </header>
  );
}