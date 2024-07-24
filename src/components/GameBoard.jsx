'use client';

import React, { useState, useEffect } from 'react';
import KittenCard from './KittenCard';
import { getRandomKittens } from '@/services';
import Confetti from 'react-confetti';

const GameBoard = () => {
	const [numOfKittens, setNumOfKittens] = useState(6);
	const [kittens, setKittens] = useState([]);
	const [cardOne, setCardOne] = useState(null);
	const [cardTwo, setCardTwo] = useState(null);
	const [solvedKittensArray, setSolvedKittensArray] = useState([]);
	const [loading, setLoading] = useState(true);
	const [gameWin, setGameWin] = useState(false);

  // New Game
  const newGame = async () => {
    setLoading(true);
    setGameWin(false);
    setKittens([]);
    setCardOne(null);
    setCardTwo(null);
    setSolvedKittensArray([]);
    await fetchKittens();
    setLoading(false);
  }

	// Function to fetch kittens
	const fetchKittens = async () => {
		setLoading(true);
		const response = await getRandomKittens(numOfKittens);
		if (response.isError) {
			alert(response.error);
		} else {
			console.log('API Reponse:', response.images);
			//RANDOMIZE AND DUPLICATE KITTENS HERE
			const duplicatedAndShuffledKittens = randomizeAndDuplicateKittens(
				response.images
			);
			setKittens(duplicatedAndShuffledKittens);
		}
		setLoading(false);
	};

	// Function to duplicate and randomize kittens
	const randomizeAndDuplicateKittens = (kittensArray) => {
		console.log('Kittens Array: ', kittensArray);
		let newArray = [];
		kittensArray.forEach((kitten, index) => {
			let kittenCopy1 = { ...kitten, id: index + 'copy1' };
			let kittenCopy2 = { ...kitten, id: index + 'copy2' };

			newArray.push(kittenCopy1, kittenCopy2);
		});
		console.log('Duplicated Kittens', newArray);
		newArray = newArray.sort(() => Math.random() - 0.5);
		console.log('Duplicated and Shuffled', newArray);
		return newArray;
	};

	// Function to check matches
	useEffect(() => {
		if (cardTwo != null) {
			const timeout = setTimeout(() => {
				if (cardOne.url === cardTwo.url && cardOne.id != cardTwo.id) {
					setSolvedKittensArray((prev) => [...prev, cardOne.url]);
				}
				setCardOne(null);
				setCardTwo(null);
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [cardTwo]);

	useEffect(() => {
		newGame();
	}, []);

  useEffect(() => {
    newGame();
  }, [numOfKittens]);

  useEffect(() => {
    if(solvedKittensArray.length === numOfKittens) {
      setGameWin(true);
      document.getElementById('meow').play();
    }
  }, [solvedKittensArray]);

	return (
		<div className="flex flex-wrap flex-col gap-4 w-full justify-center">
      <audio id='meow' src='/cat-meow.mp3' />
      {gameWin && (
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <Confetti
            confettiSource={{ x: 0, y: 50, w: window.innerWidth, h: 0}}
            width={window.width}
            height={window.height}
            recycle={false}
            numberOfPieces={1000}
            // onConfettiComplete={() => setGameWin(false)}
      />
      </div>
    )}
      <div className="flex flex-row w-full items-center justify-between p-6">
        <button 
          onClick={() => newGame()}
          className={`btn ${gameWin && 'animate-bounce'}`}>New Game</button>
        <details 
          className="dropdown dropdown-end" 
          id='number-of-kittens-dropdown'
        >
          <summary className="btn m-1">Number of Kittens</summary>
            <ul className="menu dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
              {[6, 8, 10, 12].map((number) => (
                <li
                  key={number}
                  onClick={() => {
                    setNumOfKittens(number)
                    document
                      .getElementById('number-of-kittens-dropdown')
                      .removeAttribute('open')
                    }}
                >
                <a>{number}</a>
              </li>))}
            </ul>
        </details>
      </div>

      <div className="flex flex-row items-center justify-center flex-wrap gap-6 mb-12">
        {loading ? (
          <p className="text-xl flex items-center justify-center h-64">
            loading<span className="loading loading-dots loading-lg"></span>
          </p>
        ) : (
          kittens.map((kitten) => (
            <KittenCard
              key={kitten?.id}
              kitten={kitten}
              cardOne={cardOne}
              setCardOne={setCardOne}
              cardTwo={cardTwo}
              setCardTwo={setCardTwo}
              solvedKittensArray={solvedKittensArray}
              setSolvedKittensArray={setSolvedKittensArray}
            />
          ))
        )}
      </div>
			
		</div>
	);
};

export default GameBoard;