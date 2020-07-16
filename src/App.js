import React from 'react';
import './App.css';

function App() {
  return (
    <div className="calculator">
      <div className="display">
        <div className="formula">150+270</div>
        <div className="result">420</div>
      </div>
      <div className="keyboard">
        <div className="key gray">CE</div>
        <div className="key gray">C</div>
        <div className="key gray">±</div>
        <div className="key gray">÷</div>
        <div className="key">7</div>
        <div className="key">8</div>
        <div className="key">9</div>
        <div className="key gray">×</div>
        <div className="key">4</div>
        <div className="key">5</div>
        <div className="key">6</div>
        <div className="key gray">-</div>
        <div className="key">1</div>
        <div className="key">2</div>
        <div className="key">3</div>
        <div className="key gray">+</div>
        <div className="key void"></div>
        <div className="key">0</div>
        <div className="key">.</div>
        <div className="key red">=</div>
      </div>
    </div>
  );
}

export default App;
