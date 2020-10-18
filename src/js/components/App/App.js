import React, {useState, useRef, useEffect, useCallback} from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	const [craSpeed, setCraSpeed] = useState();
	const [crasSpeed, setCrasSpeed] = useState(10);
	const [showNewCarEvery, setShowNewCarEvery] = useState(1000);
	const [cars, setCars] = useState([]);
	const [carPosition, setCarPosition] = useState(175);

	const addCarIntervalRef = useRef(null);
	const moveCarsIntervalRef = useRef(null);

	const moveCarHandler = useRef((e) => {
		if (canMove.current) {
			let newPosition;
			if(e.keyCode === 37) {
				setCarPosition(carPosition => {
					newPosition = Math.max(0, carPosition - 10);
					carPositionRef.current = newPosition;
					return newPosition;
				});
			}
			else if(e.keyCode === 39) {
				setCarPosition(carPosition => {
					newPosition = Math.min(350, carPosition + 10);
					carPositionRef.current = newPosition;
					return newPosition;
				});
			}
		}
	});

	useEffect(() => {
		document.addEventListener('keydown', moveCarHandler.current);
		return () => {
			document.removeEventListener('keydown', moveCarHandler.current);
		}
	}, []);

	const canMove = useRef(false);
	const carPositionRef = useRef([]);

	const startHandler = () => {
		setCars([]);
		setCarPosition(175);
		canMove.current = true;

		addCarIntervalRef.current = setInterval(() => {
			setCars((cars) => [...cars, {
				color: `rgb(${
					Math.floor(Math.random() * 256)
				}, ${
					Math.floor(Math.random() * 256)
				}, ${
					Math.floor(Math.random() * 256)
				})`,
				left: Math.floor(Math.random() * 351),
				top: -130
			}]);
		}, showNewCarEvery);

		moveCarsIntervalRef.current = setInterval(() => {
			setCars((cars) => {
				const newCars = cars.map(car => {
					const newTop = car.top + crasSpeed;

					if (
						newTop > window.innerHeight - 310 && newTop < window.innerHeight - 50 &&
						car.left > carPositionRef.current - 50 && car.left < carPositionRef.current + 50
					) {
						clearInterval(addCarIntervalRef.current);
						clearInterval(moveCarsIntervalRef.current);
						canMove.current = false;
						console.log('you loose');
					}

					return {...car, top: car.top + crasSpeed}
				});

				return newCars;
			});
		}, 50);
	};

	return <div className="game-container">
		<div className="road">
			{cars.map((car, index) => <Car key={index} color={car.color} top={car.top} left={car.left} />)}

			<Car color="red" top={window.innerHeight - 180} left={carPosition} />
		</div>

		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;