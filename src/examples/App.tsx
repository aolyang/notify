import React, { useEffect, useState } from "react"
import { Button, CssBaseline } from "@mui/material"
import { printLn } from "/@/components"
import { useNotify } from "/@/components/NotifyProvider"

function App() {
  const [count, setCount] = useState(0)
  const { info } = useNotify()
  const handleClick = () => {
    setCount(count + 1)
  }
  useEffect(() => {
    info("这是个info" + count)
  }, [count])
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <Button variant={"contained"} type="button"
                  onClick={handleClick}>
            count is: {count}
          </Button>
        </p>
      </header>
    </div>
  )
}

export default App
