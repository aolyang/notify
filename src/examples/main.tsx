import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useTheme
} from "@mui/material"
import { NotifyProvider } from "/@/components/NotifyProvider"

function Main() {
  const theme = useTheme()
  return <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <NotifyProvider>
      <Main />
    </NotifyProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
