
export type BitBoard = bigint;

export function printBoard(board: BitBoard): void {
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

export enum Color {
	White,
	Black,
}

// white pieces are south, black pieces are north
// white pawns are the 7th rank, black pawns are the 2nd rank
export class Piece {
	position: BitBoard;
	color: Color;

	constructor(position: BitBoard, color: Color) {
		this.position = position;
		this.color = color;
	}
}

