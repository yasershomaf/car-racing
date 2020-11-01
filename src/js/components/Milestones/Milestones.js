import React from 'react';
import Tree from '../Tree/Tree';
import './Milestones.css';

const Milestones = ({top, roadWidth}) =><div className="milestones" style={{marginTop: top + 'px'}}>
	<div className="left-trees">
		<Tree />
		<Tree />
	</div>

	<div className="left-lines">
		{Array(16).fill('').map((item, index) => <div key={index} />)}
	</div>

	<div className="road-area" style={{width: roadWidth + 'px'}}>
		<div className="middle-lines">
			{Array(8).fill('').map((item, index) => <div key={index} />)}
		</div>
	</div>

	<div className="right-lines">
		{Array(16).fill('').map((item, index) => <div key={index} />)}
	</div>

	<div className="right-trees">
		<Tree />
		<Tree />
	</div>
</div>;

export default Milestones;