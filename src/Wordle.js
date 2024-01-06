import React, { useState, useEffect } from 'react';
import { WORDS } from './words';

const Tile = ({ guess, rowNum, tileIdx }) => {
  return (
    <div className='tile' tabIndex={tileIdx}>
      {guess[tileIdx]}
    </div>
  );
};

function Wordle() {
  const [solution, setSolution] = useState('');
  const [currentGuess, setCurrentGuess] = useState([]);
  const [guessList, setGuessList] = useState(Array(6).fill([]));
  const [finalized, setFinalized] = useState(false);
  const [rowNum, setRowNum] = useState(0);

  console.log(currentGuess);
  console.log(guessList);
  const onKeyPress = (event) => {
    const { key } = event;
    let letter = key.charCodeAt(0);
    if (key === 'Enter' && currentGuess.length === 5) {
      setFinalized(true);
      setRowNum((prev) => prev + 1);
      setGuessList((previousGuessList) => {
        for (let i = rowNum; i < previousGuessList.length; i++) {
          previousGuessList[i] = currentGuess;
          return [...previousGuessList];
        }
      });
      setCurrentGuess([]);
    }

    if (key === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess((previousState) => previousState.slice(0, -1));
      }
    }
    if (letter >= 97 && letter <= 122) {
      if (currentGuess.length < 5) {
        setCurrentGuess((previousState) => [...previousState, key]);
      }
    }
  };

  // load the solution from api
  useEffect(() => {
    const fetchWords = () => {
      let randomNum = Math.floor(Math.random() * WORDS.length + 1);
      const currentSolution = WORDS[randomNum];
      setSolution(currentSolution);
    };

    fetchWords();
  }, []);

  // attach event listener on load, ONCE
  useEffect(() => {
    // ensures event listener is added once
    window.addEventListener('keydown', onKeyPress);

    // remove the listener (between re-renders, or when component is finished being rendered/placed on DOM, or else it will continue to listen for keydown events);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [currentGuess]);

  return (
    <div className='board'>
      {/* // fill the array with 6 rows, iterating this block 6 times */}
      {Array.from(Array(6)).map((row, rowIdx) => {
        return (
          <div className='line' key={rowIdx}>
            {Array.from(Array(5)).map((tile, tileIdx) => {
              const letter = currentGuess[tileIdx];
              return (
                <Tile
                  key={tileIdx}
                  guess={currentGuess}
                  rowNum={rowNum}
                  tileIdx={tileIdx}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Wordle;

// store current guess
// place current guess, into GUEST LIST
