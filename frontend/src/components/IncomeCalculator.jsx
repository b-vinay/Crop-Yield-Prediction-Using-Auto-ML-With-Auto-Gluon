import React, { useState } from 'react';
import { Landmark, Search, IndianRupee } from 'lucide-react';

export default function IncomeCalculator({ predictedYield }) {
  const [formData, setFormData] = useState({
    yield: predictedYield || 5.41,
    landSize: 1,
    marketPrice: '',
    inputCost: ''
  });
  
  const [result, setResult] = useState(null);

  const calculateIncome = () => {
    const y = Number(formData.yield) || 0;
    const land = Number(formData.landSize) || 0;
    const price = Number(formData.marketPrice) || 0;
    const cost = Number(formData.inputCost) || 0;
    
    // 1 Hectare = 2.47 acres. Total yield in tonnes.
    const totalYieldTonnes = y * (land / 2.47);
    const totalYieldQuintals = totalYieldTonnes * 10;
    
    const grossIncome = totalYieldQuintals * price;
    const totalCost = land * cost;
    const netProfit = grossIncome - totalCost;

    setResult({
      gross: Math.round(grossIncome),
      cost: Math.round(totalCost),
      net: Math.round(netProfit)
    });
  };

  const mspPrices = [
    { name: 'Rice', icon: '🌾', msp: 2300, mkt: 2450 },
    { name: 'Wheat', icon: '🌿', msp: 2275, mkt: 2400 },
    { name: 'Maize', icon: '🌽', msp: 2090, mkt: 2150 },
    { name: 'Cotton', icon: '☁️', msp: 7121, mkt: 7500 },
    { name: 'Sugarcane', icon: '🎋', msp: 340, mkt: 380 },
    { name: 'Mirchi', icon: '🌶️', msp: 5500, mkt: 8000 },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="income-tab fade-in">
      <div className="screen-header">Income Calculator</div>

      {/* Income Estimator Title Card */}
      <div className="card" style={{ background: 'var(--primary-hover)', display: 'flex', alignItems: 'center', gap: '1rem', color: '#000' }}>
        <div style={{ fontSize: '2rem' }}>💰</div>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Income Estimator</h3>
          <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Enter details to calculate expected profit</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="input-group">
          <label>Yield (tonnes/ha)</label>
          <input type="number" name="yield" className="input-field" value={formData.yield} onChange={handleChange} />
        </div>
        
        <div className="input-group">
          <label>Land Size (acres)</label>
          <input type="number" name="landSize" className="input-field" value={formData.landSize} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Market Price (₹/quintal)</label>
          <input type="number" name="marketPrice" className="input-field" placeholder="e.g. 2000" value={formData.marketPrice} onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Input Cost (₹/acre)</label>
          <input type="number" name="inputCost" className="input-field" placeholder="e.g. 15000" value={formData.inputCost} onChange={handleChange} />
        </div>

        <button className="submit-btn" style={{ background: 'var(--primary)', color: '#0b1c0e' }} onClick={calculateIncome}>
          Calculate Income
        </button>

        {result !== null && (
          <div className="result-card fade-in" style={{ marginTop: '1rem', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span>Gross Income</span>
              <span>₹{result.gross.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ef4444', fontSize: '0.9rem' }}>
              <span>Total Cost (-)</span>
              <span>₹{result.cost.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--panel-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="result-label" style={{ color: 'var(--text-main)', fontWeight: 600 }}>Estimated Profit</span>
              <span className="result-value" style={{ margin: 0, fontSize: '2rem' }}>₹{result.net.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* MSP Prices Banner */}
      <div className="card-blue" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem' }}>
        <Landmark size={32} color="#fff" />
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>MSP Prices 2025-26</h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Govt. Minimum Support Price — Tap to use in calculator</p>
        </div>
      </div>

      {/* Mandi Prices Section */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Mandi Prices</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Updated: 29 Mar '26</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <select className="input-field" style={{ flex: 1, padding: '0.8rem' }} defaultValue="Rice">
            <option value="Rice">Rice</option>
          </select>
          <select className="input-field" style={{ flex: 1, padding: '0.8rem' }} defaultValue="Telangana">
            <option value="Telangana">Telangana</option>
          </select>
          <select className="input-field" style={{ flex: 1, padding: '0.8rem' }} defaultValue="All">
            <option value="All">All Districts</option>
          </select>
        </div>
        <button className="submit-btn" style={{ marginTop: 0, padding: '0.8rem' }}>
          <Search size={18} /> Search
        </button>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
          Select crop, state & district then tap Search
        </p>
      </div>

      {/* MSP List */}
      <div className="card" style={{ background: 'transparent', border: '1px solid var(--panel-border)', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.2rem', borderBottom: '1px solid var(--panel-border)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem' }}>MSP Prices 2025-26</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Govt. Minimum Support Price — Tap to use in calculator</p>
        </div>
        <div>
          {mspPrices.map((item, i) => (
            <div 
              key={i} 
              onClick={() => {
                setFormData(prev => ({ ...prev, marketPrice: item.mkt }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', borderBottom: i < mspPrices.length - 1 ? '1px solid var(--panel-border)' : 'none', background: 'var(--bg-color)', margin: '0.5rem 1rem', borderRadius: '12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MSP (Guaranteed) | Market Price</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 500 }}>MSP: ₹{item.msp}/Q</div>
                <div style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }}>Mkt: ₹{item.mkt}/Q</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1rem 1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
          <Landmark size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>MSP is the minimum price guaranteed by Government of India. Market price may be higher. Tap any crop to auto-fill market price.</span>
        </div>
      </div>
    </div>
  );
}
