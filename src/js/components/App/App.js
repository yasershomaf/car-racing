import React, {useState, useRef} from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	const [craSpeed, setCraSpeed] = useState();
	const [crasSpeed, setCrasSpeed] = useState(10);
	const [showNewCarEvery, setShowNewCarEvery] = useState(1000);
	const [cars, setCars] = useState([]);
	const [carPosition, setCarPosition] = useState(235);

	const addCarIntervalRef = useRef(null);

	const startHandler = () => {
		setCars([]);
		setCarPosition(235);

		addCarIntervalRef.current = setInterval(() => {
			setCars((cars) => [...cars, {
				color: `rgb(${
					Math.floor(Math.random() * 256)
				}, ${
					Math.floor(Math.random() * 256)
				}, ${
					Math.floor(Math.random() * 256)
				})`,
				left: Math.floor(Math.random() * 470),
				top: -60
			}]);
		}, showNewCarEvery);

		setInterval(() => {
			setCars((cars) => cars.map(car => ({...car, top: car.top + crasSpeed})));
		}, 50);
	};

	return <div className="game-container">
		<div className="road">
			{cars.map((car, index) => <Car key={index} color={car.color} top={car.top} left={car.left} />)}

			<Car color="red" top={window.innerHeight - 110} left={carPosition} />
		</div>

		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;