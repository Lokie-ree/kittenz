import GameBoard from '@/components/GameBoard';
import React from 'react';

const Game = () => {
	return (
		<div className="flex flex-col items-center justify-between min-h-screen overflow-x-clip">
			<GameBoard />
		</div>
	);
};

export default Game;
