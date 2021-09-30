import React, { useRef, useState } from "react"
import { Button, Grid } from "@mui/material"
import { api, MsgOptions } from "/@/lib/Msg"

function App() {
  const countRef = useRef(0)
  const [count, setCount] = useState(countRef.current)
  const handleClick = (set?: number) => {
    const _count = set ?? count + 1
    setCount(_count)
    countRef.current = _count
  }
  const handleGlobalApi = (msg: string, options: MsgOptions) => {
    const count = countRef.current += 1
    api.info(count + "  " + msg + `${count % 2 === 0 ? "lang msg here" : ""}`, options)
    handleClick(count)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello Vite + React!, count:{count}</p>

        <Button variant={"contained"} type="button"
                onClick={() => handleClick()}>
          count is: {count}
        </Button>
        <p>Alert variant: "filled" | "outlined" | "standard"</p>
        <Grid container spacing={2}>
          {(["filled", "outlined", "standard"] as const).map(va => {
            return <Grid item key={va}>
              <Button variant={"contained"} type="button"
                      onClick={() => handleGlobalApi(va, { variant: va })}>{va}
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
                    onClick={() => handleGlobalApi(anchor, {
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
