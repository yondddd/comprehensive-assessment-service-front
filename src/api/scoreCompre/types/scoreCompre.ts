export interface CreateCompreRequestData {
  name: string
  jobNumber: string
  type: number
  projectName: string
  level: number
  ranking: number
  score: number
}

export interface UpdateCompreRequestData {
  id: string
  name: string
}

export interface GetCompreRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
}

export interface GetCompreData {
  name: string
  jobNumber: string
  type: string
  score: string
  material: string
  applyTime: string
  status: number
}

export interface StatusData {
  id: string
  name: string
}

export type GetCompreResponseData = ApiPageResponseData<GetCompreData[]>
