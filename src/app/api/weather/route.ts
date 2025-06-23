import { NextRequest } from "next/server";
import { openDb } from "../../utils/db";
import { DailyWeather } from "../../types/weather";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const city = searchParams.get("city") || "Tel Aviv Yafo";
  if (!start || !end) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
  }
  const db = await openDb();
  try {
    const rows: DailyWeather[] = await db.all(
      `
      SELECT date(time) as day,
             MIN(temperature) as minTemp,
             MAX(temperature) as maxTemp
      FROM temperature_hourly
      WHERE city = ?
        AND time BETWEEN ? AND ?
      GROUP BY day
      ORDER BY day
      `,
      [city, start, end]
    );
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "DB error" }), { status: 500 });
  } finally {
    await db.close();
  }
}
