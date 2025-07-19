import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { Profile } from "../pages/profile";
import { MyPets } from "../pages/myPets";
import { AddPets } from "../pages/addPets";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/pet/mypets" element={<MyPets />} />
      <Route path="/pet/add" element={<AddPets />} />
    </Routes>
  );
};