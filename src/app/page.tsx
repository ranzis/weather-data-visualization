"use client";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { DateRangePicker } from "./components/DateRangePicker";
import { WeatherChart } from "./components/WeatherChart";
import { useWeatherData } from "./hooks/useWeatherData";

function getDefaultRange() {
  const end = dayjs().format("YYYY-MM-DD");
  const start = dayjs().subtract(30, "day").format("YYYY-MM-DD");
  return { start, end };
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRange = getDefaultRange();

  const start = searchParams.get("start") || defaultRange.start;
  const end = searchParams.get("end") || defaultRange.end;

  const { data, error, isLoading } = useWeatherData(start, end);

  const handleRangeChange = (start: string, end: string) => {
    router.push(`/?start=${start}&end=${end}`);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-br from-white to-slate-100 py-10 px-2">
      {/* הגרף למעלה */}
      {isLoading && (
        <div className="my-4 text-xl animate-pulse">Loading...</div>
      )}
      {error && (
        <div className="my-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl shadow">
          Failed to load data
        </div>
      )}
      {data && <WeatherChart data={data} />}
      <DateRangePicker start={start} end={end} onChange={handleRangeChange} />
    </main>
  );
}
