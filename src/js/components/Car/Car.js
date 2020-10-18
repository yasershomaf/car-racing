import React from 'react';
import './Car.css';

const Car = ({color, top, left}) => {
  return (
    <div className="car" style={{top: top + 'px', left: left + 'px'}}>
      <div className="car-body" style={{backgroundColor: color}} />
      <div className="car-back" style={{borderTopColor: color}} />
      <div className="front-glass" />
      <div className="top-glass" />
      <div className="back-glass" />
      <div className="left-front-glass" />
      <div className="left-glass" />
      <div className="left-back-glass" />
      <div className="right-front-glass" />
      <div className="right-glass" />
      <div className="right-back-glass" />
    </div>
  );
}

export default Car;