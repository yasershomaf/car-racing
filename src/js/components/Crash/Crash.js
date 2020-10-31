import React from 'react';
import './Crash.css';

const Crash = ({left, top}) => {
	return <div className="crash" style={{left: left + 'px', top: top + 'px'}}>
		{Array(12).fill('').map((item, index) => {
			const width = Math.floor(Math.random() * 40) + 10;
			const height = Math.floor(Math.random() * 40) + 30;
			return <div key={index}>
				<div style={{
					top: `-${height}px`,
					left: `-${width / 2}px`,
					transform: `rotate(${30 * index}deg)`
				}} >
					<div style={{
						borderWidth: `0 ${width / 2}px ${height}px`,
					}} />
					<div style={{
						height: height + 'px',
					}} />
				</div>
				<div style={{
					top: `-${height}px`,
					left: `-${width / 2}px`,
					transform: `rotate(${30 * index}deg) scale(0.8)`,
					zIndex: 1
				}} >
					<div style={{
						borderWidth: `0 ${width / 2}px ${height}px`,
					}} />
					<div style={{
						height: height + 'px',
					}} />
				</div>
			</div>;
		})}
	</div>;
};

export default Crash;