import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
  useTheme
} from "@mui/material"
// import "./plugin/msg"

function Main() {
  const theme = useTheme()
  useEffect(() => {
    // api.info("Main Mounted!!!!")
  })
  return <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>
}

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
)
