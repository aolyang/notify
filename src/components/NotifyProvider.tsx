import React, { Component } from "react"
import type { NotifyOptions } from "../../types"
import { NotifyApi } from "../../types"

type ContainerProps<T> = {
  theme?: boolean
  options?: T
}
type ContainerStates<T> = {
  theme: boolean
  snackbars: T[]
}

const defaultOptions: NotifyOptions = {}

export class NoticeContainer<S extends NotifyOptions>
  extends Component<ContainerProps<S>, ContainerStates<S & { msg?: string, cb?: () => void }>>
  implements NotifyApi<S> {

  private readonly options: S

  constructor(props: ContainerProps<S>) {
    super(props)
    this.options = Object.assign({}, defaultOptions, props.options) as S
    this.state = {
      theme: false,
      snackbars: []
    }
  }

  add(msg: string, type: string, options?: S & { msg?: string, cb?: () => void }) {
    return new Promise<boolean>(resolve => {
      if (!options) {
        options = { ...this.options }
      } else {
        options = Object.assign<{}, S, S>({}, this.options, { ...options })
      }
      options.msg = msg
      options.cb = () => {
        resolve(true)
      }
      this.setState((state) => {
        state.snackbars.push(options!)
        return {
          ...state,
          snackbars: state.snackbars
        }
      })
    })
  }

  open(msg: string, options?: S) {
    return this.add(msg, "default", options)
  }

  info(msg: string, options?: S) {
    return this.add(msg, "info", options)
  }

  warning(msg: string, options?: S) {
    return this.add(msg, "warning", options)
  }

  success(msg: string, options?: S) {
    return this.add(msg, "success", options)
  }

  error(msg: string, options?: S) {
    return this.add(msg, "error", options)
  }

  render() {
    return <></>
  }
}

// export const NoticeContext = createContext<MsgApi>({} as MsgApi)
//
// export function NotifyProvider<T>(props: PropsWithChildren<{}>) {
//   const noticeRef = createRef<NoticeContainer<T>>()
//
//   const setMsg = (type: Severity | "open") => (msg: string, options?: T): Promise<boolean> => {
//     return noticeRef.current?.[type](msg, options)
//   }
//   return <NoticeContext.Provider value={{
//     open: setMsg("open"),
//     info: setMsg("info"),
//     warning: setMsg("warning"),
//     success: setMsg("success"),
//     error: setMsg("error")
//   }}>
//     <NoticeContainer<T> ref={noticeRef} />
//     {props.children}
//   </NoticeContext.Provider>
// }
//
// export function useNotify() {
//   return useContext(NoticeContext)
// }
