import "./App.css";
import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import HomeLayout from "./components/Home/Layout";
import SportsLayout from "./components/Sports/Layout";
import Layout from "./components/Sports/Pages/Layout";
import Login from "./components/Login/Login";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path={`/sport/:sportName`} element={<SportsLayout />} />
          <Route path={`/sport/:sportName/:matchId`} element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
