import { useContext } from "react";
import { Context } from "../context/userContext";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { authenticated } = useContext(Context);

  return (
    authenticated ? < AppRoutes /> : < AuthRoutes />
  );
};