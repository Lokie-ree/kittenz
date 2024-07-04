import React from 'react';

const KittenCard = ({ number }) => {
	return (
		<div className="flex h-80 w-80 items-center justify-center bg-secondary rounded-lg">
			Click Me {number}
		</div>
	);
};

export default KittenCard;
