import React from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	return <div className="game-container">
		<div className="road">
			<Car color="red" top={5} left={5} />
		</div>
	</div>;
};

export default App;