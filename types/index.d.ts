import { ReactNode } from "react"

/**
 * basic usages
 * import { api } from "@aolyang/notify"
 *
 * api.info("this is a info type message")
 *
 * export const infoMsg = (msg: string) => {
 *   api.info(msg, {
 *     ...someConfigs
 *   })
 * }
 * */

export type MixTuple<T1, T2> = T1 extends string ? T2 extends string ? `${T1}-${T2}` : string : string

export type NotifyOptions = {
  severity?: Severity
  color?: Severity | string
  anchorOrigin?: MixTuple<"top" | "bottom", "left" | "center" | "right">
  autoHideDuration?: number
  // Alert
  variant?: "filled" | "outlined" | "standard"
  icon?: ReactNode
  action?: ReactNode
  content?: ReactNode
}
export type Severity = "info" | "error" | "success" | "warning"
export type NotifyFunction<T> = {
  (msg: string, options?: T): Promise<boolean>
}
export type MsgFunction<T> = NotifyFunction<T>

export interface MsgApi<T> extends NotifyApi<T> {
}

export interface NotifyApi<T> extends Record<Severity, NotifyFunction<T>> {
  open: NotifyFunction<T>
}

export declare const api: MsgApi<NotifyOptions>
// declare const _default: {
//   api: MsgApi
// }
// export default _default
