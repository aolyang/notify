import React, { Component, ReactElement, ReactNode } from "react"
import ReactDOM, { createPortal } from "react-dom"
import SnackbarContainer from "/@/components/SnackbarContainer"
import SnackbarItem from "/@/components/SnackbarItem"
import { Split, split, uuidv4 } from "/@/components/utils"
import { Slide, Theme } from "@mui/material"

import type { SlideProps } from "@mui/material"
import type { TransitionProps } from "@mui/material/transitions"

export type NotNull<T> = T extends undefined ? never : T
export type MixTuple<T1, T2> = T1 extends string ? T2 extends string ? `${T1}-${T2}` : string : string

export type RequiredMsgOptions = {
  anchorOrigin: MixTuple<"top" | "bottom", "left" | "center" | "right">
  autoHideDuration: number
  // Alert
  color: Severity
  variant: "filled" | "outlined" | "standard"
}

type ActionArgs = {
  option: MsgOptions
  theme: Theme,
  closeItem: () => void
}

export interface MsgOptions extends Partial<RequiredMsgOptions> {
  msg?: string
  icon?: ReactNode
  content?: (arg: ActionArgs) => ReactElement
  cb?: MsgFunction
  TransitionComponent?: React.ComponentType<TransitionProps>
  action?: (arg: ActionArgs) => ReactNode
  closeItem?: () => void
}

export const defaultMsgConfig: RequiredMsgOptions = {
  color: "info",
  anchorOrigin: "bottom-right",
  autoHideDuration: 16000,
  variant: "standard"
}

export type Severity = "info" | "error" | "success" | "warning"
export type CbOnClose = () => void
export type MsgFunction = {
  (msg: string, ...rest: [MsgOptions, CbOnClose] | [MsgOptions | CbOnClose]): void
}

interface MsgApi<T = MsgFunction> extends Record<Severity, T> {
  open: (msg: string, options?: MsgOptions) => void
}

export type MsgItem = MsgOptions & { id: string }

interface MsgStates {
  snackbars: MsgItem[]
}

interface MsgProps {
  options: MsgOptions
}

export type Categories = NotNull<MsgOptions["anchorOrigin"]>

export type AnchorGroup = Record<Categories, MsgItem[]>

function withDefaultSlide(anchorOrigin: Split<Categories, "-">) {
  let direction: SlideProps["direction"]
  if (anchorOrigin[1] === "center") {
    direction = anchorOrigin[0] === "top" ? "down" : "up"
  } else {
    direction = anchorOrigin[1] === "right" ? "left" : "right"
  }
  return function TransitionLeft(props: Omit<SlideProps, "direction">) {
    return <Slide {...props} direction={direction} />
  } as MsgOptions["TransitionComponent"]
}

class Msg<T = MsgOptions> extends Component<MsgProps, MsgStates> {
  static defineMsg: (config: MsgOptions, cb?: (ins: Msg) => void) => void
  private readonly options: MsgOptions

  constructor(props: MsgProps) {
    super(props)
    this.options = props.options
    this.state = {
      snackbars: []
    }
  }

  add(options: T) {
    this.setState((state) => {
      const lists = [...state.snackbars]
      const msgItem: MsgItem = { id: uuidv4(), ...options }
      lists.push(msgItem)
      return {
        snackbars: lists
      }
    })
  }

  removeItem(id: string) {
    this.setState((state) => {
      return {
        ...state,
        snackbars: state.snackbars.filter(item => item.id !== id)
      }
    })
  }

  render() {
    const eachAnchor = this.state.snackbars.reduce<Partial<AnchorGroup>>((last, current) => {
      const currentAnchor = current.anchorOrigin || "bottom-right"
      const exits = last[currentAnchor] || []
      return {
        ...last,
        [currentAnchor]: [...exits, current]
      }
    }, {})
    const eachSnackbars = (Object.keys(eachAnchor) as Categories[]).map((anchor) => {
      const origin = split(anchor, "-")
      const snackbars = eachAnchor[anchor] || []

      return (<SnackbarContainer key={anchor} anchorOrigin={{
        vertical: origin[0],
        horizontal: origin[1]
      }}>
        {snackbars.map(item => {
          if (!item.TransitionComponent) {
            item.TransitionComponent = withDefaultSlide(origin)
          }
          return (
            <SnackbarItem key={item.id}
                          option={item}
                          defaultOptions={defaultMsgConfig}
                          onTimeout={(id) => this.removeItem(id)} />
          )
        })}
      </SnackbarContainer>)
    })
    return <>
      {
        createPortal(<>
          Hello {eachSnackbars.length}
          {eachSnackbars}
        </>, document.body)
      }
    </>
  }
}

let msgIns: Msg | null = null
Msg.defineMsg = function(options, cb) {
  const div = document.createElement("div")
  ReactDOM.render(<Msg options={options} ref={(ins) => {
    msgIns = ins
    if (msgIns) cb?.(msgIns)
  }} />, div)
}
export const defineMsg = Msg.defineMsg
export const api = {
  open(msg, options = {}) {
    options.msg = msg

    if (msgIns) {
      msgIns.add(options)
    } else {
      defineMsg(defaultMsgConfig, (msgIns) => {
        msgIns.add(options)
      })
    }
  }
} as MsgApi;

(["info", "success", "error", "warning"] as const).forEach(type => {
  api[type] = (msg: string, ...rest) => {
    const [optOrFn, cb] = rest
    let options: MsgOptions = { color: type }

    if (optOrFn && typeof optOrFn === "object") {
      Object.assign(options, optOrFn)
    } else if (optOrFn && typeof optOrFn === "function") {
      options.cb = optOrFn
    }
    if (cb) options.cb = cb
    api.open(msg, options)
  }
})
