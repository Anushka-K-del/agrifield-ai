const http = require("http");
const https = require("https");

const PORT = 5000;

function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });

  res.end(JSON.stringify(data));
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error("Invalid response from weather service"));
          }
        });
      })
      .on("error", reject);
  });
}

function calculateAgriculturalRisk(weather) {
  const humidity = weather.current.relative_humidity_2m ?? 0;
  const rainfall = weather.daily.precipitation_sum?.[0] ?? 0;
  const rainProbability =
    weather.daily.precipitation_probability_max?.[0] ?? 0;

  // Disease risk:
  // Higher humidity + rainfall probability = greater disease pressure.
  let diseaseScore =
    humidity * 0.55 +
    rainProbability * 0.30 +
    Math.min(rainfall * 2, 30);

  diseaseScore = Math.round(Math.min(100, diseaseScore));

  // Pest risk is influenced by warmer conditions and lower rainfall.
  const temperature = weather.current.temperature_2m ?? 0;

  let pestScore =
    Math.max(0, Math.min(100, temperature * 2.5)) * 0.55 +
    (100 - Math.min(rainProbability, 100)) * 0.25 +
    20;

  pestScore = Math.round(Math.min(100, pestScore));

  function getLevel(score) {
    if (score >= 70) return "HIGH";
    if (score >= 40) return "MODERATE";
    return "LOW";
  }

  const advisories = [];

  if (diseaseScore >= 70) {
    advisories.push({
      type: "warning",
      title: "High Disease Risk",
      message:
        "High humidity and rainfall-favorable conditions may increase disease pressure. Inspect crop leaves frequently for early symptoms.",
    });
  } else if (diseaseScore >= 40) {
    advisories.push({
      type: "watch",
      title: "Moderate Disease Risk",
      message:
        "Weather conditions may support disease development. Continue regular crop scouting.",
    });
  } else {
    advisories.push({
      type: "safe",
      title: "Low Disease Risk",
      message:
        "Current weather conditions are less favorable for disease development. Continue routine monitoring.",
    });
  }

  if (pestScore >= 70) {
    advisories.push({
      type: "warning",
      title: "High Pest Risk",
      message:
        "Warm conditions may increase pest activity. Inspect crops regularly and monitor pest populations.",
    });
  } else if (pestScore >= 40) {
    advisories.push({
      type: "watch",
      title: "Moderate Pest Risk",
      message:
        "Continue regular field scouting and monitor pest populations before taking control measures.",
    });
  } else {
    advisories.push({
      type: "safe",
      title: "Low Pest Risk",
      message:
        "Current conditions indicate relatively low pest pressure. Continue routine field monitoring.",
    });
  }

  if (rainProbability >= 70) {
    advisories.push({
      type: "rain",
      title: "Rainfall Advisory",
      message:
        "Rain is likely. Monitor drainage and avoid unnecessary foliar spraying immediately before rainfall.",
    });
  } else {
    advisories.push({
      type: "weather",
      title: "Weather Watch",
      message:
        "No major rainfall event is currently expected. Continue monitoring upcoming weather changes.",
    });
  }

  return {
    disease: {
      score: diseaseScore,
      level: getLevel(diseaseScore),
    },
    pest: {
      score: pestScore,
      level: getLevel(pestScore),
    },
    advisories,
  };
}

async function getWeather(latitude, longitude) {
  const url =
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}` +
    `&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,weather_code" +
    "&forecast_days=7" +
    "&timezone=auto";

  const weather = await fetchJSON(url);

  const current = weather.current;

  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    80: "Rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail",
  };

  return {
    location: {
      latitude,
      longitude,
    },

    current: {
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      rainfall: current.precipitation,
      windSpeed: current.wind_speed_10m,
      weatherCode: current.weather_code,
      condition:
        weatherCodes[current.weather_code] || "Unknown",
    },

    forecast: {
      dates: weather.daily.time,
      maxTemperature:
        weather.daily.temperature_2m_max,
      minTemperature:
        weather.daily.temperature_2m_min,
      rainfall:
        weather.daily.precipitation_sum,
      rainProbability:
        weather.daily.precipitation_probability_max,
      weatherCode:
        weather.daily.weather_code,
    },

    agriculturalRisk: calculateAgriculturalRisk(weather),

    source: "Open-Meteo",
    fetchedAt: new Date().toISOString(),
  };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJSON(res, 200, { status: "ok" });
    return;
  }

  const requestURL = new URL(
    req.url,
    `http://localhost:${PORT}`
  );

  // Health check
  if (requestURL.pathname === "/api/health") {
    sendJSON(res, 200, {
      status: "online",
      service: "AgriShield AI Weather Backend",
      version: "2.0.0",
      timestamp: new Date().toISOString(),
    });

    return;
  }

  // Weather endpoint
  if (requestURL.pathname === "/api/weather") {
    const latitude = Number(
      requestURL.searchParams.get("lat")
    );

    const longitude = Number(
      requestURL.searchParams.get("lon")
    );

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      sendJSON(res, 400, {
        error: "Invalid location",
        message:
          "Please provide valid latitude and longitude values.",
      });

      return;
    }

    try {
      const result = await getWeather(
        latitude,
        longitude
      );

      sendJSON(res, 200, result);
    } catch (error) {
      console.error("Weather API error:", error);

      sendJSON(res, 502, {
        error: "Weather service unavailable",
        message:
          "Unable to retrieve weather data at the moment.",
      });
    }

    return;
  }

  sendJSON(res, 404, {
    error: "Endpoint not found",
  });
});

server.listen(PORT, () => {
  console.log(
    `🌱 AgriShield Weather Backend running at http://localhost:${PORT}`
  );
});