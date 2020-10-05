import React, { useState } from 'react';
import './Styles/App.css';
import Button from './Components/Button.js'
import { themeTypes } from './Constants/constants.js';
import themeObj from './Config/themeConfig'

function App() {

  const [value, setValue] = useState("0");
  const [memory, setMemory] = useState(null);
  const [operator, setOperator] = useState(null);
  const [showHideScienceMode, setShowHideScienceMode] = useState(false);
  const [theme, updateTheme] = useState();
  
  const getClassScientificButtonContainer = () => {
    return showHideScienceMode ? 'scientific-buttons-container-show' : 'scientific-buttons-container-hide'
  }

  const showScientificMode = () => {
    setShowHideScienceMode(prevshowHideScienceMode => !prevshowHideScienceMode )
  }

  const getButton = (content) =>{
    return <Button onButtonPress={handleButtonPress} content={content} theme={theme}/>;
  }

  const onPressOperator = (operator,num) => {
    if (operator !== null) {

        switch (operator) {
            case '+':
                setMemory(memory + num);
                break;
            case '-':
                setMemory(memory - num);
                break;
            case 'x':
                setMemory(memory * num);
                break;
            case '÷':
                setMemory(memory / num);
                break;
            default:
                break;
        }
    } else {
      setMemory(num);
    }
  }

  //Calculation Logic
  const handleButtonPress = content => () => {

    let num = parseFloat(value);

    switch (content) {
        //Clear Display
        case 'C':
            setValue("0");
            setMemory(null);
            setOperator(null)
            return;
        
        //Addition
        case '+':
            onPressOperator(operator,num);
            setValue('0');
            setOperator("+");
            return;

        //Subtraction
        case '-':
            onPressOperator(operator,num);
            setValue("0");
            setOperator("-");
            return;

        //Multiplication
        case 'x':
            onPressOperator(operator,num);
            setValue("0");
            setOperator("x");
            return;

        //Divition
        case '÷':
            onPressOperator(operator,num);
            setValue("0");
            setOperator("÷");
            return;

        //Calculation Result
        case '=':
            if (!operator) return;

            switch (operator) {
                case '+':
                    setValue((memory + num).toString());
                    break;
                case '-':
                    setValue((memory - num).toString());
                    break;
                case 'x':
                    setValue((memory * num).toString());
                    break;
                case '÷':
                    setValue((memory / num).toString());
                    break;
                default:
                    break;
            }

            setMemory(null);
            setOperator(null);
            return;

        //Flip to +ve OR -ve
        case '±':
            setValue((num * -1).toString());
            return;

        //Square of Number
        case 'Sqr':
            setValue((num * num).toString());
            setMemory(null);
            setOperator(null);
            return;

        //Square-Root of Number
        case '√x':
            setValue((Math.sqrt(num)).toString());
            setMemory(null);
            setOperator(null);
            return;

        default:
            break;
    }
    
    setValue((parseFloat(num + content)).toString());

  };

  return (
    <div className="app-wrapper" style={themeObj[theme]} >
      <div className='theme-buttons-container'>
        <button className='btn-light-mode' onClick={() => updateTheme(themeTypes.LIGHT)}>Light Theme</button>
        <button className='btn-dark-mode' onClick={() => updateTheme(themeTypes.DARK)}>Dark Theme</button>
      </div>
      <div className="display-result">{value}</div>
      <div className="buttons-calculator-pad-container">
        <div>
          {getButton('1')}
          {getButton('2')}
          {getButton('3')}
          {getButton('+')}
        </div>
        <div>
          {getButton('4')}
          {getButton('5')}
          {getButton('6')}
          {getButton('-')}
        </div>
        <div>
          {getButton('7')}
          {getButton('8')}
          {getButton('9')}
          {getButton('x')}
        </div>
        <div>
          {getButton('C')}
          {getButton('0')}
          {getButton('÷')}
          {getButton('=')}
        </div>
      </div>
      <div className={'scientific-buttons-container '+ getClassScientificButtonContainer()}>
          {getButton('±')}
          {getButton('Sqr')}
          {getButton('√x')}
      </div>
      <button className='btn-scientific-mode' onClick={showScientificMode}>Scientific</button>
    </div>
  );
}

export default App;
