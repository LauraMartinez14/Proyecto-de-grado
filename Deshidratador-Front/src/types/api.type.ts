export interface IAPIResponse<ResponseType> {
  ok: boolean
  data: ResponseType
  message: string
}