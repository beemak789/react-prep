import React from 'react';
import Tile from './Tile';

const Guess = ({ guess }) => {
  // represents 1 guess, with five tiles
  console.log('INSIDE HERE --->', guess);
  return (
    <div className='line'>
      {guess?.map((char, idx) => {
        return <Tile key={idx} char={char} />;
      })}
    </div>
  );
};

export default Guess;
