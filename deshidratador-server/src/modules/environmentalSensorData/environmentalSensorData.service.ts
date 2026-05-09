import { Op } from "sequelize";
import moment from 'moment-timezone';

import Sensor, {SensorCreationAttributes} from "./environmentalSensorData.model";

import { ISensorCreate, IServiceResponse } from "../../types";

async function getEnvironmentalSensorData (): Promise<IServiceResponse<Sensor[]>> {
    // TODO:  change to get the last 7 days of data
    const today = moment().startOf('day');
    const tomorrow = moment().add(1, 'day').startOf('day');
    
    const data = await Sensor.findAll({
        where: {
            createdAt: {
                [Op.gte]: today.toDate(),
                [Op.lt]: tomorrow.toDate()
            }
        },
        order: [['createdAt', 'DESC']]
    });
    
    return {
        data,
        message: 'Sensors fetched successfully',
        ok: true
    }
}

async function getEnvironmentalSensorDataById (id: number): Promise<IServiceResponse<Sensor | null>> {
    // const sensor = sensors.find(sensor => sensor.id === id);
    // return sensor || null;
    const data = await Sensor.findByPk(id);
    if (!data) {
        return {
            data: null,
            message: 'Sensor not found',
            ok: false
        }
    }

    return {
        data,
        message: 'Sensor fetched successfully',
        ok: true
    }
}

async function createEnvironmentalSensorData (sensor: ISensorCreate): Promise<IServiceResponse<Sensor | null>> {
    // const newSensor = {
    //     id: Date.now(),
    //     ...sensor,
    // }x
    // sensors.push(newSensor);
    const newSensor = await Sensor.create(sensor);
    if (!newSensor) {
        return {
            data: null,
            message: 'Sensor not created',
            ok: false
        }
    }

    return {
        data: newSensor,
        message: 'Sensor created successfully',
        ok: true
    }
}

async function updateEnvironmentalSensorData (id: number, sensor: Partial<SensorCreationAttributes>): Promise<IServiceResponse<Sensor | null>> {
    // opcion 1
    // return Sensor.update(sensor, { where: { id }});
    
    // opcion 2
    const sensorData = await Sensor.findByPk(id);
    if (!sensorData) {
        return {
            data: null,
            message: 'Sensor data not found',
            ok: false
        };
    }
    const response = await sensorData.update({
        humidity: sensor.humidity,
        temperature: sensor.temperature,
    });
    return {
        data: response,
        message: 'Sensor updated successfully',
        ok: true
    }
}

async function deleteEnvironmentalSensorData (id: number): Promise<IServiceResponse<Sensor | null>> {
    // sensors = sensors.filter(sensor => sensor.id !== id);
    // return {
    //     "message": "sensor deleted successfully"
    // }
    // const response = await Sensor.destroy({ where: { id } });
    const sensorData = await Sensor.findByPk(id);
    if (!sensorData) {
        return {
            data: null,
            message: 'Sensor data not found',
            ok: false
        };
    }
    await sensorData.destroy();
    return {
        data: sensorData,
        message: 'Sensor deleted successfully',
        ok: true
    }
}

type DailyData = {
    date: Date;
    averages: {
        humidity: number;
        temperature: number;
    };
    min: {
        humidity: number;
        temperature: number;
    };
    max: {
        humidity: number;
        temperature: number;
    };
    samplesCount: number;
}

type ResponseAverageData = {
    from: Date;
    to: Date;
    dailyData: DailyData[];
}

async function getAverageEnvironmentalSensorData(from: string, to: string): Promise<IServiceResponse<ResponseAverageData | null>> {
    const fromDate = moment(from).startOf('day');
    const toDate = moment(to).endOf('day');

    console.log('fromDate', fromDate.toDate())
    console.log('toDate', toDate.toDate())
    
    const data = await Sensor.findAll({
        where: {
            createdAt: {
                [Op.gte]: fromDate.toDate(),
                [Op.lte]: toDate.toDate()
            }
        },
        order: [['createdAt', 'ASC']]
    });

    if (data.length === 0) {
        return {
            data: {
                from: fromDate.toDate(),
                to: toDate.toDate(),
                dailyData: []
            },
            message: 'No se encontraron datos para el rango de fechas especificado',
            ok: true
        };
    }

    // Agrupar datos por día usando moment
    const dailyGroups = data.reduce((groups, reading) => {
        const dateKey = moment(reading.createdAt).tz('America/La_Paz').format('YYYY-MM-DD');

        if (!groups[dateKey]) {
            groups[dateKey] = {
                date: moment(reading.createdAt).tz('America/La_Paz').startOf('day').toDate(),
                readings: [],
                min: {
                    temperature: reading.temperature,
                    humidity: reading.humidity
                },
                max: {
                    temperature: reading.temperature,
                    humidity: reading.humidity
                },
                sum: {
                    temperature: 0,
                    humidity: 0
                }
            };
        }

        groups[dateKey].readings.push(reading);
        groups[dateKey].min.temperature = Math.min(groups[dateKey].min.temperature, reading.temperature);
        groups[dateKey].min.humidity = Math.min(groups[dateKey].min.humidity, reading.humidity);
        groups[dateKey].max.temperature = Math.max(groups[dateKey].max.temperature, reading.temperature);
        groups[dateKey].max.humidity = Math.max(groups[dateKey].max.humidity, reading.humidity);
        groups[dateKey].sum.temperature += reading.temperature;
        groups[dateKey].sum.humidity += reading.humidity;

        return groups;
    }, {} as Record<string, any>);

    // Convertir los grupos en el formato de respuesta
    const dailyData: DailyData[] = Object.values(dailyGroups).map(group => ({
        date: group.date,
        averages: {
            temperature: +(group.sum.temperature / group.readings.length).toFixed(2),
            humidity: +(group.sum.humidity / group.readings.length).toFixed(2)
        },
        min: {
            temperature: +group.min.temperature.toFixed(2),
            humidity: +group.min.humidity.toFixed(2)
        },
        max: {
            temperature: +group.max.temperature.toFixed(2),
            humidity: +group.max.humidity.toFixed(2)
        },
        samplesCount: group.readings.length
    }));

    return {
        data: {
            from: fromDate.toDate(),
            to: toDate.toDate(),
            dailyData
        },
        message: 'Datos diarios obtenidos exitosamente',
        ok: true
    };
}

async function getLastEnvironmentalSensorData(): Promise<IServiceResponse<Sensor | null>> {

    try {
        console.log('getting last data')
        const lastData = await Sensor.findAll({
            order: [['createdAt', 'DESC']]
        });
        if (!lastData) {
            return {
                data: null,
                message: 'No se encontraron datos de la ultima lectura',
                ok: true
            };
        }

        if (lastData.length === 0) {
            return {
                data: null,
                message: 'No se encontraron datos de la ultima lectura, datos vacios',
                ok: false
            };
        }
    
        return {
            data: lastData[0],
            message: 'Datos del último sensor obtenidos exitosamente',
            ok: true
        };
    } catch (error) {
        console.error('Error al obtener los datos del último sensor', error);
        return {
            data: null,
            message: 'Error al obtener los datos del último sensor',
            ok: false
        };
    }
}


export default {
    getEnvironmentalSensorData,
    getEnvironmentalSensorDataById,
    createEnvironmentalSensorData,
    updateEnvironmentalSensorData,
    deleteEnvironmentalSensorData,
    getAverageEnvironmentalSensorData,
    getLastEnvironmentalSensorData
  }
