import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.7)', padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)'}}>
      <Globe size={18} color="#10b981" />
      <select 
        value={i18n.language} 
        onChange={(e) => changeLanguage(e.target.value)}
        style={{ background: 'transparent', color: '#f8fafc', border: 'none', outline: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 500 }}
      >
        <option value="en" style={{color: '#000'}}>English</option>
        <option value="hi" style={{color: '#000'}}>हिंदी (Hindi)</option>
        <option value="te" style={{color: '#000'}}>తెలుగు (Telugu)</option>
        <option value="ta" style={{color: '#000'}}>தமிழ் (Tamil)</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
