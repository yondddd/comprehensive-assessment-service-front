export interface CreateUserRequestData {
  name: string
  type: number
}

export interface UpdateUserRequestData {
  id: string
  name: string
}

export interface GetUserRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
  /** 查询参数：学院名 */
  name: string
  jobNumber: string
  roleId: number
  /** 查询参数：状态 */
  status: number
}

export interface GetUserData {
  id: string
  collegeName: string
  className: string
  jobNumber: string
  mobile: string
  email: string
  idCard: string
  name: string
  creationTime: string
  status: number
  gender: number
}

export interface StatusData {
  id: string
  name: string
}

export type GetUserResponseData = ApiPageResponseData<GetUserData[]>
