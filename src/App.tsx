import React from 'react';
import { Bitboard } from './Bitboard';

const App: React.FC = () => {
  // Create a Bitboard instance
  const bitboard = new Bitboard();
  const displayBoard = Bitboard.printBoard(bitboard.getBoard());

  // Print bitboard
  
  return ( 
    <div className="w-screen h-screen bg-slate-100 flex">
          <h1>test</h1>
    </div>
  );
};

export default App;
