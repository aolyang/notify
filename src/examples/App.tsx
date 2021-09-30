import React, { useState } from "react"
import { Button, Grid } from "@mui/material"
import { api, MsgOptions } from "/@/lib/Msg"

function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  const handleGlobalApi = (options: MsgOptions) => {
    console.log("options", options.variant)
    api.info("global message" + count, options)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!, count:{count}</p>

        <Button variant={"contained"} type="button"
                onClick={handleClick}>
          count is: {count}
        </Button>
        <p>Alert variant: "filled" | "outlined" | "standard"</p>
        <Grid container spacing={2}>
          {(["filled", "outlined", "standard"] as const).map(va => {
            return <Grid item key={va}>
              <Button variant={"contained"} type="button"
                      onClick={() => handleGlobalApi({ variant: va })}>{va}
              </Button>
            </Grid>
          })}
        </Grid>
        <p>anchorOrigin: ["top" | "bottom", "left" | "center" | "right"]</p>
        <Grid container spacing={2}>
          {
            (["top", "bottom"] as const).map(vertical => {
              return (["left", "center", "right"] as const).map(horizontal => {
                const anchor = `${vertical}-${horizontal}` as const
                return (<Grid item key={anchor}>
                  <Button
                    variant={"contained"}
                    type="button"
                    onClick={() => handleGlobalApi({
                      variant: "standard",
                      anchorOrigin: anchor
                    })}>
                    {anchor}
                  </Button>
                </Grid>)
              })
            })
          }
        </Grid>
      </header>
    </div>
  )
}

export default App
