import React, { useEffect, useState } from "react";

export default function WeatherSection() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchWeather() {
    try {
      setLoading(true);
      setError("");

      // Kolkata coordinates for testing
      const response = await fetch(
        "http://localhost:5000/api/weather?lat=22.5726&lon=88.3639"
      );

      if (!response.ok) {
        throw new Error("Weather request failed");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Unable to load weather data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section
      id="weather"
      className="relative py-24 px-6 bg-[#081C15] text-[#D8F3DC]"
    >
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <p className="text-[#74C69D] font-bold uppercase tracking-widest text-sm">
            🌦 Smart Weather Intelligence
          </p>

          <h2 className="text-4xl md:text-6xl font-black mt-3">
            Weather & Crop Risk
          </h2>

          <p className="text-[#95D5B2] mt-4 max-w-2xl mx-auto">
            Live weather conditions transformed into agricultural risk
            insights and field-level advisories.
          </p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="text-4xl animate-pulse">🌦️</div>
            <p className="mt-4 text-[#95D5B2]">
              Analysing current weather conditions...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center p-6 rounded-2xl border border-red-400/30 bg-red-500/10">
            <p>{error}</p>

            <button
              onClick={fetchWeather}
              className="mt-4 px-5 py-2 rounded-xl bg-[#B9FBC0] text-[#081C15] font-bold"
            >
              Retry
            </button>
          </div>
        )}

        {weather && !loading && (
          <>
            {/* Current Weather */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              <div className="lg:col-span-2 rounded-3xl p-8 bg-[#1B4332]/70 border border-[#40916C]/40">
                <p className="text-[#95D5B2] text-sm">
                  CURRENT CONDITIONS
                </p>

                <div className="flex flex-wrap items-end gap-5 mt-4">
                  <h3 className="text-6xl font-black">
                    {weather.current.temperature}°
                  </h3>

                  <div className="pb-2">
                    <p className="text-2xl font-bold">
                      {weather.current.condition}
                    </p>
                    <p className="text-[#95D5B2]">
                      Live weather conditions
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-8">

                  <div className="p-4 rounded-2xl bg-[#081C15]/60">
                    <p className="text-xl">💧</p>
                    <p className="text-xs text-[#95D5B2] mt-2">
                      Humidity
                    </p>
                    <p className="text-xl font-bold">
                      {weather.current.humidity}%
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#081C15]/60">
                    <p className="text-xl">🌧️</p>
                    <p className="text-xs text-[#95D5B2] mt-2">
                      Rainfall
                    </p>
                    <p className="text-xl font-bold">
                      {weather.current.rainfall} mm
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#081C15]/60">
                    <p className="text-xl">💨</p>
                    <p className="text-xs text-[#95D5B2] mt-2">
                      Wind
                    </p>
                    <p className="text-xl font-bold">
                      {weather.current.windSpeed} km/h
                    </p>
                  </div>

                </div>
              </div>

              {/* Risk */}
              <div className="rounded-3xl p-8 bg-[#1B4332]/70 border border-[#40916C]/40">
                <p className="text-[#95D5B2] text-sm">
                  AGRICULTURAL RISK
                </p>

                <div className="mt-6">
                  <p className="text-sm text-[#95D5B2]">
                    🦠 Disease Risk
                  </p>

                  <p className="text-3xl font-black mt-1">
                    {weather.agriculturalRisk.disease.level}
                  </p>

                  <div className="h-2 bg-[#081C15] rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-[#B9FBC0]"
                      style={{
                        width: `${weather.agriculturalRisk.disease.score}%`
                      }}
                    />
                  </div>

                  <p className="text-xs mt-2 text-[#95D5B2]">
                    {weather.agriculturalRisk.disease.score}/100
                  </p>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-[#95D5B2]">
                    🐛 Pest Risk
                  </p>

                  <p className="text-3xl font-black mt-1">
                    {weather.agriculturalRisk.pest.level}
                  </p>

                  <div className="h-2 bg-[#081C15] rounded-full mt-3 overflow-hidden">
                    <div
                      className="h-full bg-[#74C69D]"
                      style={{
                        width: `${weather.agriculturalRisk.pest.score}%`
                      }}
                    />
                  </div>

                  <p className="text-xs mt-2 text-[#95D5B2]">
                    {weather.agriculturalRisk.pest.score}/100
                  </p>
                </div>
              </div>
            </div>

            {/* Advisories */}
            <div className="mt-5 rounded-3xl p-8 bg-[#1B4332]/50 border border-[#40916C]/30">
              <p className="text-[#95D5B2] text-sm">
                🌱 SMART FARM ADVISORY
              </p>

              <div className="mt-5 grid md:grid-cols-3 gap-4">
                {weather.agriculturalRisk.advisories.map(
                  (advisory, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-[#081C15]/70"
                    >
                      <span className="text-[#B9FBC0] font-bold">
                        Advisory {index + 1}
                      </span>

                      <p className="text-sm text-[#D8F3DC] mt-3 leading-6">
                        {advisory}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* 7 Day Forecast */}
            <div className="mt-5 rounded-3xl p-8 bg-[#1B4332]/50 border border-[#40916C]/30">
              <p className="text-[#95D5B2] text-sm">
                📅 7-DAY FORECAST
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-5">
                {weather.forecast.dates.map((date, index) => (
                  <div
                    key={date}
                    className="p-4 rounded-2xl bg-[#081C15]/70 text-center"
                  >
                    <p className="text-xs text-[#95D5B2]">
                      {new Date(date).toLocaleDateString("en-IN", {
                        weekday: "short"
                      })}
                    </p>

                    <p className="text-2xl mt-3">
                      {weather.forecast.rainProbability[index] >= 60
                        ? "🌧️"
                        : weather.forecast.rainProbability[index] >= 30
                        ? "⛅"
                        : "☀️"}
                    </p>

                    <p className="font-bold mt-2">
                      {weather.forecast.maxTemperature[index]}°
                    </p>

                    <p className="text-xs text-[#95D5B2]">
                      Rain {weather.forecast.rainProbability[index]}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-[#74C69D] mt-6">
              Weather intelligence powered by live forecast data •
              Agricultural risk is an advisory indicator, not a disease diagnosis.
            </p>
          </>
        )}
      </div>
    </section>
  );
}