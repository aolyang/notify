import { Alert, Snackbar, styled } from "@mui/material"
import { MsgItem, MsgOptions } from "/@/lib/Msg"
import React, { useEffect, useRef, useState } from "react"
import clsx from "clsx"

const componentName = "SnackbarItem"

const classes = {
  contentRoot: `${componentName}-contentRoot`,
  lessPadding: `${componentName}-lessPadding`,
  variantSuccess: `${componentName}-variantSuccess`,
  variantError: `${componentName}-variantError`,
  variantInfo: `${componentName}-variantInfo`,
  variantWarning: `${componentName}-variantWarning`,
  message: `${componentName}-message`,
  action: `${componentName}-action`,
  wrappedRoot: `${componentName}-wrappedRoot`
}

const StyledSnackbar = styled(Snackbar)(({ theme }) => {
  // const mode = theme.palette.mode || theme.palette.type
  // const backgroundColor = emphasize(theme.palette.background.default, mode === "light" ? 0.8 : 0.98)

  return {
    [`&.${classes.wrappedRoot}`]: {
      position: "relative",
      transform: "translateX(0)",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    [`.${classes.contentRoot}`]: {
      ...theme.typography.body2,
      alignItems: "center",
      padding: "6px 16px",
      borderRadius: "4px",
      minWidth: "280px"
      // boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"
    },
    [`.${classes.contentRoot}-defaultShadow`]: {
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2)"
    },
    [`.${classes.message}`]: {
      display: "flex",
      alignItems: "center"
    },
    [`.${classes.action}`]: {
      display: "flex",
      alignItems: "center",
      marginLeft: "auto",
      paddingLeft: 16,
      marginRight: -8
    }
  }
})

export default function SnackbarItem(props: {
  option: MsgItem,
  defaultOptions: MsgOptions
  onTimeout: (id: string) => void
}) {
  const { option } = props
  const timerRef = useRef<number | null>(null)
  const [open, setOpen] = useState(true)
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = window.setTimeout(() => {
        setOpen(false)
        clearTimer()
      }, option.autoHideDuration || props.defaultOptions.autoHideDuration)
    }
  })

  const snackbarClasses = clsx(
    classes.wrappedRoot
  )
  const alertClasses = clsx(classes.contentRoot, {
    [`${classes.contentRoot}-defaultShadow`]: true
  })
  return <>
    <StyledSnackbar open={open}
                    className={snackbarClasses}
                    color={option.color}
                    TransitionComponent={option.TransitionComponent}
                    TransitionProps={{
                      onExited: (...args) => {
                        props.onTimeout(option.id)
                      }
                    }}
                    sx={{
                      position: "unset",
                      marginY: (theme) => theme.spacing(1)
                    }}>
      <Alert className={alertClasses}
             severity={option.severity}
             variant={option.variant}
             color={option.severity}
             icon={"warning"}
             sx={{
               color: "#fafafa",
               backgroundColor: props.defaultOptions.color
             }}
             action={
               <>
                 {/*<Button>action1</Button>*/}
                 {/*<Button>action2</Button>*/}
               </>
             }>
        <div className={classes.message}>{option.msg}</div>
      </Alert>
    </StyledSnackbar>
  </>
}

