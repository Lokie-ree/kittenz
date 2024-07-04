'use client';

import React, { useState } from 'react';
import { getRandomKittens } from '@/services';
import { FaGamepad } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
	const [kitten, setKitten] = useState(
		'https://cdn2.thecatapi.com/images/MTQ5NzQ2MA.jpg'
	);
	return (
		<main className="flex min-h-screen items-center justify-center bg-base-100 overflow-x-clip">
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row gap-12 lg:gap-0">
					<div className="flex flex-col w-full lg:w-1/2">
						<h1 className="text-6xl font-bold text-accent">Play kittenz 🧶</h1>
						<h2 className="text-2xl font-bold mt-2">
							The Purr-fectly Ridiculous Kitten Matching Game
						</h2>
						<p className="font-thin mt-4 mb-6">
							Think you can handle this level of cuteness? Welcome to Kittenz,
							where you'll match the fluffiest, sassiest kittens on the
							internet! Flip those cards, find those matches, and unleash a
							tsunami of adorable chaos.
							<br />
							<br /> Prepare for uncontrollable giggles, endless "awwws," and a
							serious case of kitten addiction. Only the bravest can conquer the
							cute! Are you up for the challenge? Play Kittenz now and get ready
							for a purr-splosion of fun! 🐾
						</p>
						<div className="flex flex-row items-center gap-2">
							<Link href="/game" className="btn btn-primary">
								<FaGamepad className="text-xl" />
								Start New Game
							</Link>
							<button
								onClick={async () => {
									const response = await getRandomKittens(1);
									if (response.isError) {
										console.log(response.error);
									} else {
										setKitten(response.images[0].url);
									}
								}}
								className="btn btn-ghost"
							>
								Random Kitten
							</button>
						</div>
					</div>
					<img
						src={kitten}
						className="mask mask-heart w-full lg:w-1/2 rounded-lg shadow-2xl rotate-12 hover:animate-ping"
					/>
				</div>
			</div>
		</main>
	);
}
