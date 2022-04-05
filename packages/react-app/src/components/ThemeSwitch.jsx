import { Switch } from "antd";
import React, { useState } from "react";

export default function ThemeSwitcher() {
  const theme = window.localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(!(!theme || theme === "light"));

  if (theme === "dark" || (!('theme' in window.localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const toggleTheme = isChecked => {
    setIsDarkMode(isChecked);
    if (isChecked) {
      window.localStorage.setItem("theme", "dark");
    } else {
      window.localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="main fade-in" style={{ position: "fixed", right: 8, bottom: 8 }}>
      <span style={{ padding: 8 }}>{theme === "light" ? "☀️" : "🌜"}</span>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
  );
}
