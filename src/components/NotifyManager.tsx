import { NoticeContainer } from "/@/components/NotifyProvider"

function notice() {

}

export let messageInstance = {
  open: notice
}
NoticeContainer.createNotice = function() {

}
export const createNotice = NoticeContainer.createNotice
