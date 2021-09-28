import { NoticeContainer } from "/@/components/NotifyProvider"
import React from "react"
import ReactDOM, { createPortal } from "react-dom"
import { MsgApi, NotifyOptions } from "../../types"


export const defaultMsgConfig: NotifyOptions = {
  color: "info"
}


class Msg extends NoticeContainer<NotifyOptions> implements MsgApi<NotifyOptions>{
  static defineMsg: (options: NotifyOptions, cb?: (ins: Msg) => void) => void

  constructor(props: { theme?: boolean; options?: NotifyOptions }) {
    super(props)
  }

  render() {
    return <>
      Hello Msg
      {createPortal(<div>{"children"}
        {this.state.snackbars.map((msg, index) => {
          return <h4 key={index}>{msg.color}: {msg.msg}</h4>
        })}
      </div>, document.body)}
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
  open(msg, options) {
    return new Promise<boolean>(resolve => {
      const type = options?.severity || "open"
      if (msgIns) {
        console.log("api ins", msgIns)
        msgIns[type](msg)
      } else {
        Msg.defineMsg(defaultMsgConfig, (msgIns) => {
          msgIns[type](msg)
        })
      }
      resolve(true)
    })
  }
} as MsgApi<NotifyOptions>;

(["info", "success", "error", "warning"] as const).forEach(type => {
  api[type] = (msg: string, options?) => {
    return new Promise<boolean>(resolve => {
      api.open(msg, options).then(res => {
        resolve(res)
      })
    })
  }
})
