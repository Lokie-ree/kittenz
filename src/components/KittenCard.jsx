import React from 'react';

const KittenCard = ({
	kitten,
	cardOne,
	cardTwo,
	setCardOne,
	setCardTwo,
	solvedKittensArray,
	setSolvedKittensArray,
}) => {
	const handleClick = () => {
		if (cardOne === null) {
			setCardOne(kitten);
			console.log('card one', cardOne);
			return;
		}
		if (cardTwo === null) {
			setCardTwo(kitten);
			console.log('card two', cardTwo);
			return;
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={cardOne && cardTwo}
			className="flex h-80 w-80 items-center justify-center bg-secondary rounded-lg overflow-clip"
		>
			<p
				className={`${
					(cardOne == kitten ||
						cardTwo === kitten ||
						solvedKittensArray.includes(kitten.url)) &&
					'hidden'
				}`}
			>
				Click Me
			</p>
			<img
				className={`${
					cardOne != kitten &&
					cardTwo != kitten &&
					!solvedKittensArray.includes(kitten.url) &&
					'hidden'
				} object-cover w-full h-full`}
				src={kitten.url}
			/>
		</button>
	);
};

export default KittenCard;