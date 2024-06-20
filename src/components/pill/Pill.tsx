import React from "react";
import "./Pill.css";

export interface PillProps {
  label: string;
  color?: string;
  onClick?: () => void;
}

export const Pill: React.FC<PillProps> = ({ label, color, onClick }) => {
  if (!onClick) {
    return (
      <span className="pill" style={{ color }}>
        {label}
      </span>
    );
  }
  return (
    <button
      className="pill pill-clickable"
      style={{ color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
