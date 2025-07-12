import { useEffect, useState } from "react";

const SIDEBAR_KEY = "sidebarCollapsed";

export function useSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem(SIDEBAR_KEY) === "true";
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_KEY, isCollapsed);
    document.body.classList.toggle("has-sidebar", !isCollapsed);
    document.body.classList.toggle("sidebar-collapsed", isCollapsed);

    const event = new CustomEvent("sidebarStateChange", {
      detail: { isCollapsed },
    });
    document.dispatchEvent(event);
  }, [isCollapsed]);

  return {
    isCollapsed,
    setIsCollapsed,
    toggle: () => setIsCollapsed((prev) => !prev),
    collapse: () => setIsCollapsed(true),
    expand: () => setIsCollapsed(false),
  };
}
