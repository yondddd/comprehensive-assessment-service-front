import { request } from "@/utils/service"
import type * as Check from "./types/check"

/** 增 */
export function createCheckDataApi(data: Check.CreateCheckRequestData) {
  return request({
    url: "dept",
    method: "post",
    data
  })
}

/** 删 */
export function deleteCheckDataApi(id: string) {
  return request({
    url: `college/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateCheckDataApi(data: Check.UpdateCheckRequestData) {
  return request({
    url: "college",
    method: "put",
    data
  })
}

/** 查 */
export function getCheckDataApi(data: Check.GetCheckRequestData) {
  return request<Check.GetCheckResponseData>({
    url: "check/page",
    method: "post",
    data
  })
}
