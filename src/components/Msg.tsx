import { NoticeContainer } from "/@/components/NotifyProvider"
import { Alert, AlertProps } from "@mui/material"
import React from "react"
import ReactDOM from "react-dom"

export type MsgConfig = {
  severity?: AlertProps["severity"],
  color?: AlertProps["severity"] | string
} & AlertProps

export const defaultMsgConfig: MsgConfig = {
  color: "info"
}


class Msg extends NoticeContainer {
  static defineMsg: (options: MsgConfig, cb?: (ins: Msg) => void) => void

  constructor(props: any) {
    super(props)
  }

  render() {
    return <>
    </>
  }
}

let msgIns: Msg | null = null
Msg.defineMsg = function(options, cb) {
  const div = document.createElement("div")
  ReactDOM.render(<Msg {...options} ref={(ins) => {
    msgIns = ins
    if (msgIns) cb?.(msgIns)
  }} />, div)
}
export const defineMsg = Msg.defineMsg
export const api = {
  info: (msg: string) => {
    if (msgIns) {
      msgIns.info(msg)
    } else {
      Msg.defineMsg(defaultMsgConfig, (msgIns) => {
        msgIns.info(msg)
        console.log("set now???", msgIns)
      })
      console.log("info log", msgIns)
    }
  }
}
