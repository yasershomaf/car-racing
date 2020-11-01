import React from 'react';
import './Tree.css';

const Tree = () => {
	return <div className="tree">
		{Array(7).fill('').map((item, index) => <div key={index} />)}
	</div>;
};

export default Tree;