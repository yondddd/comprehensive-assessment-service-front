import { request } from "@/utils/service"
import type * as User from "./types/student"

/** 增 */
export function createUserDataApi(data: User.CreateUserRequestData) {
  return request({
    url: "user",
    method: "post",
    data
  })
}

/** 删 */
export function deleteUserDataApi(id: string) {
  return request({
    url: `user/${id}`,
    method: "delete"
  })
}

/** 改 */
export function updateUserDataApi(data: User.UpdateUserRequestData) {
  return request({
    url: "user",
    method: "put",
    data
  })
}

/** 查 */
export function getUserDataApi(data: User.GetUserRequestData) {
  return request<User.GetUserResponseData>({
    url: "user/pageUser",
    method: "post",
    data
  })
}
