import { ReactNode } from "react";
import s from "./Card.module.scss";

type CardSize = "sm" | "md" | "lg";
type CardVariant = "elevated" | "outlined";

type CardProps = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  size?: CardSize;
  variant?: CardVariant;
};

export default function Card({
  children,
  onClick,
  className,
  style,
  size = "md",
  variant = "elevated",
}: CardProps) {
  return (
    <div
      className={`
        ${s.card}
        ${s[size]}
        ${s[variant]}
        ${className ?? ""}
      `}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
