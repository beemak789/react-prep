import React, { useState, useEffect } from 'react';
import { newWords } from './words';
import Tile from './Tile';

function Wordle() {
  const [solution, setSolution] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guess_list, set_guess_list] = useState(Array(6).fill(null));
  const [finalized, setFinalized] = useState(false);
  const [rowNum, setRowNum] = useState(0);

  console.log(solution)

  const onKeyPress = (event) => {
    const { key } = event;
    let letter = key.charCodeAt(0);

    if (letter >= 97 && letter <= 122) {
      if (currentGuess.length < 5) {
        setCurrentGuess((previousState) => previousState + key);
      }
    }

    if (key === 'Backspace') {
      if (currentGuess.length > 0) {
        setCurrentGuess((previousState) => previousState.slice(0, -1));
      }
    }

    if (key === 'Enter' && currentGuess.length === 5) {
      setFinalized(true);
      // once clicking enter, set your row number by incrementing it
      setRowNum((prev) => prev + 1);

      // fill your current guess-list when user presses enter
      set_guess_list((previousGuessList) => {
        for (let i = rowNum; i < previousGuessList.length; i++) {
          previousGuessList[i] = currentGuess;
          return [...previousGuessList];
        }
      });
      setCurrentGuess('');
    }
  };

  // load the solution from api
  useEffect(() => {
    const fetchWords = () => {
      let randomNum = Math.floor(Math.random() * newWords.length);
      const currentSolution = newWords[randomNum];
      setSolution(currentSolution);
    };

    fetchWords();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);
    // cleanup function to remove event listener between each new re-render, or after component finishes mounting
    return () => window.removeEventListener('keydown', onKeyPress);
  }, [currentGuess]);

  return (
    <div className='board'>
      {guess_list.map((guess_from_list, rowIdx) => {
        let potentialGuessString = (
          rowNum === rowIdx ? currentGuess : guess_from_list ?? ''
        ).padEnd(5);

        return (
          <div className='line' key={rowIdx}>
            {potentialGuessString.split('').map((char, tileIdx) => {
              // set className here, need to have the tiles presented, before finalization
              let className;

              if (finalized) {
                if (solution.includes(char) && solution[tileIdx] === char) {
                  className = 'correct';
                } else if (
                  solution.includes(char) &&
                  solution[tileIdx] !== char
                ) {
                  className = 'close';
                } else {
                  className = 'incorrect';
                }
              }

              return (
                <Tile
                  key={tileIdx}
                  char={char}
                  rowNum={rowNum}
                  tileIdx={tileIdx}
                  style={className}
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
