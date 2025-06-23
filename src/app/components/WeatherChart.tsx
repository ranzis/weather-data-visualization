import { Card } from "@/components/ui/card";
import { DailyWeather } from "../types/weather";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

type Props = { data: DailyWeather[] };

export function WeatherChart({ data }: Props) {
  return (
    <div className="w-full">
      <Card className="w-full max-w-6xl mx-auto rounded-3xl shadow-2xl bg-white">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-900 text-center pt-8">
          Weather Data Visualization
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 36 }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 13 }}
                minTickGap={24}
                angle={-25}
                textAnchor="end"
                interval="preserveStartEnd"
              />
              <YAxis
                domain={["auto", "auto"]}
                tickFormatter={(v) => `${v}°C`}
              />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="minTemp"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 5, stroke: "#0ea5e9", fill: "#fff" }}
                name="Min Temp"
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="#f43f5e"
                strokeWidth={3}
                dot={{ r: 5, stroke: "#f43f5e", fill: "#fff" }}
                name="Max Temp"
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
