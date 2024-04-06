import { request } from "@/utils/service"
import type * as Class from "./types/class"

/** 增 */
export function createClassDataApi(data: Class.CreateClassRequestData) {
  return request({
    url: "dept/add",
    method: "post",
    data
  })
}

/** 删 */
export function deleteClassDataApi(id: string) {
  return request({
    url: `dept/delete/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateClassDataApi(data: Class.UpdateClassRequestData) {
  return request({
    url: "dept/edit",
    method: "post",
    data
  })
}

/** 查 */
export function getClassDataApi(data: Class.GetClassRequestData) {
  return request<Class.GetClassResponseData>({
    url: "dept/pageDept",
    method: "post",
    data
  })
}

/**
 *
 * @param data
 * @returns 所有学院
 */
export function listAllCollegeApi() {
  return request<Class.GetClassResponseData>({
    url: "dept/listAllCollege",
    method: "post"
  })
}
