/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  code: number
  data: T
  message: string
}

interface ApiPageResponseData<T> {
  code: number
  data: T
  message: string
  total: number
  pageNo: number
  pageSize: number
}
