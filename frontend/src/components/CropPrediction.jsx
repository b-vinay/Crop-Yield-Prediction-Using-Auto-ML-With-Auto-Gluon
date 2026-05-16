import React from 'react';
import { Activity, ArrowRight, RefreshCw, AlertCircle, Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CROPS = ['Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane', 'Groundnut', 'Sunflower', 'Soybean', 'Chickpea', 'Urad', 'Jowar', 'Bajra', 'Barley', 'Rapeseed', 'Turmeric', 'Potato', 'Onion', 'Tomato', 'Brinjal', 'Cauliflower'];
const CROP_VARIETIES = ['High Yielding', 'Local', 'Hybrid', 'Traditional'];
const STATES = ['Andhra Pradesh', 'Maharashtra', 'Punjab', 'Gujarat', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Kerala', 'Goa', 'J&K', 'Meghalaya', 'Tripura', 'Assam', 'Bihar', 'Jharkhand'];
const SEASONS = ['Kharif', 'Rabi', 'Whole Year', 'Zaid'];
const WATER_SUPPLY = ['Rainfed', 'Irrigated - Well', 'Irrigated - Canal', 'Drip Irrigation', 'Sprinkler Irrigation'];
const SOIL_TYPES = ['Clay', 'Sandy', 'Loamy', 'Black', 'Red', 'Alluvial', 'Laterite', 'Peaty', 'Saline', 'Acidic'];
const SOIL_FERTILITY = ['High', 'Medium', 'Low'];
const MONTH_PERIODS = ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'];
const CULTIVATION_PRACTICES = ['Organic', 'Conventional', 'Integrated', 'Hydroponic', 'Aeroponic', 'Permaculture', 'Staking & Plastic Mulching', 'Broadcasting & Bio-humus', 'Paired Row Trench Method', 'Japanese Transplantation', 'Organic Manuring & Weeding', 'Wide Row Planting', 'Zero Tillage & Mulching', 'Weed Burial & Soil Loosening', 'Raised Bed & Drip', 'Direct Seeded Rice (DSR)', 'System of Rice Intensification (SRI)', 'Deep Ploughing & Pest Control', 'Seed Bed Preparation & Leveling', 'Leveling & Bio-humus', 'Ridges and Furrows Method', 'Weed Burial & Loosening', 'Ring Pit Method', 'Laser Land Leveling', 'Adding Bio-humus', 'Flat Bed & Weed Burial'];

export default function CropPrediction({ formData, handleChange, handleSubmit, loading, error, prediction, setPrediction }) {
  const { t } = useTranslation();

  return (
    <div className="prediction-tab fade-in">
      <h1 className="app-title" style={{ width: '100%' }}>
        <Sprout size={36} className="inline-block mr-3 mb-1" />
        {t('appTitle')}
      </h1>
      
      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fca5a5' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card">
        <div className="form-grid">
          
          <div className="input-group">
            <label htmlFor="crop_name">{t('cropName')}</label>
            <select className="input-field" id="crop_name" name="crop_name" value={formData.crop_name} onChange={handleChange}>
              {CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="crop_variety">{t('cropVariety')}</label>
            <select className="input-field" id="crop_variety" name="crop_variety" value={formData.crop_variety} onChange={handleChange}>
              {CROP_VARIETIES.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="season">{t('season')}</label>
            <select className="input-field" id="season" name="season" value={formData.season} onChange={handleChange}>
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="month_period">{t('monthPeriod')}</label>
            <select className="input-field" id="month_period" name="month_period" value={formData.month_period} onChange={handleChange}>
              {MONTH_PERIODS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="cultivation_practices">{t('cultivationPractices')}</label>
            <select className="input-field" id="cultivation_practices" name="cultivation_practices" value={formData.cultivation_practices} onChange={handleChange}>
              {CULTIVATION_PRACTICES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="fertilizers">{t('fertilizers')}</label>
            <input className="input-field" type="number" step="0.1" id="fertilizers" name="fertilizers" value={formData.fertilizers} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="water_supply">{t('waterSupply')}</label>
            <select className="input-field" id="water_supply" name="water_supply" value={formData.water_supply} onChange={handleChange}>
              {WATER_SUPPLY.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="soil_type">{t('soilType')}</label>
            <select className="input-field" id="soil_type" name="soil_type" value={formData.soil_type} onChange={handleChange}>
              {SOIL_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="state">{t('state')}</label>
            <select className="input-field" id="state" name="state" value={formData.state} onChange={handleChange}>
              {STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="soil_fertility">{t('soilFertility')}</label>
            <select className="input-field" id="soil_fertility" name="soil_fertility" value={formData.soil_fertility} onChange={handleChange}>
              {SOIL_FERTILITY.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="rainfall">{t('rainfall')}</label>
            <input className="input-field" type="number" step="0.1" id="rainfall" name="rainfall" value={formData.rainfall} onChange={handleChange} required />
          </div>

        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? (
            <><div className="spinner"></div> {t('processing')}</>
          ) : (
            <><Activity size={20} /> {t('predictYield')} <ArrowRight size={18} /></>
          )}
        </button>
      </form>

      {prediction !== null && !loading && (
        <div className="result-card" style={{ marginBottom: '2rem' }}>
          <div className="result-label">{t('predictedYield')}</div>
          <div className="result-value">
            {prediction} <span style={{fontSize: '1.5rem', opacity: 0.8}}>{t('tonnesPerHectare')}</span>
          </div>
          <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem'}}>
            {t('basedOnModel')}
          </p>
          <button 
            type="button" 
            style={{marginTop: '1.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem'}}
            onClick={() => setPrediction(null)}
          >
            <RefreshCw size={16} /> {t('reset')}
          </button>
        </div>
      )}
    </div>
  );
}
