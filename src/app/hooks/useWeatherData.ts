import useSWR from "swr";
import { DailyWeather } from "../types/weather";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useWeatherData(start: string, end: string, city = "New York") {
  const { data, error, isLoading } = useSWR<DailyWeather[]>(
    `/api/weather?start=${start}&end=${end}&city=${encodeURIComponent(city)}`,
    fetcher
  );
  return { data, error, isLoading };
}
