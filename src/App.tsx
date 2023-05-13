import React from 'react';
import { Bitboard } from './Bitboard';

const App: React.FC = () => {
  // Create a Bitboard instance
  const bitboard = new Bitboard();
  const displayBoard = Bitboard.printBoard(bitboard.getBoard());

  // Print bitboard
  
  return ( 
    <div className="w-screen h-screen bg-slate-100 flex">
          
    </div>
  );
};

export default App;
