import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/Home/Layout";
import SportsLayout from "./components/Sports/Layout";
<<<<<<< HEAD
import PageLayout from "./components/Sports/Pages/layout";
=======
import Layout from "./components/Sports/Pages/Layout";
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}></Route>
          <Route path={`/sport/:sportName`} element={<SportsLayout />} />
<<<<<<< HEAD
          <Route
            path={`/sport/:sportName/:matchId`}
            element={<PageLayout/>}
          />
=======
          <Route path={`/sport/:sportName/:matchId`} element={<Layout />} />
>>>>>>> a611ccc49a2ff010b44a2450c6fe0cb55333458e
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
