import "./App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./theme/theme";
import HomeLayout from "./components/Home/Layout";
import SportsLayout from "./components/Sports/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path={`/sport/:sportName`} element={<SportsLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
