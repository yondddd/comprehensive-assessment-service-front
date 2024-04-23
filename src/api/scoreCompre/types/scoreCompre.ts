export interface CreateCompreRequestData {
  grade: string
  projectType: string
  projectName: string
  prizeLevel: string
  prizeRanking: string
  applyScore: string
  attachment: string
  opinion: string
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
  projectName: string
  type: number
  org: boolean
}

export interface GetCompreData {
  id: string
  name: string
  jobNumber: string
  type: string
  score: string
  material: string
  applyTime: string
  status: number
  college: string
  clazz: string
}

export interface StatusData {
  id: string
  name: string
}

export interface projectType {
  id: string
  name: string
}

export interface scholarType {
  id: string
  name: string
}

export interface DeleteCompreRequestData {
  id: number
  status: number
  compre: boolean
}

export interface SaveScholarshipApplyRequestData {
  scholarshipType: string
  prize: string
}

export type GetCompreResponseData = ApiPageResponseData<GetCompreData[]>
