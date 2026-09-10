import React, { useEffect, useState } from "react";

const WEATHER_API = "http://localhost:5000/api/weather";

function getWeatherIcon(code) {
  if (code === 0) return "☀️";
  if (code === 1 || code === 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 67) return "🌧️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 95) return "⛈️";

  return "🌤️";
}

function getRiskClass(level) {
  if (level === "HIGH") {
    return "border-red-400/40 bg-red-500/10 text-red-300";
  }

  if (level === "MODERATE") {
    return "border-yellow-400/40 bg-yellow-500/10 text-yellow-300";
  }

  return "border-[#74C69D]/40 bg-[#40916C]/10 text-[#B9FBC0]";
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-[#40916C]/20 bg-[#081C15]/70 p-4">
      <div className="text-2xl">{icon}</div>

      <p className="mt-3 text-xs text-[#74C69D]">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-[#D8F3DC]">
        {value}
      </p>
    </div>
  );
}

function RiskCard({ icon, title, level, score }) {
  return (
    <div
      className={`mt-4 rounded-2xl border p-5 ${getRiskClass(
        level
      )}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">
            {icon} {title}
          </p>

          <p className="mt-1 text-2xl font-black">
            {level}
          </p>
        </div>

        <div className="text-2xl font-black">
          {score}
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#081C15]">
        <div
          className="h-full rounded-full bg-[#B9FBC0] transition-all duration-700"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function WeatherSection() {
  const [weather, setWeather] = useState(null);

  const [locationName, setLocationName] =
    useState("Detecting your location...");

  const [searchLocation, setSearchLocation] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [locationLoading, setLocationLoading] =
    useState(false);

  const [error, setError] = useState("");

  // ------------------------------------------------
  // GET WEATHER FROM OUR BACKEND
  // ------------------------------------------------

  async function loadWeather(lat, lon, name = null) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${WEATHER_API}?lat=${lat}&lon=${lon}`
      );

      if (!response.ok) {
        throw new Error(
          "Weather server returned an error."
        );
      }

      const data = await response.json();

      setWeather(data);

      if (name) {
        setLocationName(name);
      }
    } catch (err) {
      console.error(err);

      setError(
        "Weather data could not be loaded. Please make sure the weather backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------------
  // REVERSE GEOCODING
  // CONVERT LAT/LON → CITY NAME
  // ------------------------------------------------

  async function getLocationName(lat, lon) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Location name unavailable");
      }

      const data = await response.json();

      const address = data.address || {};

      const city =
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        address.county ||
        "Current Location";

      const state = address.state || "";

      return state
        ? `${city}, ${state}`
        : city;
    } catch (err) {
      console.error(err);

      return "Current Location";
    }
  }

  // ------------------------------------------------
  // USE USER'S CURRENT LOCATION
  // ------------------------------------------------

  function useMyLocation() {
    if (!navigator.geolocation) {
      setError(
        "Geolocation is not supported by your browser."
      );
      return;
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const name = await getLocationName(
          lat,
          lon
        );

        setLocationName(name);

        await loadWeather(lat, lon, name);

        setLocationLoading(false);
      },

      (error) => {
        console.error(error);

        setLocationLoading(false);

        setError(
          "Location permission was not available. You can search for a city instead."
        );
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }

  // ------------------------------------------------
  // SEARCH ANY CITY
  // ------------------------------------------------

  async function searchWeather() {
    const query = searchLocation.trim();

    if (!query) {
      return;
    }

    try {
      setLocationLoading(true);
      setError("");

      // Open-Meteo Geocoding API
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=en&format=json`
      );

      if (!response.ok) {
        throw new Error(
          "Could not find this location."
        );
      }

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error(
          "Location not found."
        );
      }

      const place = data.results[0];

      const nameParts = [
        place.name,
        place.admin1,
        place.country,
      ].filter(Boolean);

      const name = nameParts.join(", ");

      await loadWeather(
        place.latitude,
        place.longitude,
        name
      );

      setSearchLocation("");
    } catch (err) {
      console.error(err);

      setError(
        "Location could not be found. Try entering a city name such as Kolkata, Delhi or Mumbai."
      );

      setLoading(false);
    } finally {
      setLocationLoading(false);
    }
  }

  // ------------------------------------------------
  // ENTER KEY SEARCH
  // ------------------------------------------------

  function handleSearchKeyDown(event) {
    if (event.key === "Enter") {
      searchWeather();
    }
  }

  // ------------------------------------------------
  // INITIAL LOCATION
  // ------------------------------------------------

  useEffect(() => {
    useMyLocation();
  }, []);

  // ------------------------------------------------
  // AUTO REFRESH
  // EVERY 10 MINUTES
  // ------------------------------------------------

  useEffect(() => {
    if (!weather || !weather.location) {
      return;
    }

    const interval = setInterval(() => {
      loadWeather(
        weather.location.latitude,
        weather.location.longitude,
        locationName
      );
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [weather, locationName]);

  return (
    <section
      id="weather"
      className="relative min-h-screen bg-[#081C15] px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#40916C]/40 bg-[#1B4332]/60 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#B9FBC0]">

            <span className="h-2 w-2 animate-pulse rounded-full bg-[#B9FBC0]" />

            Live Agricultural Intelligence

          </div>

          <h2 className="mt-6 text-4xl font-black text-[#D8F3DC] sm:text-5xl lg:text-6xl">
            Weather & Crop Risk
          </h2>

          <p className="mt-5 text-base leading-7 text-[#95D5B2] sm:text-lg">
            Select any location and transform live
            weather conditions into agricultural risk
            insights and practical field advisories.
          </p>

        </div>

        {/* LOCATION SELECTOR */}

        <div className="mb-6 rounded-3xl border border-[#40916C]/40 bg-[#1B4332]/60 p-7 backdrop-blur-xl sm:p-9">

          <div className="flex flex-col gap-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
                  📍 Select Monitoring Location
                </p>

                <p className="mt-2 text-sm text-[#95D5B2]">
                  Search any city or use your current location
                </p>

              </div>

              <div className="hidden text-sm font-semibold text-[#74C69D] sm:block">
                Weather updates automatically
              </div>

            </div>

            {/* SEARCH */}

            <div className="flex flex-col gap-3 md:flex-row">

              <input
                type="text"
                value={searchLocation}
                onChange={(event) =>
                  setSearchLocation(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
                placeholder="Enter city or location..."
                className="flex-1 rounded-2xl border border-[#40916C]/40 bg-[#081C15]/80 px-5 py-4 text-[#D8F3DC] outline-none placeholder:text-[#74C69D] focus:border-[#B9FBC0]"
              />

              <button
                onClick={searchWeather}
                disabled={locationLoading}
                className="rounded-2xl bg-[#B9FBC0] px-7 py-4 font-black text-[#081C15] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {locationLoading
                  ? "Loading..."
                  : "🔎 Search Weather"}
              </button>

            </div>

            {/* CURRENT LOCATION BUTTON */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs uppercase tracking-widest text-[#74C69D]">
                  Monitoring
                </p>

                <p className="mt-1 text-xl font-black text-[#D8F3DC]">
                  📍 {locationName}
                </p>

              </div>

              <button
                onClick={useMyLocation}
                disabled={locationLoading}
                className="rounded-2xl border border-[#74C69D]/40 bg-[#081C15]/80 px-6 py-4 font-bold text-[#B9FBC0] transition hover:border-[#B9FBC0] hover:bg-[#1B4332] disabled:cursor-not-allowed disabled:opacity-60"
              >
                📍{" "}
                {locationLoading
                  ? "Detecting..."
                  : "Use My Location"}
              </button>

            </div>

          </div>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="rounded-3xl border border-[#40916C]/30 bg-[#1B4332]/50 p-16 text-center">

            <div className="animate-pulse text-6xl">
              🌦️
            </div>

            <p className="mt-6 font-bold text-[#D8F3DC]">
              Analysing weather conditions...
            </p>

            <p className="mt-2 text-sm text-[#74C69D]">
              Connecting to the weather intelligence engine
            </p>

          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="mb-5 rounded-3xl border border-red-400/30 bg-red-500/10 p-8 text-center">

            <div className="text-5xl">
              ⚠️
            </div>

            <h3 className="mt-5 text-2xl font-black text-[#D8F3DC]">
              Weather service message
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-[#95D5B2]">
              {error}
            </p>

            <button
              onClick={useMyLocation}
              className="mt-7 rounded-xl bg-[#B9FBC0] px-6 py-3 font-black text-[#081C15] transition hover:bg-white"
            >
              Try My Location
            </button>

          </div>
        )}

        {/* MAIN WEATHER DASHBOARD */}

        {!loading && weather && (

          <>

            <div className="grid gap-5 lg:grid-cols-3">

              {/* CURRENT WEATHER */}

              <div className="rounded-3xl border border-[#40916C]/40 bg-[#1B4332]/60 p-7 backdrop-blur-xl sm:p-9 lg:col-span-2">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
                      Current Conditions
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#B9FBC0]">
                      📍 {locationName}
                    </p>

                    <p className="mt-1 text-xs text-[#74C69D]">
                      Coordinates:{" "}
                      {Number(
                        weather.location.latitude
                      ).toFixed(4)}
                      ,{" "}
                      {Number(
                        weather.location.longitude
                      ).toFixed(4)}
                    </p>

                  </div>

                  <div className="text-5xl">
                    {getWeatherIcon(
                      weather.current.weatherCode
                    )}
                  </div>

                </div>

                <div className="mt-8 flex items-end gap-5">

                  <div className="text-7xl font-black text-[#D8F3DC]">
                    {Math.round(
                      weather.current.temperature
                    )}
                    °
                  </div>

                  <div className="pb-2">

                    <p className="text-2xl font-bold text-[#D8F3DC]">
                      {weather.current.condition}
                    </p>

                    <p className="mt-1 text-[#74C69D]">
                      Live weather observation
                    </p>

                  </div>

                </div>

                <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">

                  <MetricCard
                    icon="💧"
                    label="Humidity"
                    value={`${weather.current.humidity}%`}
                  />

                  <MetricCard
                    icon="🌧️"
                    label="Rainfall"
                    value={`${weather.current.rainfall} mm`}
                  />

                  <MetricCard
                    icon="💨"
                    label="Wind"
                    value={`${weather.current.windSpeed} km/h`}
                  />

                  <MetricCard
                    icon="🌱"
                    label="Source"
                    value="Live API"
                  />

                </div>

              </div>

              {/* RISK ENGINE */}

              <div className="rounded-3xl border border-[#40916C]/40 bg-[#1B4332]/60 p-7 backdrop-blur-xl">

                <p className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
                  Agricultural Risk Engine
                </p>

                <RiskCard
                  icon="🦠"
                  title="Disease Risk"
                  level={
                    weather.agriculturalRisk.disease.level
                  }
                  score={
                    weather.agriculturalRisk.disease.score
                  }
                />

                <RiskCard
                  icon="🐛"
                  title="Pest Risk"
                  level={
                    weather.agriculturalRisk.pest.level
                  }
                  score={
                    weather.agriculturalRisk.pest.score
                  }
                />

                <p className="mt-5 text-xs leading-5 text-[#74C69D]">
                  Weather-based early warning indicator.
                  It does not replace expert crop diagnosis.
                </p>

              </div>

            </div>

            {/* ADVISORIES */}

            <div className="mt-5 rounded-3xl border border-[#40916C]/30 bg-[#1B4332]/50 p-7 sm:p-9">

              <p className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
                Smart Farm Advisory
              </p>

              <h3 className="mt-2 text-2xl font-black text-[#D8F3DC]">
                What the weather means for the field
              </h3>

              <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                {weather.agriculturalRisk.advisories.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-[#40916C]/20 bg-[#081C15]/70 p-5 transition hover:-translate-y-1 hover:border-[#74C69D]/50"
                    >

                      <div className="flex items-center gap-3">

                        <span className="text-xl">
                          {item.type === "warning"
                            ? "⚠️"
                            : item.type === "rain"
                            ? "🌧️"
                            : item.type === "heat"
                            ? "🌡️"
                            : "👁️"}
                        </span>

                        <h4 className="font-bold text-[#B9FBC0]">
                          {item.title}
                        </h4>

                      </div>

                      <p className="mt-4 text-sm leading-6 text-[#D8F3DC]">
                        {item.message}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* 7 DAY FORECAST */}

            <div className="mt-5 rounded-3xl border border-[#40916C]/30 bg-[#1B4332]/50 p-7 sm:p-9">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-widest text-[#74C69D]">
                    7-Day Forecast
                  </p>

                  <p className="mt-1 text-sm text-[#95D5B2]">
                    Weather outlook for agricultural planning
                  </p>

                </div>

                <span className="text-3xl">
                  📅
                </span>

              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">

                {weather.forecast.dates.map(
                  (date, index) => (

                    <div
                      key={date}
                      className="rounded-2xl border border-[#40916C]/20 bg-[#081C15]/70 p-4 text-center transition hover:-translate-y-1 hover:border-[#74C69D]/50"
                    >

                      <p className="text-xs font-bold text-[#74C69D]">
                        {new Date(
                          date
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            weekday: "short",
                          }
                        )}
                      </p>

                      <div className="mt-4 text-3xl">
                        {getWeatherIcon(
                          weather.forecast
                            .weatherCode[index]
                        )}
                      </div>

                      <p className="mt-3 text-xl font-black text-[#D8F3DC]">
                        {Math.round(
                          weather.forecast
                            .maxTemperature[index]
                        )}
                        °
                      </p>

                      <p className="mt-1 text-xs text-[#74C69D]">
                        Low{" "}
                        {Math.round(
                          weather.forecast
                            .minTemperature[index]
                        )}
                        °
                      </p>

                      <div className="mt-4 border-t border-[#40916C]/20 pt-3">

                        <p className="text-[10px] uppercase text-[#74C69D]">
                          Rain
                        </p>

                        <p className="mt-1 font-bold text-[#D8F3DC]">
                          {
                            weather.forecast
                              .rainProbability[index]
                          }
                          %
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* FOOTER */}

            <div className="mt-5 flex flex-col justify-between gap-2 text-xs text-[#74C69D] sm:flex-row">

              <span>
                📡 Live weather intelligence • Auto refreshed
              </span>

              <span>
                Weather: Open-Meteo • Risk: AgriShield AI
              </span>

            </div>

          </>

        )}

      </div>
    </section>
  );
}