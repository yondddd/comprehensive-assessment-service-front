import { request } from "@/utils/service"
import type * as compre from "./types/scoreCompre"

/** 增 */
export function createCompreDataApi(data: compre.CreateCompreRequestData) {
  return request({
    url: "score/saveComprehensive",
    method: "post",
    data
  })
}

/** 删 */
export function deleteCompreDataApi(data: compre.DeleteCompreRequestData) {
  return request({
    url: "score/updateStatus",
    method: "post",
    data
  })
}

/** 改 */
export function updateCompreDataApi(data: compre.UpdateCompreRequestData) {
  return request({
    url: "score/saveComprehensive",
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

/** 增 */
export function saveScholarshipApply(data: compre.CreateCompreRequestData) {
  return request({
    url: "score/saveScholarshipApply",
    method: "post",
    data
  })
}
