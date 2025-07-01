import { Route, Routes } from "react-router-dom";

import { Login } from "../pages/login";
import { Register } from "../pages/register";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};