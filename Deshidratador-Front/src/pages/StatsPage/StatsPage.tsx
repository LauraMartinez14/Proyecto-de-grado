import { useEffect } from "react";
import { getAllData } from "../../store/slices/sensorsData";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { LineChart } from "../../components/LineChart/LineChart";

const StatsPage = () => {
  const { data } = useAppSelector((state) => state.sensorsData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, []);
  return (
    <div className="mt-10 bg-white p-8 rounded-2xl flex justify-center">
      <LineChart
        className="h-80"
        data={data}
        index="date"
        categories={["temperature", "humidity"]}
        valueFormatter={(number: number) =>
          `${Intl.NumberFormat("us").format(number).toString()}`
        }
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
};

export default StatsPage;
