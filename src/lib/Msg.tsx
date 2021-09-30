import React, { Component, ReactNode } from "react"
import ReactDOM, { createPortal } from "react-dom"
import SnackbarContainer from "/@/components/SnackbarContainer"
import SnackbarItem from "/@/components/SnackbarItem"
import { uuidv4 } from "/@/components/utils"
import { CSSTransition } from "react-transition-group"

export type NotNull<T> = T extends undefined ? never : T
export type MixTuple<T1, T2> = T1 extends string ? T2 extends string ? `${T1}-${T2}` : string : string

export interface MsgOptions {
  severity?: Severity
  color?: Severity | string
  anchorOrigin?: MixTuple<"top" | "bottom", "left" | "center" | "right">
  autoHideDuration?: number
  // Alert
  variant?: "filled" | "outlined" | "standard"
  icon?: ReactNode
  action?: ReactNode
  content?: ReactNode
  msg?: string
  cb?: MsgFunction
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

type Categories = NotNull<MsgOptions["anchorOrigin"]>
type AnchorGroup = Record<Categories, MsgItem[]>

export const defaultMsgConfig: MsgOptions = {
  severity: "info",
  color: "info",
  anchorOrigin: "bottom-right",
  autoHideDuration: 3000,
  variant: "standard"
}

type Split<T extends string, S extends string> = T extends `${infer V}${S}${infer H}` ? [V, H] : string[]
const split = <T extends string, S extends string>(str: T, divider: S): Split<T, S> => {
  return str.split(divider) as any
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
    console.log("set state ?????")
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
          return (<CSSTransition key={item.id} timeout={3000}>
            <SnackbarItem option={item}
                          onTimeout={(id) => this.removeItem(id)} />
          </CSSTransition>)
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
      Msg.defineMsg(defaultMsgConfig, (msgIns) => {
        msgIns.add(options)
      })
    }
  }
} as MsgApi;

(["info", "success", "error", "warning"] as const).forEach(type => {
  api[type] = (msg: string, ...rest) => {
    const [oOrF, cb] = rest
    let options: MsgOptions = { color: type }
    if (oOrF && typeof oOrF === "object") {
      Object.assign(options, oOrF)
    } else if (oOrF && typeof oOrF === "function") {
      options.cb = oOrF
    }
    if (cb) options.cb = cb
    api.open(msg, options)
  }
})
