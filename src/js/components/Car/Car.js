import React from 'react';
import './Car.css';

const Car = ({color, top, left, width, height}) => {
	return <div className="car" style={{
		top: top + 'px',
		left: left + 'px',
		width: width + 'px',
		height: height + 'px'
	}}>
		<div className="car-body" style={{
			backgroundColor: color,
			borderRadius: `${width * 0.24}px ${width * 0.24}px 0 0`
		}} />
		<div className="car-back" style={{
			borderTopColor: color,
			borderRadius: `0 0 ${width * 0.36}px ${width * 0.36}px`,
			borderWidth: `${height * 0.25}px ${width * 0.08}px 0`
		}} />
		<div className="front-glass" style={{
			borderWidth: `${height * 0.185}px ${width * 0.08}px 0`
		}} />
		<div className="top-glass" />
		<div className="back-glass" style={{
			borderWidth: `0 ${width * 0.04}px ${height * 0.1538}px`
		}} />
		<div className="left-front-glass" style={{
			borderWidth: `${height * 0.092}px ${width * 0.04}px`
		}} />
		<div className="left-glass" />
		<div className="left-back-glass" style={{
			borderWidth: `${height * 0.162}px ${width * 0.04}px 0`
		}} />
		<div className="right-front-glass" style={{
			borderWidth: `${height * 0.092}px ${width * 0.04}px`
		}} />
		<div className="right-glass" />
		<div className="right-back-glass" style={{
			borderWidth: `${height * 0.162}px ${width * 0.04}px 0`
		}} />
	</div>;
};

export default Car;