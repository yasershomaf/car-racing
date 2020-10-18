import React, {useState, useRef, useEffect, useCallback} from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	const [craSpeed, setCraSpeed] = useState();
	const [crasSpeed, setCrasSpeed] = useState(15);
	const [showNewCarEvery, setShowNewCarEvery] = useState(1000);
	const [cars, setCars] = useState([]);
	const [carPosition, setCarPosition] = useState(175);

	const addCarIntervalRef = useRef(null);
	const moveCarsIntervalRef = useRef(null);
	const moveToLeft = useRef(false);
	const moveToRight = useRef(false);

	const keyDownHandler = useRef((e) => {
		if(e.keyCode === 37) {
			moveToLeft.current = true;
		}
		else if(e.keyCode === 39) {
			moveToRight.current = true;
		}
	});

	const keyUpHandler = useRef((e) => {
		if(e.keyCode === 37) {
			moveToLeft.current = false;
		}
		else if(e.keyCode === 39) {
			moveToRight.current = false;
		}
	});

	useEffect(() => {
		document.addEventListener('keydown', keyDownHandler.current);
		document.addEventListener('keyup', keyUpHandler.current);
		return () => {
			document.removeEventListener('keydown', keyDownHandler.current);
			document.removeEventListener('keyup', keyUpHandler.current);
		}
	}, []);

	const carPositionRef = useRef([]);

	const startHandler = () => {
		setCars([]);
		setCarPosition(175);

		addCarIntervalRef.current = setInterval(() => {
			setCars((cars) => [...cars, {
				id: new Date().getTime(),
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
			if(moveToLeft.current) {
				setCarPosition(carPosition => {
					carPositionRef.current = Math.max(0, carPosition - 10);
					return carPositionRef.current;
				});
			}
			else if(moveToRight.current) {
				setCarPosition(carPosition => {
					carPositionRef.current = Math.min(350, carPosition + 10);
					return carPositionRef.current;
				});
			}

			setCars((cars) => {
				const newCars = cars.map(car => {
					const newTop = car.top + crasSpeed;

					if (
						newTop > window.innerHeight - 310 && newTop < window.innerHeight - 50 &&
						car.left > carPositionRef.current - 50 && car.left < carPositionRef.current + 50
					) {
						clearInterval(addCarIntervalRef.current);
						clearInterval(moveCarsIntervalRef.current);
						console.log('you loose');
					}

					return {...car, top: car.top + crasSpeed}
				}).filter(car => car.top < window.innerHeight);

				return newCars;
			});
		}, 50);
	};

	return <div className="game-container">
		<div className="road">
			{cars.map(car => <Car key={car.id} color={car.color} top={car.top} left={car.left} />)}

			<Car color="red" top={window.innerHeight - 180} left={carPosition} />
		</div>

		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;