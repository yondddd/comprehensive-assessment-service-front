export interface LoginRequestData {
  /** admin 或 editor */
  username: "admin" | "editor"
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{
  userId: number
  guid: string
  username: string
  mobile: string
  email: string
  jobNumber: string
  orgId: number
  orgName: string
  roles: string[]
  classInfo: string
}>
