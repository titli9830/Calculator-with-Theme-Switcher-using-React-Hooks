import React from 'react';
import '../Styles/Button.css';
import PropTypes from 'prop-types'
import { themeTypes } from '../Constants/constants'

export default function Button({ content, onButtonPress, theme }) {

      const getClass = () => {
         if (theme === themeTypes.LIGHT) {
             return 'button-light';
         } else if (theme === themeTypes.DARK) {
             return 'button-dark';
         } else return ('');
        // return (theme === themeTypes.LIGHT ? 'button-light' : 'button-dark');
     }
        
    return (
         <span onClick={onButtonPress(content)} className={"button " + getClass()}>{content}
         </span>
    )
}

Button.propTypes = {
    content: PropTypes.string,
    onButtonPress: PropTypes.func,
    theme: PropTypes.object
  
  }