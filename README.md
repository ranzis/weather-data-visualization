# Weather Data Visualization



## How to run

1. **Install dependencies**


   npm install


2. **Place the weather database**

   - Place `weather.sqlite` in the root folder directory .
   - Make sure the DB is accessible to server components.

3. **Run the dev server**

 npm run dev


4. **Open in browser**
   - Go to http://localhost:3000
     
   - The page will show last 30 days by default, or any range via URL.


---

## Features

- **Date Range Picker:** Select any custom date range using a modern calendar popup (shadcn/ui).
- **Live Chart:** Interactive, responsive line chart with two series: daily min and max temperatures.
- **Default Range:** Shows the last 30 days of data by default.
- **Sharable URLs:** Every selected date range is encoded in the URL (query params) — so sharing a link always shows the same data and selection.
- **Data Persistence:** Reloading the page preserves the selected date range and visualization.
- **Modern UI:** Uses Tailwind CSS and [shadcn/ui](https://ui.shadcn.com/) for a clean, production-ready design.
- **Performance:** Server-side API endpoints efficiently aggregate daily min/max data via SQL.

---

## Architectural Decision: Server-Side Data Fetch

All database queries and data aggregation are performed on the server (via API routes and server functions).  
This approach ensures:

- **Security:** The SQLite database is never exposed to the client, and all SQL queries are parameterized to prevent injection.
- **Performance:** Data processing (such as daily aggregation of min/max temperature) is done efficiently by the database engine, minimizing data transfer and client CPU usage.
- **Scalability:** The frontend only receives ready-to-visualize, minimal JSON data, making the app fast and responsive even for large datasets.
- **Best Practices:** This separation of concerns is the standard for modern full-stack applications, especially with Next.js App Router.

---

## Requirement Mapping

**The implementation addresses each assignment requirement as follows:**

1. **Web page with time range selection and chart (a):**
   - The main page includes a modern date range picker (calendar popup) and a responsive chart.
2. **Default range is the last 30 days (b):**
   - On first load (no URL parameters), the app automatically displays the last 30 days of data.
3. **Persistence of selected time range after reload (c):**
   - The selected range is always reflected in the URL; refreshing the page reloads the same range.
4. **Sharable link for specific range (d):**
   - Every selection updates the URL (`?start=YYYY-MM-DD&end=YYYY-MM-DD`). Sharing the link shows the exact same data to another user.
5. **Chart with two lines: daily min and max (2a):**
   - The chart always shows two series: minimum temperature (blue), maximum temperature (red). Legend included.
   - All daily min/max aggregation is calculated in SQL on the server.

---

## Folder Structure

```
src/
  app/
    page.tsx                 # Main page - handles routing, state, and rendering
    components/
      WeatherChart.tsx       # Responsive, animated chart (Recharts + Framer Motion)
      DateRangePicker.tsx    # Calendar date range picker (shadcn/ui)
    api/
      weather/
        route.ts             # API endpoint for weather data (SQL aggregation)
    hooks/
      useWeatherData.ts      # Custom hook for fetching and caching data
    db.ts                    # DB utility for SQLite connections
    theme.ts                 # (optional) Tailwind/theme config
  types/
    weather.ts               # Type definitions (e.g., DailyWeather)
public/
  weather.sqlite             # The SQLite DB with hourly temperature data
```

---

## How it works

### 1. Data Flow

- The frontend (`page.tsx`) displays a DateRangePicker and a WeatherChart.
- When the user selects a date range, the app updates the URL with query params (`start`, `end`).
- On every change, the frontend fetches `/api/weather?start=...&end=...` — which executes an **SQL query** on the server:
  - Aggregates the daily `MIN(temperature)` and `MAX(temperature)` for each day in the selected city and range.
  - Returns an array of `{ day, minTemp, maxTemp }`.
- The chart is rendered responsively, with skeletons and animation, for great UX.

---


## Technologies used

- [Next.js 14+](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [date-fns](https://date-fns.org/) / [dayjs](https://day.js.org/) (for date formatting)



---

## Use of SWR

SWR (Stale-While-Revalidate) is a lightweight data fetching library for React that provides efficient client-side data fetching, caching, and automatic updates.  
We chose SWR in this project because it offers:

- **Simplicity:** An easy-to-use React hook API for fetching and caching server data.
- **Performance:** Minimizes unnecessary network requests with intelligent caching, keeping the UI fast and responsive.
- **Great UX:** Data is always available instantly from the cache and automatically updated in the background, so the chart and interface are always up to date.
- **Error and loading state management:** Built-in handling of loading skeletons and error messages.
- **Modern standard:** Widely adopted in Next.js and modern React projects for client-side fetching.

In this project, the custom hook `useWeatherData` uses SWR to fetch and cache the weather data for the selected date range, ensuring the chart updates in real time whenever the user changes the range.

## If I had more time

- Add city selector (support for multiple cities).
- Add chart zoom/pan, or aggregate to weekly/monthly if range is large.
- Add export options (CSV/PDF/PNG).
- Advanced tooltips and better mobile legend UX.
- Productionize DB connections (connection pool, better error handling).
- Full E2E and unit tests, code coverage.
- Deploy live to Vercel with test DB.

---

## Security & Code Quality Notes

- All SQL is parameterized to prevent injection.
- All data processing is on the server for security and scalability.
- No sensitive data ever sent to the client.
- Code is modular, typed (TypeScript), with clear separation of concerns.
- Ready for production with error handling and clean UI/UX.

---
