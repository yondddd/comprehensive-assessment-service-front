import { request } from "@/utils/service"
import type * as notice from "./types/notice"

/** 增 */
export function createNoticeDataApi(data: notice.CreateNoticeRequestData) {
  return request({
    url: "notice/save",
    method: "post",
    data
  })
}

/** 删 */
export function deleteNoticeDataApi(data: notice.DelNoticeRequestData) {
  return request({
    url: "notice/del",
    method: "post",
    data
  })
}

/** 改 */
export function updateNoticeDataApi(data: notice.UpdateNoticeRequestData) {
  return request({
    url: "notice/save",
    method: "post",
    data
  })
}

/** 查 */
export function getNoticeDataApi(data: notice.GetNoticeRequestData) {
  return request<notice.GetNoticeResponseData>({
    url: "notice/list",
    method: "post",
    data
  })
}
