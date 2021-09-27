import { ReactNode } from "react"

export type Severity = "info" | "error" | "success" | "warning"
export type IconType = Record<Severity, ReactNode>
export type NotifyFunction = {
  (msg: string, options?: any): Promise<boolean>
}

export interface NoticeProvided extends Record<Severity, NotifyFunction>{

}
