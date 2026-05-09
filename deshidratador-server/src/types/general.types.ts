export interface IServiceResponse<DataType> {
  data: DataType;
  message: string;
  ok: boolean;
}