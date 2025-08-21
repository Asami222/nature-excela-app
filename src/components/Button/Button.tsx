// src/components/Button.tsx
import React from "react";

export type ButtonProps = {
  label: string;
  color?: "blue" | "green"; // 本番用では variant に戻してもOK
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  color = "blue",
  onClick,
}) => {
  const base =
    "rounded-lg px-4 py-2 font-medium text-white transition-colors";

  const styles =
    color === "blue"
      ? "bg-[#2563eb] hover:bg-[#1d4ed8]" // 直接カラー指定
      : "bg-[#16a34a] hover:bg-[#15803d]";

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  );
};