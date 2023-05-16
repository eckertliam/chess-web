
type BitBoard = bigint;

function printBoard(board: BitBoard): void {
	let boardString = "";
	for (let i = 0; i < 64; i++) {
		if (i % 8 === 0) {
			boardString += "\n";
		}
		boardString += (board & BigInt(1)) ? "1" : "0";
		board >>= BigInt(1);
	}
	console.log(boardString);
}

enum Color {
	White,
	Black,
}

// white pieces are south, black pieces are north
// white pawns are the 7th rank, black pawns are the 2nd rank
class Piece {
	position: BitBoard;
	color: Color;

	constructor(position: BitBoard, color: Color) {
		this.position = position;
		this.color = color;
	}
}

class Pawn extends Piece {
	constructor(position: BitBoard, color: Color) {
		super(position, color);
	}

	// returns a bitboard representing the possible moves a black pawn can make from the given position
	// whiteBoard: bitboard representing the positions of white pieces
	// blackBoard: bitboard representing the positions of black pieces
	getBlackMoves(whiteBoard: BitBoard, blackBoard: BitBoard): BitBoard {
		const position = this.position;
		let possibleMoves = BigInt(0);
		// check if pawn is in its starting position
		if (position & BigInt(0x000000000000FF00)) {
			const oneForward = position << BigInt(8);
			if (!(oneForward & (whiteBoard | blackBoard))) {
				possibleMoves |= oneForward;
				const twoForward = oneForward << BigInt(8);
				if (!(twoForward & (whiteBoard | blackBoard))) {
					possibleMoves |= twoForward;
				}
			}
		}else{
			const oneForward = position >> BigInt(8);
			if (!(oneForward & (whiteBoard | blackBoard))) {
				possibleMoves |= oneForward;
			}
		}
		// check if pawn can capture
		// the bitmasks are checking if the pawn is on the left or right edge of the board
		const leftCapture = (position << BigInt(9)) & BigInt(0x007F7F7F7F7F7F7F);
		const rightCapture = (position << BigInt(7)) & BigInt(0x00FEFEFEFEFEFEFE);
		possibleMoves |= (leftCapture | rightCapture) & whiteBoard;
		return possibleMoves;
	}
}
