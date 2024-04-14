import { request } from "@/utils/service"
import type * as notice from "./types/notice"

/** 增 */
export function createNoticeDataApi(data: notice.CreateNoticeRequestData) {
  return request({
    url: "dept",
    method: "post",
    data
  })
}

/** 删 */
export function deleteNoticeDataApi(id: string) {
  return request({
    url: `college/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateNoticeDataApi(data: notice.UpdateNoticeRequestData) {
  return request({
    url: "college",
    method: "put",
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
