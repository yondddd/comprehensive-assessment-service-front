export interface CreateCheckRequestData {
  name: string
  type: number
}

export interface UpdateCheckRequestData {
  id: string
  name: string
}

export interface GetCheckRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
  /** 查询参数：学生姓名 */
  name: string
  /** 查询参数：工号 */
  jobNumber: string
}

export interface GetCheckData {
  id: string
  name: string
  jobNumber: string
  grade: string
  clazz: string
  majorScore: string
  majorMatchScore: string
  secondClassScore: string
  totalScore: string
  totalRanking: string
}

export type GetCheckResponseData = ApiPageResponseData<GetCheckData[]>
