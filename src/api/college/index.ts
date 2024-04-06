import { request } from "@/utils/service"
import type * as College from "./types/college"

/** 增 */
export function createCollegeDataApi(data: College.CreateCollegeRequestData) {
  return request({
    url: "dept",
    method: "post",
    data
  })
}

/** 删 */
export function deleteCollegeDataApi(id: string) {
  return request({
    url: `college/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateCollegeDataApi(data: College.UpdateCollegeRequestData) {
  return request({
    url: "college",
    method: "put",
    data
  })
}

/** 查 */
export function getCollegeDataApi(data: College.GetCollegeRequestData) {
  return request<College.GetCollegeResponseData>({
    url: "dept/pageDept",
    method: "post",
    data
  })
}
