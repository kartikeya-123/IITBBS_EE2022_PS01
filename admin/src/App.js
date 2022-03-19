import "./App.css";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>Admin side app</div>
    </ThemeProvider>
  );
}

export default App;
