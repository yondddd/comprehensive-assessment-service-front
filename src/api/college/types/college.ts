export interface CreateCollegeRequestData {
  name: string
  type: number
}

export interface UpdateCollegeRequestData {
  id: string
  name: string
}

export interface GetCollegeRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
  /** 查询参数：学院名 */
  name: string
  /** 查询参数：类型 */
  type: number
}

export interface GetCollegeData {
  id: string
  name: string
  remake: string
  creationTime: string
  status: number
}

export type GetCollegeResponseData = ApiPageResponseData<GetCollegeData[]>
