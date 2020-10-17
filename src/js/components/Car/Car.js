import React from 'react';
import './Car.css';

const Car = ({color, top, left}) => {
  return (
    <div className="car" style={{backgroundColor: color, top: top + 'px', left: left + 'px'}}>
      
    </div>
  );
}

export default Car;