import React, {
  Component,
  createContext, createRef,
  useContext,
} from "react"
import ReactDOM from "react-dom"

import type { PropsWithChildren } from "react"
import type { NoticeProvided } from "../../types"
import { Severity } from "../../types"

export const NoticeContext = createContext<NoticeProvided>({} as NoticeProvided)

type ContainerProps = {
  theme?: boolean
}
type ContainerStates = {
  theme: boolean
  snackbars: any[]
}

export class NoticeContainer extends Component<ContainerProps, ContainerStates> {
  static createNotice: () => void
  state = {
    snackbars: [],
    theme: false
  }

  constructor(props: any) {
    super(props)
  }

  add(msg: string, options: {
    type: Severity
  }) {
    console.log(msg, options.type)
  }

  info(msg: string, options?: any) {
    this.add(msg, { type: "info", ...options })
  }

  warning(msg: string, options?: any) {
    this.add(msg, { type: "warning", ...options })
  }

  success(msg: string, options?: any) {
    this.add(msg, { type: "success", ...options })
  }

  error(msg: string, options?: any) {
    this.add(msg, { type: "error", ...options })
  }

  render() {
    return <></>
  }
}

export function NotifyProvider(props: PropsWithChildren<{}>) {
  const noticeRef = createRef<NoticeContainer>()

  const setMsg = (type: Severity) => (msg: string, options?: any): Promise<boolean> => {
    return noticeRef.current?.[type](msg, options) as any
  }
  return <NoticeContext.Provider value={{
    info: setMsg("info"),
    warning: setMsg("warning"),
    success: setMsg("success"),
    error: setMsg("error")
  }}>
    <NoticeContainer ref={noticeRef} />
    {props.children}
  </NoticeContext.Provider>
}

export function useNotify() {
  return useContext(NoticeContext)
}
