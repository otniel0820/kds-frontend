import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/Theme.context";
import s from "./ThemeSwitch.module.scss";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={s.switch}
      aria-label="Toggle theme"
    >
      <div
        className={`${s.thumb} ${
          theme === "dark" ? s.thumbDark : ""
        }`}
      >
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </div>
    </button>
  );
}
