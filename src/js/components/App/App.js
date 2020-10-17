import React, {useState} from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	const [craSpeed, setCraSpeed] = useState();
	const [showNewCarEvery, setShowNewCarEvery] = useState();
	const [cars, setCars] = useState([]);
	const [carPosition, setCarPosition] = useState(235);

	const startHandler = () => {
		setCars([]);
		setCarPosition(235);
	};

	return <div className="game-container">
		<div className="road">
			{cars.map(car => <Car color={car.color} top={car.top} left={car.left} />)}

			<Car color="red" top={window.innerHeight - 110} left={carPosition} />
		</div>
		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;