import { request } from "@/utils/service"
import type * as compre from "./types/scoreCompre"

/** 增 */
export function createCompreDataApi(data: compre.CreateCompreRequestData) {
  return request({
    url: "score/addComprehensive",
    method: "post",
    data
  })
}

/** 删 */
export function deleteCompreDataApi(id: string) {
  return request({
    url: `college/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateCompreDataApi(data: compre.UpdateCompreRequestData) {
  return request({
    url: "college",
    method: "put",
    data
  })
}

/** 查 */
export function getCompreDataApi(data: compre.GetCompreRequestData) {
  return request<compre.GetCompreResponseData>({
    url: "score/comprehensivePage",
    method: "post",
    data
  })
}
