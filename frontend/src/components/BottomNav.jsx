import React from 'react';
import { Sprout, CloudRain, Calculator, Clock, Settings } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'prediction', label: 'Tractor', icon: <Sprout size={24} /> },
    { id: 'weather', label: 'Weather', icon: <CloudRain size={24} /> },
    { id: 'income', label: 'Income', icon: <Calculator size={24} /> },
    { id: 'history', label: 'History', icon: <Clock size={24} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={24} /> },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
