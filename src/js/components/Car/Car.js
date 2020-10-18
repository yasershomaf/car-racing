import React from 'react';
import './Car.css';

const Car = ({color, top, left}) => {
  return (
    <div className="car" style={{top: top + 'px', left: left + 'px'}}>
      <div class="car-body" style={{backgroundColor: color}}></div>
      <div class="car-back" style={{borderTopColor: color}}></div>
      <div class="front-glass"></div>
      <div class="top-glass"></div>
      <div class="back-glass"></div>
      <div class="left-front-glass"></div>
      <div class="left-glass"></div>
      <div class="left-back-glass"></div>
      <div class="right-front-glass"></div>
      <div class="right-glass"></div>
      <div class="right-back-glass"></div>
    </div>
  );
}

export default Car;