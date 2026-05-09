export interface ISensor {
    id: number;
    air: number;
    uvIndex: number;
    humidity: number;
    temperature: number;
}


export type ISensorCreate = Omit<ISensor, 'id'>; 
  