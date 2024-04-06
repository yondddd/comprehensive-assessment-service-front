export interface CreateClassRequestData {
  name: string
  type: number
}

export interface UpdateClassRequestData {
  id: string
  name: string
}

export interface GetClassRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
  /** 查询参数：班级名 */
  name: string
  /** 查询参数：类型 */
  type: number
  /** 查询参数：学院id */
  parentId: number
}

export interface GetClassData {
  id: string
  parentName: string
  name: string
  remake: string
  creationTime: string
  status: number
}

export type GetClassResponseData = ApiPageResponseData<GetClassData[]>
