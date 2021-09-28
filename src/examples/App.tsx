import React, { useEffect, useState } from "react"
import { Button, CssBaseline } from "@mui/material"
import { printLn } from "/@/components"
import { useNotify } from "/@/components/NotifyProvider"
import { api } from "/@/components/Msg"

function App() {
  const [count, setCount] = useState(0)
  const { info } = useNotify()
  const handleClick = () => {
    setCount(count + 1)
    info("info msg by provider" + count)
  }
  const handleGlobalApi = () => {
    api.info("global message" + count)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <Button variant={"contained"} type="button"
                  onClick={handleClick}>
            count is: {count}
          </Button>
          <Button variant={"contained"} type="button"
                  onClick={handleGlobalApi}>
            global api info
          </Button>
        </p>
      </header>
    </div>
  )
}

export default App
