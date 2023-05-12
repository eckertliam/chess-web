// a bitboard is a 64 bit integer
// each bit represents a square on the board
// each bitboard represents a different piece
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

// helper function to create a bitboard from an array of squares
function squaresMask(squares: number[]): Bitboard {
  let bitboard: bigint = BigInt(0);
  for (let square of squares) {
    bitboard |= BigInt(1) << BigInt(square);
  }
  return new Bitboard(bitboard);
}

// defualt starting positions
const whitePawns = squaresMask([8, 9, 10, 11, 12, 13, 14, 15]);
const whiteKnights = squaresMask([1, 6]);
const whiteBishops = squaresMask([2, 5]);
const whiteRooks = squaresMask([0, 7]);
const whiteQueens = new Bitboard(BigInt(8));
const whiteKing = new Bitboard(BigInt(4));

const blackPawns = squaresMask([48, 49, 50, 51, 52, 53, 54, 55]);
const blackKnights = squaresMask([57, 62]);
const blackBishops = squaresMask([58, 61]);
const blackRooks = squaresMask([56, 63]);
const blackQueens = new Bitboard(BigInt(59));
const blackKing = new Bitboard(BigInt(60));


// a board is a collection of bitboards
// each bitboard represents a different piece
class Board {
  private whitePawns: Bitboard;
  private whiteKnights: Bitboard;
  private whiteBishops: Bitboard;
  private whiteRooks: Bitboard;
  private whiteQueens: Bitboard;
  private whiteKing: Bitboard;

  private blackPawns: Bitboard;
  private blackKnights: Bitboard;
  private blackBishops: Bitboard;
  private blackRooks: Bitboard;
  private blackQueens: Bitboard;
  private blackKing: Bitboard;

  private whitePieces: Bitboard;
  private blackPieces: Bitboard;

  private allPieces: Bitboard;

  private whiteToMove: boolean;

  constructor() {
    this.whitePawns = whitePawns;
    this.whiteKnights = whiteKnights;
    this.whiteBishops = whiteBishops;
    this.whiteRooks = whiteRooks;
    this.whiteQueens = whiteQueens;
    this.whiteKing = whiteKing;

    this.blackPawns = blackPawns;
    this.blackKnights = blackKnights;
    this.blackBishops = blackBishops;
    this.blackRooks = blackRooks;
    this.blackQueens = blackQueens;
    this.blackKing = blackKing;

    this.whitePieces = this.whitePieceUnion();
    this.blackPieces = this.blackPieceUnion();

    this.allPieces = this.allPieceUnion();
    
    this.whiteToMove = true;
  }

  // returns the union of all the white pieces as a bitboard
  whitePieceUnion(): Bitboard {
    return new Bitboard(this.whitePawns.getBoard() & 
                        this.whiteKnights.getBoard() & 
                        this.whiteBishops.getBoard() & 
                        this.whiteRooks.getBoard() & 
                        this.whiteQueens.getBoard() & 
                        this.whiteKing.getBoard());
}

  blackPieceUnion(): Bitboard {
    return new Bitboard(this.blackPawns.getBoard() &
                        this.blackKnights.getBoard() &
                        this.blackBishops.getBoard() &
                        this.blackRooks.getBoard() &
                        this.blackQueens.getBoard() &
                        this.blackKing.getBoard());
  }

  // returns the union of all the pieces as a bitboard
  allPieceUnion(): Bitboard {
    return new Bitboard(this.whitePieces.getBoard() | this.blackPieces.getBoard());
  }
}
