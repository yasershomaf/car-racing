import React, {useState, useRef, useEffect, useCallback} from 'react';
import Car from '../Car/Car';
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

	const linesTopRef = useRef(- window.innerHeight / 4);
	const carPositionRef = useRef(175);

	const startHandler = () => {
		setCars([]);
		carPositionRef.current = 175;
		linesTopRef.current = - window.innerHeight / 4;

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
			linesTopRef.current = (
				linesTopRef.current + 1.5 * crasSpeed + window.innerHeight / 4
			) % (window.innerHeight / 4) - window.innerHeight / 4;

			if(moveToLeft.current) {
				carPositionRef.current = Math.max(0, carPositionRef.current - 10);
			}
			else if(moveToRight.current) {
				carPositionRef.current = Math.min(350, carPositionRef.current + 10);
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
			<div className="lines" style={{marginTop: linesTopRef.current + 'px'}}>
				<div /><div /><div /><div /><div />
			</div>

			{cars.map(car => <Car key={car.id} color={car.color} top={car.top} left={car.left} />)}

			<Car color="red" top={window.innerHeight - 180} left={carPositionRef.current} />
		</div>

		<button className="btn-stat" onClick={startHandler}>Start</button>
	</div>;
};

export default App;