import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Profile } from "../pages/Profile";
import { MyPets } from "../pages/MyPets";
import { AddPets } from "../pages/AddPets";
import { EditPets } from "../pages/EditPets";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets/mypets" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/pet/mypets" element={<MyPets />} />
      <Route path="/pet/add" element={<AddPets />} />
      <Route path="/pet/edit/:id" element={<EditPets />} />
    </Routes>
  );
};