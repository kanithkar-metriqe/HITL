import { useEffect } from "react";

import notFoundScreen from "@/assets/img/404-page-error.svg";

export default function NotFound() {
  useEffect(() => {
    document.title = `HITL - 404 - Page Not Found`;
  }, []);

  return (
    <div>
      <img
        alt="Page not found"
        className="w-dvh mx-auto"
        // id="test"
        src={notFoundScreen}
      />
    </div>
  );
}
