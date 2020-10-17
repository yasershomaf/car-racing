import React from 'react';
import Car from '../Car/Car';
import './App.css';

const App = () => {
	return <div className="test">
		<Car color="red" top={5} left={5} />
	</div>;
};

export default App;