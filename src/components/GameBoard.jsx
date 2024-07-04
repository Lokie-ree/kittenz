import React from 'react';
import KittenCard from './KittenCard';

const GameBoard = () => {
	const kittensArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	return (
		<div className="flex flex-wrap flex-row gap-4 w-full justify-center">
			{kittensArray.map((num) => (
				<KittenCard number={num} />
			))}
		</div>
	);
};

export default GameBoard;
