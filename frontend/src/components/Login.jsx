import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, Lock, ChevronRight, Activity } from 'lucide-react';

const AUTH_URL = 'http://localhost:8000/auth';

const Login = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const [method, setMethod] = useState('phone');
  const [contact, setContact] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!contact) return;
    setLoading(true);
    setError('');
    try {
      await axios.post(`${AUTH_URL}/request-otp`, { contact });
      setOtpSent(true);
      setOtp('1234');
      alert(`Mock SMS Sent to ${contact}!\n\nAuto-filled OTP 1234 for testing purposes.`);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to request OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${AUTH_URL}/verify-otp`, { contact, otp });
      if (res.data.token) {
        onLoginSuccess(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Activity size={48} color="var(--primary)" style={{ margin: '0 auto', marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '2rem', background: 'linear-gradient(135deg, #34d399, #3b82f6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
          {t('welcomeBack')}
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Secure Authentication</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => {setMethod('phone'); setOtpSent(false); setContact(''); setError('');}}
          style={{ flex: 1, padding: '0.8rem', background: method === 'phone' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', border: method === 'phone' ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
          <Phone size={18} /> {t('loginPhone')}
        </button>
        <button 
          onClick={() => {setMethod('email'); setOtpSent(false); setContact(''); setError('');}}
          style={{ flex: 1, padding: '0.8rem', background: method === 'email' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', border: method === 'email' ? '1px solid #3b82f6' : '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.3s' }}>
          <Mail size={18} /> {t('loginEmail')}
        </button>
      </div>

      {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

      {!otpSent ? (
        <form onSubmit={handleRequestOtp}>
          <div className="input-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label>{method === 'phone' ? t('enterPhone') : t('enterEmail')}</label>
            <input 
              type={method === 'phone' ? 'tel' : 'email'} 
              className="input-field" 
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder={method === 'phone' ? '+91 9876543210' : 'user@example.com'}
              required
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : <>{t('requestOTP')} <ChevronRight size={20}/></>}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} style={{ animation: 'fadeIn 0.5s' }}>
          <div className="input-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <label>{t('enterOTP')}</label>
            <input 
              type="text" 
              className="input-field" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="1234"
              maxLength={4}
              required
              style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.5rem' }}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="spinner"></div> : <><Lock size={18}/> {t('verifyOTP')}</>}
          </button>
          <button type="button" onClick={() => {setOtpSent(false); setError('');}} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', marginTop: '1rem', cursor: 'pointer', textDecoration: 'underline' }}>Back</button>
        </form>
      )}
    </div>
  );
};

export default Login;
