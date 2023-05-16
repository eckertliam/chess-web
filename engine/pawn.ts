import { BitBoard, Color, Piece } from "./bitboard";

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
			const oneForward = position << BigInt(8);
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

	// returns a bitboard representing the possible moves a white pawn can make from the given position
	getWhiteMoves(whiteBoard: BitBoard, blackBoard: BitBoard): BitBoard {
		const position = this.position;
		let possibleMoves = BigInt(0);
		// check if pawn is in its starting position
		if (position & BigInt(0x00FF000000000000)) {
			const oneForward = position >> BigInt(8);
			if (!(oneForward & (whiteBoard | blackBoard))) {
				possibleMoves |= oneForward;
				const twoForward = oneForward >> BigInt(8);
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
		const leftCapture = (position >> BigInt(7)) & BigInt(0x7F7F7F7F7F7F7F00);
		const rightCapture = (position >> BigInt(9)) & BigInt(0xFEFEFEFEFEFEFE00);
		possibleMoves |= (leftCapture | rightCapture) & blackBoard;
		return possibleMoves;
	}

	getMoves(whiteBoard: BitBoard, blackBoard: BitBoard): BitBoard {
		if (this.color === Color.White) {
			return this.getWhiteMoves(whiteBoard, blackBoard);
		}else{
			return this.getBlackMoves(whiteBoard, blackBoard);
		}
	}
}

