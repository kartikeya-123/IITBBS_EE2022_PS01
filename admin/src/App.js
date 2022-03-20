import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Home/Layout";
import SportsLayout from "./components/Sports/Layout";
import Layout from "./components/Sports/Pages/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}></Route>
          <Route path={`/sport/:sportName`} element={<SportsLayout />} />
          <Route path={`/sport/:sportName/:matchId`} element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
