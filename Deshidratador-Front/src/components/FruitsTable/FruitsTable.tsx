import { useState } from "react";

import { useAppDispatch } from "../../hooks/store";
import { sendConfigPresetFruitData } from "../../store/slices/sensorsData";

import { presetsData } from "../../types/presetsData";

const fruitsData = [{
    fruit: "Manzana",
    temperature: 55,
    humidity: 20,
    air: 150
  },
  {
    fruit: "Naranja",
    temperature: 55,
    humidity: 55,
    air: 170
  }, 
  {
    fruit: "Piña",
    temperature: 58,
    humidity: 15,
    air: 180
  }, 
  ]

const FruitsTable = () => {
  const [selectedFruit, setSelectedFruit] = useState<presetsData | null>(null);

  const dispatch = useAppDispatch();

  const handleSelectFruit = async (fruit: presetsData) => {
    await dispatch(sendConfigPresetFruitData(fruit));
    
    setSelectedFruit(fruit);
  };

    return (
        <div className="space-y-4">
          {/* Tabla de frutas */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase bg-gray-50 text-[#173555]">
                <tr>
                  <th scope="col" className="px-6 py-3">Fruto</th>
                  <th scope="col" className="px-6 py-3">Temperatura</th>
                  <th scope="col" className="px-6 py-3">Humedad</th>
                  <th scope="col" className="px-6 py-3">Aire</th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {fruitsData.map((fruit, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-[#486F99]">
                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                      {fruit.fruit}
                    </th>
                    <td className="px-6 py-4">{`${fruit.temperature} C`}</td>
                    <td className="px-6 py-4">{`${fruit.humidity}%`}</td>
                    <td className="px-6 py-4">{`${fruit.air} PWM`}</td>
                    <td className="px-6 py-4 flex justify-center">
                      <button 
                        onClick={() => handleSelectFruit(fruit)}
                        className="bg-[#486F99] px-4 py-2 rounded-lg text-white font-semibold hover:bg-[#3a5a7a] transition-colors"
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Mostrar la fruta seleccionada */}
          {selectedFruit && (
            <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-[#173555] mb-2">Fruto seleccionado:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Nombre:</p>
                  <p>{selectedFruit.fruit}</p>
                </div>
                <div>
                  <p className="font-medium">Temperatura:</p>
                  <p>{selectedFruit.temperature} °C</p>
                </div>
                <div>
                  <p className="font-medium">Humedad:</p>
                  <p>{selectedFruit.humidity}%</p>
                </div>
                <div>
                  <p className="font-medium">Aire:</p>
                  <p>{selectedFruit.air} PWM</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

export default FruitsTable