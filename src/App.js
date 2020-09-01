import React, { useEffect, useReducer } from 'react';
import './App.css';

const initialState = {
  formula: '0',
  result: undefined,
  isNumber: false,
  isOperator: false,
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'DIGIT':
      if (action.payload === '0' && state.formula === '0') {
        return state;
      } else if (action.payload !== '0' && state.formula === '0') {
        newState.formula = action.payload;
      } else {
        newState.formula = state.formula + action.payload;
      }
      newState.isNumber = true;
      newState.isOperator = false;
      if (!newState.isOperator) newState.result = eval(newState.formula);
      return newState;
    case 'DECIMAL':
      let lastNumber = state.formula.match(/([\d]+|[\d]+[.]?[\d]+)$/g);
      if (lastNumber) {
        if (!lastNumber[0].includes('.')) {
          newState.formula += '.';
          return newState;
        }
      }
      return state;
    case 'OPERATOR':
      if (!state.isOperator) {
        newState.formula = state.formula + action.payload;
      } else if (
        state.isOperator &&
        state.formula.endsWith('-') &&
        action.payload === '-'
      ) {
        newState.formula = state.formula;
      } else if (state.isOperator && action.payload === '-') {
        newState.formula = state.formula + action.payload;
      } else {
        const operatorsAtEnd = state.formula.match(/[\D]*$/);
        newState.formula =
          state.formula.slice(0, operatorsAtEnd.index) + action.payload;
      }
      newState.isNumber = false;
      newState.isOperator = true;
      return newState;
    case 'CLEAR':
      newState.formula = '0';
      newState.result = undefined;
      newState.isNumber = false;
      newState.isOperator = false;
      return newState;
    case 'CLEAR-LAST':
      if (state.formula === '') {
        return state;
      } else if (state.formula.length === 1) {
        newState.formula = '0';
        newState.result = undefined;
        newState.isNumber = false;
        newState.isOperator = false;
      } else {
        newState.formula = state.formula.slice(0, -1);
        if (!newState.formula.match(/[\d]$/)) {
          newState.result = eval(newState.formula.slice(0, -1));
          newState.isNumber = false;
          newState.isOperator = true;
        } else {
          newState.result = eval(newState.formula);
          newState.isNumber = true;
          newState.isOperator = false;
        }
      }
      return newState;
    case 'ENTER':
      if (state.formula === '') return state;
      newState.formula = state.result.toString();
      newState.result = undefined;
      newState.isNumber = true;
      newState.isOperator = false;
      return newState;
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleKey = e => {
    const key = e.key.toUpperCase();
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operators = ['/', '*', '-', '+'];

    if (digits.includes(key)) {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'DIGIT', payload: key });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }

    if (operators.includes(key)) {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'OPERATOR', payload: key });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }

    if (key === '.') {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'DECIMAL', payload: key });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }

    if (key === 'BACKSPACE') {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'CLEAR-LAST' });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }

    if (key === 'DELETE') {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'CLEAR' });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }

    if (key === 'ENTER') {
      document.getElementById(key).classList.add('active');
      dispatch({ type: 'ENTER' });
      setTimeout(
        () => document.getElementById(key).classList.remove('active'),
        300
      );
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <div className="formula">{state.formula}</div>
        <div className="result">{state.result}</div>
      </div>
      <div className="keyboard">
        <div
          className="key gray"
          id="DELETE"
          onClick={() => dispatch({ type: 'CLEAR' })}>
          CE
        </div>
        <div
          className="key gray"
          id="BACKSPACE"
          onClick={() => dispatch({ type: 'CLEAR-LAST' })}>
          C
        </div>
        <div className="key gray" id="">
          ±
        </div>
        <div
          className="key gray"
          id="/"
          onClick={() => dispatch({ type: 'OPERATOR', payload: '/' })}>
          ÷
        </div>
        <div
          className="key"
          id="7"
          onClick={() => dispatch({ type: 'DIGIT', payload: '7' })}>
          7
        </div>
        <div
          className="key"
          id="8"
          onClick={() => dispatch({ type: 'DIGIT', payload: '8' })}>
          8
        </div>
        <div
          className="key"
          id="9"
          onClick={() => dispatch({ type: 'DIGIT', payload: '9' })}>
          9
        </div>
        <div
          className="key gray"
          id="*"
          onClick={() => dispatch({ type: 'OPERATOR', payload: '*' })}>
          ×
        </div>
        <div
          className="key"
          id="4"
          onClick={() => dispatch({ type: 'DIGIT', payload: '4' })}>
          4
        </div>
        <div
          className="key"
          id="5"
          onClick={() => dispatch({ type: 'DIGIT', payload: '5' })}>
          5
        </div>
        <div
          className="key"
          id="6"
          onClick={() => dispatch({ type: 'DIGIT', payload: '6' })}>
          6
        </div>
        <div
          className="key gray"
          id="-"
          onClick={() => dispatch({ type: 'OPERATOR', payload: '-' })}>
          -
        </div>
        <div
          className="key"
          id="1"
          onClick={() => dispatch({ type: 'DIGIT', payload: '1' })}>
          1
        </div>
        <div
          className="key"
          id="2"
          onClick={() => dispatch({ type: 'DIGIT', payload: '2' })}>
          2
        </div>
        <div
          className="key"
          id="3"
          onClick={() => dispatch({ type: 'DIGIT', payload: '3' })}>
          3
        </div>
        <div
          className="key gray"
          id="+"
          onClick={() => dispatch({ type: 'OPERATOR', payload: '+' })}>
          +
        </div>
        <div className="key void"></div>
        <div
          className="key"
          id="0"
          onClick={() => dispatch({ type: 'DIGIT', payload: '0' })}>
          0
        </div>
        <div
          className="key"
          id="."
          onClick={() => dispatch({ type: 'DECIMAL', payload: '.' })}>
          .
        </div>
        <div
          className="key red"
          id="ENTER"
          onClick={() => dispatch({ type: 'ENTER' })}>
          =
        </div>
      </div>
    </div>
  );
};

export default App;
