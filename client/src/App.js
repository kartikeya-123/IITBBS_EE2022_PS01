import "./App.css";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./theme/theme";
import HomePageLayout from "./components/Home/HomePageLayout";
import SportPageLayout from "./components/Sports/SportPageLayout";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePageLayout />} />
                    <Route
                        path="/sport/:sportName/"
                        element={<SportPageLayout />}
                    />
                    <Route
                        path="/sport/:sportName/:eventId"
                        element={<SportPageLayout />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
