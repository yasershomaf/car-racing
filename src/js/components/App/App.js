import React, {useState, useRef, useEffect, useCallback} from 'react';

import Car from '../Car/Car';
import Milestones from '../Milestones/Milestones';
import Crash from '../Crash/Crash';

import './App.css';

const App = () => {
	const [craSpeed, setCraSpeed] = useState();
	const [crasSpeed, setCrasSpeed] = useState(15);
	const [showNewCarEvery, setShowNewCarEvery] = useState(1000);
	const [cars, setCars] = useState([]);

	const addCarIntervalRef = useRef(null);
	const moveCarsIntervalRef = useRef(null);
	const moveToLeft = useRef(false);
	const moveToRight = useRef(false);

	const roadWidth = 400;
	const carWidth = 50;
	const carHeight = 130;

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

	const carPositionRef = useRef(Math.floor((roadWidth - carWidth) / 2));
	const milestonesTopRef = useRef(- window.innerHeight / 4);
	const crashPositionRef = useRef(null);

	const startHandler = () => {
		setCars([]);
		crashPositionRef.current = null;
		carPositionRef.current = Math.floor((roadWidth - carWidth) / 2);
		milestonesTopRef.current = - window.innerHeight / 4;

		addCarIntervalRef.current = setInterval(() => {
			setCars((cars) => {
				let canAddCar = true;
				let left = Math.floor(Math.random() * (1 + roadWidth - carWidth));
				if (cars.length > 0 && cars.some(
					car => car.top < 0 && left > car.left - carWidth && left < car.left + carWidth
				)) {
					canAddCar = false;
					let newLeft = (left + 1) % (1 + roadWidth - carWidth);
					while (newLeft !== left) {
						if (cars.every(
							car => car.top >= 0 || newLeft <= car.left - carWidth || newLeft >= car.left + carWidth
						)) {
							left = newLeft;
							canAddCar = true;
							break;
						}
						newLeft = (newLeft + 1) % (1 + roadWidth - carWidth);
					}
				}
				return !canAddCar ? cars : [...cars, {
					id: new Date().getTime(),
					color: `rgb(${
						Math.floor(Math.random() * 256)
					}, ${
						Math.floor(Math.random() * 256)
					}, ${
						Math.floor(Math.random() * 256)
					})`,
					left: left,
					top: -carHeight
				}];
			});
		}, showNewCarEvery);

		moveCarsIntervalRef.current = setInterval(() => {
			milestonesTopRef.current = (
				milestonesTopRef.current + 2 * crasSpeed + window.innerHeight / 4
			) % (window.innerHeight / 4) - window.innerHeight / 4;

			if(moveToLeft.current) {
				carPositionRef.current = Math.max(0, carPositionRef.current - 10);
			}
			else if(moveToRight.current) {
				carPositionRef.current = Math.min(roadWidth - carWidth, carPositionRef.current + 10);
			}

			setCars((cars) => {
				let isCrashed = false;
				const newCars = cars.map(car => {
					const newTop = car.top + crasSpeed;

					if (
						!isCrashed &&
						newTop > window.innerHeight - 50 - 2 * carHeight && newTop < window.innerHeight - 50 &&
						car.left > carPositionRef.current - carWidth && car.left < carPositionRef.current + carWidth
					) {
						isCrashed = true;
						crashPositionRef.current = {
							left: Math.abs((
								Math.min(car.left, carPositionRef.current) +
								Math.max(car.left, carPositionRef.current) + carWidth
							) / 2),
							top: Math.abs((
								Math.min(car.top, window.innerHeight - 50 - carHeight) +
								Math.max(car.top + carHeight, window.innerHeight - 50)
							) / 2)
						}





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
			<Milestones top={milestonesTopRef.current} />

			{cars.map(car => <Car
				key={car.id}
				color={car.color}
				top={car.top}
				left={car.left}
				width={carWidth}
				height={carHeight}
			/>)}

			<Car
				color="red"
				top={window.innerHeight - 50 - carHeight}
				left={carPositionRef.current}
				width={carWidth}
				height={carHeight}
			/>

			{crashPositionRef.current && <Crash {...crashPositionRef.current} />}
		</div>

		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;