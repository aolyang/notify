import React, { useState } from "react"
import { Button } from "@mui/material"
import { api } from "/@/components/Msg"

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
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
