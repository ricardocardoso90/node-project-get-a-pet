
import { useState } from "react";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const [isLoaded, setIsLoaded] = useState(false);

  function isLoadedRoutes() {
    setIsLoaded(!isLoaded);
  };

  return (
    isLoaded ? < AppRoutes /> : < AuthRoutes />
  );
};