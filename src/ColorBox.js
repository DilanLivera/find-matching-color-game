import React from 'react';
import "./ColorBox.css";
import PropTypes from 'prop-types';

const ColorBox = (props) => {
  let style = {};
  if(props.showing) style.backgroundColor = props.backgroundColor;

  return (
    <div 
        className="card-container" 
        style={ style } 
        onClick={ props.onClick }
    />
  );
}

ColorBox.propTypes = {
  showing: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ColorBox;