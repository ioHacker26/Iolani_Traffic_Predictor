import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [arrivalTime, setArrivalTime] = useState('08:00');
  const [startTime, setStartTime] = useState('07:30');
  const [endTime, setEndTime] = useState('08:30');
  const [carCount, setCarCount] = useState('150');
  const [waitTime, setWaitTime] = useState(null);
  const [font, setFont] = useState('system-ui');
  const [glassEffect, setGlassEffect] = useState(false);

  function timeToUnix(timeString) {

    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
  
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
  
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    const date = new Date("2026-01-21T00:00:00");
  
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
  
    return Math.floor(date.getTime() / 1000);
  }

  const requestAPI = () => {

    const unixTime = timeToUnix(arrivalTime);
  
    console.log("Arrival time:", arrivalTime);
    console.log("Unix time:", unixTime);
  
    const url = "http://34.143.146.60:5000/api/seant/test?unix_time=" + unixTime;
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Prediction:", data.prediction);
        setWaitTime(data.prediction);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`app ${glassEffect ? 'glass-effect' : ''}`} style={{ fontFamily: font }}>
      <div className="container">
        <header className="header">
          <h1>School Drop-Off Timer</h1>
          <p className="subtitle">Traffic Estimation App</p>
        </header>

        <nav className="nav">
          <button 
            className={`nav-btn ${activeTab === 'main' ? 'active' : ''}`}
            onClick={() => setActiveTab('main')}
          >
            Main
          </button>
          <button 
            className={`nav-btn ${activeTab === 'background' ? 'active' : ''}`}
            onClick={() => setActiveTab('background')}
          >
            Background
          </button>
          <button 
            className={`nav-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
          <button 
            className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </nav>

        <main className="content">
          {activeTab === 'main' && (
            <div className="page main-page">
              <h2>Calculate Wait Time</h2>
              
              <div className="form-group">
                <label>Your Arrival Time</label>
                <input 
                  type="time" 
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Drop-Off Start Time</label>
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="input"
                />
              </div>
              <button onClick={requestAPI} className="calc-btn">
                Calculate Wait Time
              </button>

              {waitTime !== null && (
                <div className="result-card">
                  <div className="result-label">Estimated Wait Time</div>
                  <div className="result-value">{waitTime} minutes</div>
                  <div className="result-desc">
                    {waitTime < 5 ? 'Great timing! Minimal wait expected.' :
                     waitTime < 15 ? 'Moderate wait time expected.' :
                     'Consider arriving earlier or later.'}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'background' && (
            <div className="page">
              <h2>Background</h2>
              <div className="info-card">
                <h3>About This App</h3>
                <p>
                  The School Drop-Off Timer helps parents optimize their morning routine by 
                  estimating wait times in school drop-off lines.
                </p>
              </div>
              
              <div className="info-card">
                <h3>How It Works</h3>
                <p>
                  Our algorithm considers your arrival time, the school's drop-off window, 
                  and expected traffic volume to provide accurate wait time estimates.
                </p>
                <ul>
                  <li>Enter your planned arrival time</li>
                  <li>Set the school's drop-off hours</li>
                  <li>Input expected car count</li>
                  <li>Get instant wait time calculation</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>Mission</h3>
                <p>
                  We aim to reduce morning stress for families by providing data-driven 
                  insights into school drop-off traffic patterns.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="page">
              <h2>Our Team</h2>
              
              <div className="team-grid">
                <div className="team-card">
                  <div className="team-avatar">JD</div>
                  <h3>Anaïs Ortega</h3>
                  <p className="team-role">Lead Developer</p>
                  <p className="team-bio">
                    Anaïs studies Economics and is excited to apply machine learning foundations to deep learning projects.
                  </p>
                </div>

                <div className="team-card">
                  <div className="team-avatar">RW</div>
                  <h3>Sean Tumbagon</h3>
                  <p className="team-role">Backend Developer</p>
                  <p className="team-bio">
                    Sean loves to play videogames and is very passionate about learning.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="page">
              <h2>Settings</h2>
              
              <div className="settings-section">
                <h3>Font Selection</h3>
                <div className="form-group">
                  <label>Choose Font Family</label>
                  <select 
                    value={font} 
                    onChange={(e) => setFont(e.target.value)}
                    className="input"
                  >
                    <option value="system-ui">System Default</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="Georgia, serif">Georgia</option>
                    <option value="'Courier New', monospace">Courier New</option>
                    <option value="'Times New Roman', serif">Times New Roman</option>
                    <option value="Verdana, sans-serif">Verdana</option>
                    <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
                  </select>
                </div>
              </div>

              <div className="settings-section">
                <h3>Visual Effects</h3>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox"
                      checked={glassEffect}
                      onChange={(e) => setGlassEffect(e.target.checked)}
                    />
                    <span>Enable Liquid Glass Effect</span>
                  </label>
                  <p className="setting-desc">
                    Adds a frosted glass appearance with blur effects throughout the app.
                  </p>
                </div>
              </div>

              <div className="settings-section">
                <h3>App Information</h3>
                <div className="info-row">
                  <span>Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="info-row">
                  <span>Last Updated</span>
                  <span>March 2026</span>
                </div>
                <div className="info-row">
                  <span>Device Optimization</span>
                  <span>iPhone 16:9</span>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>&copy; 2026 School Drop-Off Timer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
