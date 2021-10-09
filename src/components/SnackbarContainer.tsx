// code from https://github.com/iamhosseindhv/notistack
import { styled } from "@mui/material"
import { memo, PropsWithChildren } from "react"
import clsx from "clsx"
import React from "react"

export const SNACKBAR_INDENTS = {
  view: { default: 20, dense: 4 },
  snackbar: { default: 6, dense: 2 }
}

const xsWidthMargin = 16
const componentName = "SnackbarContainer"

const classes = {
  root: `${componentName}-root`,
  top: `${componentName}-top`,
  bottom: `${componentName}-bottom`,
  left: `${componentName}-left`,
  right: `${componentName}-right`,
  center: `${componentName}-center`
}

const Container = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    boxSizing: "border-box",
    display: "flex",
    maxHeight: "100%",
    position: "fixed",
    zIndex: theme.zIndex.snackbar,
    height: "auto",
    width: "auto",
    // transition: "top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms",
    // container itself is invisible and should not block clicks, clicks should be passed to its children
    // pointerEvents: "none",
    // [collapse.container]: {
    //   pointerEvents: "all"
    // }
  },
  [`&.${classes.top}`]: {
    top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
    flexDirection: "column"
  },
  [`&.${classes.bottom}`]: {
    bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
    flexDirection: "column-reverse"
  },
  [`&.${classes.left}`]: {
    left: SNACKBAR_INDENTS.view.default,
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-start"
    },
    [theme.breakpoints.down("sm")]: {
      left: `${xsWidthMargin}px`
    }
  },
  [`&.${classes.right}`]: {
    right: SNACKBAR_INDENTS.view.default,
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-end"
    },
    [theme.breakpoints.down("sm")]: {
      right: `${xsWidthMargin}px`
    }
  },
  [`&.${classes.center}`]: {
    left: "50%",
    transform: "translateX(-50%)",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center"
    }
  }
}))

interface ContainerProps {
  className?: string
  anchorOrigin: {
    vertical: "top" | "bottom",
    horizontal: "left" | "center" | "right"
  }
}

function SnackbarContainer(props: PropsWithChildren<ContainerProps>) {
  const { className, anchorOrigin } = props

  const combinedClassname = clsx(
    classes[anchorOrigin.vertical],
    classes[anchorOrigin.horizontal],
    classes.root, // root should come after others to override maxWidth
    className
  )

  return <Container className={combinedClassname}>
      {props.children}
  </Container>
}

export default memo(SnackbarContainer)
