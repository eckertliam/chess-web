class Bitboard {
    private board: bigint;
  

    constructor(board: bigint = BigInt(0)) {
      this.board = board;
    }
    
    getBoard(): bigint {
      return this.board;
    }
    
    // sets square to 1
    setSquare(square: number): void {
      this.board |= BigInt(1) << BigInt(square);
    }
  
    // shifts 1 to the left by square and then inverts it
    // then ANDs it with the board
    // sets square to 0
    clearSquare(square: number): void {
      this.board &= ~(BigInt(1) << BigInt(square));
    }
    
    // shifts 1 to the left by square
    // then ANDs it with the board and returns true if square is 1
    getSquare(square: number): boolean {
      return (this.board & (BigInt(1) << BigInt(square))) !== BigInt(0);
    }
    
    // prints the board
    // for debugging purposes
    static printBoard(board: bigint): void {
      let boardStr = "";
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = row * 8 + col;
          boardStr += (board & (BigInt(1) << BigInt(square))) !== BigInt(0) ? "1 " : "0 ";
        }
        boardStr += "\n";
      }
      console.log(boardStr);
    }
  }
  