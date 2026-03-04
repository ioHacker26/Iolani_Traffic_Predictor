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

  const calculateWaitTime = () => {
    const arrival = new Date(`2000-01-01 ${arrivalTime}`);
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const cars = parseInt(carCount) || 0;

    const totalMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    const carsPerMinute = cars / totalMinutes;
    
    let position = 0;
    if (arrival < start) {
      position = 1;
    } else if (arrival > end) {
      position = cars;
    } else {
      const minutesSinceStart = (arrival.getTime() - start.getTime()) / (1000 * 60);
      position = Math.floor(minutesSinceStart * carsPerMinute);
    }

    const estimatedWait = Math.max(0, Math.floor(position * 1.5));
    setWaitTime(estimatedWait);
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

              <div className="form-group">
                <label>Drop-Off End Time</label>
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Expected Car Count</label>
                <input 
                  type="number" 
                  value={carCount}
                  onChange={(e) => setCarCount(e.target.value)}
                  className="input"
                  placeholder="150"
                />
              </div>

              <button onClick={calculateWaitTime} className="calc-btn">
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
                  <h3>Jane Doe</h3>
                  <p className="team-role">Lead Developer</p>
                  <p className="team-bio">
                    Full-stack engineer passionate about solving real-world problems with technology.
                  </p>
                </div>

                <div className="team-card">
                  <div className="team-avatar">JS</div>
                  <h3>John Smith</h3>
                  <p className="team-role">UX Designer</p>
                  <p className="team-bio">
                    Designer focused on creating intuitive mobile experiences for busy parents.
                  </p>
                </div>

                <div className="team-card">
                  <div className="team-avatar">MJ</div>
                  <h3>Maria Johnson</h3>
                  <p className="team-role">Data Analyst</p>
                  <p className="team-bio">
                    Traffic pattern expert developing algorithms for accurate time predictions.
                  </p>
                </div>

                <div className="team-card">
                  <div className="team-avatar">RW</div>
                  <h3>Robert Williams</h3>
                  <p className="team-role">Product Manager</p>
                  <p className="team-bio">
                    Parent of three with firsthand experience in school drop-off chaos.
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
