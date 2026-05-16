import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { User, X, LayoutTemplate } from 'lucide-react';

import './i18n'; // Initialize i18n
import './index.css';

import LanguageSwitcher from './components/LanguageSwitcher';
import Login from './components/Login';
import BottomNav from './components/BottomNav';
import CropPrediction from './components/CropPrediction';
import WeatherPanel from './components/WeatherPanel';
import IncomeCalculator from './components/IncomeCalculator';

const PREDICT_URL = 'http://localhost:8000/predict';

function App() {
  const { t } = useTranslation();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('prediction');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('predictionHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  React.useEffect(() => {
    localStorage.setItem('predictionHistory', JSON.stringify(history));
  }, [history]);

  const [formData, setFormData] = useState({
    crop_name: 'Rice',
    crop_variety: 'High Yielding',
    season: 'Kharif',
    month_period: 'Jul-Sep',
    cultivation_practices: 'Conventional',
    fertilizers: 100,
    water_supply: 'Irrigated - Canal',
    soil_type: 'Alluvial',
    state: 'Maharashtra',
    soil_fertility: 'Medium',
    rainfall: 1200
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);
    
    try {
      const response = await axios.post(PREDICT_URL, formData);
      const yieldResult = response.data.yield_prediction;
      setPrediction(yieldResult);
      
      // Add to history
      setHistory(prev => [
        {
          id: Date.now(),
          crop: formData.crop_name,
          date: new Date().toLocaleDateString(),
          yield: yieldResult
        },
        ...prev
      ]);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to connect to the backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LanguageSwitcher />
      
      <button 
        onClick={() => !isLoggedIn && setShowLogin(true)} 
        style={{ position: 'fixed', top: '1.5rem', right: '11rem', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.5rem', background: isLoggedIn ? 'rgba(16, 185, 129, 0.7)' : 'rgba(30, 41, 59, 0.7)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', cursor: isLoggedIn ? 'default' : 'pointer', outline: 'none', transition: 'background 0.3s' }}
        onMouseOver={(e) => { if (!isLoggedIn) e.currentTarget.style.background = 'rgba(59, 130, 246, 0.5)' }}
        onMouseOut={(e) => { if (!isLoggedIn) e.currentTarget.style.background = 'rgba(30, 41, 59, 0.7)' }}
      >
        <User size={18} color={isLoggedIn ? "#fff" : "#3b82f6"} />
        <span style={{ fontWeight: 500 }}>{isLoggedIn ? 'Logged In' : 'Login'}</span>
      </button>

      {showLogin && !isLoggedIn && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '450px' }}>
            <button 
              onClick={() => setShowLogin(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10, transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.5)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={16} />
            </button>
            <Login onLoginSuccess={() => { setShowLogin(false); setIsLoggedIn(true); }} />
          </div>
        </div>
      )}

      {/* Main Mobile App Container */}
      <div className="app-container">
        <div className="tab-content">
          {activeTab === 'prediction' && (
            <CropPrediction
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
              prediction={prediction}
              setPrediction={setPrediction}
            />
          )}

          {activeTab === 'weather' && <WeatherPanel />}
          
          {activeTab === 'income' && <IncomeCalculator predictedYield={prediction} />}
          
          {activeTab === 'history' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="screen-header">History</div>
              {history.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, color: 'var(--text-muted)' }}>
                  <LayoutTemplate size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>No History Yet</h3>
                  <p>Your previous predictions will appear here.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {history.map(item => (
                    <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '1.2rem' }}>{item.crop}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>{item.yield}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>tonnes/ha</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
              <LayoutTemplate size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>Settings</h3>
              <p>Application preferences.</p>
            </div>
          )}
        </div>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
}

export default App;
