import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/RegisterPage";
import Home from "./Components/homepage/home.js";
import Protect from "./Services/protectedroute.js";
import User from "./Components/User_creat/create_user";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/create" element={<User />} />

          <Route element={<Protect />}>
            <Route exact path="/home" element={<Home />} />
          </Route>

          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


