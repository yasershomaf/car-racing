import React from 'react';
import './Car.css';

const Car = ({color, top, left}) => {
  return (
    <div className="car" style={{top: top + 'px', left: left + 'px'}}>
      <div className="car-body" style={{backgroundColor: color}}></div>
      <div className="car-back" style={{borderTopColor: color}}></div>
      <div className="front-glass"></div>
      <div className="top-glass"></div>
      <div className="back-glass"></div>
      <div className="left-front-glass"></div>
      <div className="left-glass"></div>
      <div className="left-back-glass"></div>
      <div className="right-front-glass"></div>
      <div className="right-glass"></div>
      <div className="right-back-glass"></div>
    </div>
  );
}

export default Car;