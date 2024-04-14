export interface CreateNoticeRequestData {
  name: string
  type: number
}

export interface UpdateNoticeRequestData {
  id: string
  name: string
}

export interface GetNoticeRequestData {
  /** 当前页码 */
  pageNo: number
  /** 查询条数 */
  pageSize: number
  title: string
}

export interface GetNoticeData {
  id: string
  name: string
  title: string
  content: string
  creationTime: string
  status: number
}

export type GetNoticeResponseData = ApiPageResponseData<GetNoticeData[]>
