export interface INotification {
  id: number
  detail: string
  type: string
  state: string
  sensorRecordId: number
  createdAt: string
  updatedAt: string
  sensor: ISensorData
}

export interface ISensorData {
  id: number
  temperature: number
  humidity: number
  uvIndex: number
  createdAt: string
  updatedAt: string
}
