import React, { useState, useEffect } from 'react';
import { Search, MapPin, Droplets, Wind, Thermometer, AlertTriangle, CloudRain } from 'lucide-react';
import axios from 'axios';

export default function WeatherPanel() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (lat, lon, locationName) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
      
      setWeather({
        location: locationName,
        current: res.data.current,
        daily: res.data.daily
      });
    } catch (err) {
      setError('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      if (res.data.results && res.data.results.length > 0) {
        const { latitude, longitude, name, admin1, country } = res.data.results[0];
        fetchWeather(latitude, longitude, `${name}, ${admin1 || country}`);
      } else {
        setError('Location not found.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to search location.');
      setLoading(false);
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, 'Your Location');
        },
        () => {
          setError('Geolocation permission denied.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    // Default location
    fetchWeather(17.3850, 78.4867, 'Hyderabad, Telangana');
  }, []);

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'; // Clear
    if (code >= 1 && code <= 3) return '⛅'; // Partly cloudy
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '🌥️';
  };

  const getWeatherDesc = (code) => {
    if (code === 0) return 'Clear Sky';
    if (code >= 1 && code <= 3) return 'Partly Cloudy';
    if (code >= 45 && code <= 48) return 'Foggy';
    if (code >= 51 && code <= 67) return 'Rainy';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="weather-tab fade-in">
      <div className="screen-header">Farm Weather</div>

      {/* Search and Location */}
      <div className="form-grid" style={{ marginBottom: '1.2rem' }}>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <div className="input-field" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1rem' }}>
            <Search size={18} color="var(--primary)" />
            <input 
              type="text" 
              placeholder="Search city or district..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchLocation()}
              style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
            />
          </div>
          <button onClick={searchLocation} style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '0 1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <MapPin size={20} />
          </button>
        </div>
        
        <button onClick={detectLocation} style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', color: 'var(--primary)', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', fontWeight: 500, cursor: 'pointer' }}>
          <MapPin size={18} /> Detect My Location
        </button>
      </div>

      {loading && <div style={{ textAlign: 'center', margin: '2rem 0' }}>Loading weather data...</div>}
      {error && <div style={{ color: '#ef4444', textAlign: 'center', margin: '1rem 0' }}>{error}</div>}

      {!loading && weather && (
        <>
          {/* Main Weather Card */}
          <div className="card-blue">
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{weather.location}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {getWeatherDesc(weather.current.weather_code)}
              </p>
            </div>
            
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '3rem' }}>
              {getWeatherIcon(weather.current.weather_code)}
            </div>
            
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <div className="weather-temp">{weather.current.temperature_2m}°C</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Feels Like: {weather.current.apparent_temperature}°C</div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="weather-stats-grid">
            <div className="weather-stat-card">
              <Droplets size={24} color="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{weather.current.relative_humidity_2m}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Humidity</div>
            </div>
            <div className="weather-stat-card">
              <Wind size={24} color="#a78bfa" />
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{weather.current.wind_speed_10m} m/s</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Wind Speed</div>
            </div>
            <div className="weather-stat-card">
              <Thermometer size={24} color="#ef4444" />
              <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{weather.current.apparent_temperature}°C</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Feels Like</div>
            </div>
          </div>

          {/* Advices */}
          {weather.current.precipitation > 0 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(weather.current.weather_code) ? (
            <div className="card sowing-advice" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ color: '#eab308', fontSize: '0.85rem', fontWeight: 600 }}>Sowing Advice</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <AlertTriangle size={18} color="#eab308" /> Delay sowing — rainy conditions
              </div>
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Sowing Advice</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <AlertTriangle size={18} color="var(--primary)" /> Favorable conditions for sowing
              </div>
            </div>
          )}

          {weather.current.precipitation > 0 || weather.current.relative_humidity_2m > 80 ? (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              <div style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>Irrigation Advice</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                <CloudRain size={18} color="var(--primary)" /> No need to irrigate today
              </div>
            </div>
          ) : (
             <div className="card sowing-advice" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <div style={{ color: '#eab308', fontSize: '0.85rem', fontWeight: 600 }}>Irrigation Advice</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                 <AlertTriangle size={18} color="#eab308" /> Dry conditions — Irrigate your crops
               </div>
             </div>
          )}

          {/* Forecast */}
          <h3 style={{ fontSize: '1.1rem', marginTop: '1.5rem' }}>5-Day Forecast</h3>
          <div className="forecast-scroll">
            {weather.daily.time.slice(0, 5).map((date, i) => (
              <div key={i} className="forecast-item">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{i === 0 ? 'Today' : getDayName(date)}</span>
                <span style={{ fontSize: '1.5rem' }}>{getWeatherIcon(weather.daily.weather_code[i])}</span>
                <span style={{ fontWeight: 600 }}>{Math.round(weather.daily.temperature_2m_max[i])}°</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{Math.round(weather.daily.temperature_2m_min[i])}°</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
