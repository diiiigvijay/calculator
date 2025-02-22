import React, { useState } from 'react';
import { Equal, Plus, Minus, X, Divide, Delete } from 'lucide-react';

function App() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [hasResult, setHasResult] = useState(false);

  const handleNumber = (num: string) => {
    if (hasResult) {
      setDisplay(num);
      setEquation(num);
      setHasResult(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
      setEquation(equation + num);
    }
  };

  const handleOperator = (operator: string) => {
    if (!equation.endsWith(' ') && equation !== '') {
      setEquation(equation + ' ' + operator + ' ');
      setDisplay('0');
      setHasResult(false);
    }
  };

  const calculate = () => {
    try {
      const result = eval(equation.replace('×', '*').replace('÷', '/'));
      setDisplay(result.toString());
      setEquation(result.toString());
      setHasResult(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setHasResult(false);
  };

  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', '='
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xs overflow-hidden">
        {/* Display */}
        <div className="bg-gray-800 p-6">
          <div className="text-gray-400 text-right text-sm h-6 overflow-hidden">
            {equation || '0'}
          </div>
          <div className="text-white text-right text-3xl font-semibold mt-2 overflow-hidden">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-gray-100">
          {/* Clear and Delete */}
          <button
            onClick={clear}
            className="col-span-2 p-4 text-red-600 hover:bg-gray-200 rounded transition"
          >
            AC
          </button>
          <button
            onClick={() => {
              setDisplay(display.slice(0, -1) || '0');
              setEquation(equation.slice(0, -1) || '');
            }}
            className="col-span-2 p-4 text-gray-700 hover:bg-gray-200 rounded transition"
          >
            <Delete className="w-6 h-6 mx-auto" />
          </button>

          {/* Operators */}
          <button
            onClick={() => handleOperator('÷')}
            className="p-4 text-blue-600 hover:bg-gray-200 rounded transition"
          >
            <Divide className="w-6 h-6 mx-auto" />
          </button>
          <button
            onClick={() => handleOperator('×')}
            className="p-4 text-blue-600 hover:bg-gray-200 rounded transition"
          >
            <X className="w-6 h-6 mx-auto" />
          </button>
          <button
            onClick={() => handleOperator('-')}
            className="p-4 text-blue-600 hover:bg-gray-200 rounded transition"
          >
            <Minus className="w-6 h-6 mx-auto" />
          </button>
          <button
            onClick={() => handleOperator('+')}
            className="p-4 text-blue-600 hover:bg-gray-200 rounded transition"
          >
            <Plus className="w-6 h-6 mx-auto" />
          </button>

          {/* Numbers */}
          <div className="col-span-4 grid grid-cols-3 gap-1">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => btn === '=' ? calculate() : handleNumber(btn)}
                className={`p-4 ${
                  btn === '=' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                } rounded transition flex items-center justify-center`}
              >
                {btn === '=' ? <Equal className="w-6 h-6" /> : btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;