# notify

A global notify lib build on top of `@mui/material: ^5.0`

**It's very well come you guys to help me to improve docs translation**

- [x] `@mui/material` theme support;
- [x] global api, use everywhere;

## Basic usages

### use stand alone

It's useful if you want to use it outside FC scope any time.

```javascript
import { msg, confirm } from "@aolyang/notify"

// success, error, info, warn
msg.success("hi, this is work!")
confirm.error("error", "this is not right!").then((res) => {
  if (res) {
    // do when btn confirm click
  } else {
    // do when cancle btn click or close icon or outside click
  }
})

```

### use with your Mui theme

+ It's useful if you have a beautiful theme, and it will sync automatically.

```javascript
// somewhere notify.ts
import defineNotice from "@aolyang/notify"

const notifyIns = defineNotice()
export const setNoticeTheme = notifyIns.setTheme
export default notifyIns
```

```javascript
// somewhere ThemeProvider.tsx
import { setNoticeTheme } from "somewhere/notify"
import React, { createContext, useContext, useEffect, useState } from "react"
import { StyledEngineProvider, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"

export const ThemeContext = createContext()

function YourThemeProvider(props) {
  const [theme, setMuiTheme] = useState({})
  const setTheme = (_theme) => {
    const fullThemeConfigs = createTheme(_theme)
    setMuiTheme(fullThemeConfigs)
    // you can put it here
    // setNoticeTheme(fullThemeConfigs)
  }
  useEffect(() => {
    // or here
    setNoticeTheme(theme)
  }, [theme])
  return <ThemeContext.Provider value={{
    setTheme
  }}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  </ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
```
## highly customization

+ WIP
