import React, { useEffect } from 'react';
import './App.css';

function handleKey(e) {
  const key = e.key.toUpperCase();
  const keys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '/',
    '*',
    '-',
    '+',
    '.',
    'DELETE',
    'BACKSPACE',
    'ENTER',
  ];
  if (keys.includes(key)) {
    document.getElementById(key).classList.add('active');
    setTimeout(
      () => document.getElementById(key).classList.remove('active'),
      300
    );
  } else {
    console.log(key);
  }
}

const App = () => {
  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <div className="formula">150+270</div>
        <div className="result">420</div>
      </div>
      <div className="keyboard">
        <div className="key gray" id="DELETE">
          CE
        </div>
        <div className="key gray" id="BACKSPACE">
          C
        </div>
        <div className="key gray" id="">
          ±
        </div>
        <div className="key gray" id="/">
          ÷
        </div>
        <div className="key" id="7">
          7
        </div>
        <div className="key" id="8">
          8
        </div>
        <div className="key" id="9">
          9
        </div>
        <div className="key gray" id="*">
          ×
        </div>
        <div className="key" id="4">
          4
        </div>
        <div className="key" id="5">
          5
        </div>
        <div className="key" id="6">
          6
        </div>
        <div className="key gray" id="-">
          -
        </div>
        <div className="key" id="1">
          1
        </div>
        <div className="key" id="2">
          2
        </div>
        <div className="key" id="3">
          3
        </div>
        <div className="key gray" id="+">
          +
        </div>
        <div className="key void"></div>
        <div className="key" id="0">
          0
        </div>
        <div className="key" id=".">
          .
        </div>
        <div className="key red" id="ENTER">
          =
        </div>
      </div>
    </div>
  );
};

export default App;
