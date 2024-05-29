import {
  readFile,
} from 'fs/promises';

const data: string[] = (await readFile('src/d2/data.txt', 'utf-8'))
  .split('\n');

/**
 *           Theirs Mine
 * Rock:     A      X
 * Paper:    B      Y
 * Scissors: C      Z
 *
 * The following matrix shows the points I get:
 *
 *    A   B   C
 * X  3   0   6
 * Y  6   3   0
 * Z  0   6   3
 *
 * There is a pattern. Every new row rotates the pattern one column to the right.
 * We can use that.
 *
 * Also each playitem gives points according to it's index: Rock 1, Paper 2 and
 * Scissors 3.
 */

// First row of matrix.
const POINTS: number[] = [3, 0, 6];

function itemToNumber(itemType: string): number {
  const code = itemType.charCodeAt(0);
  return (code > 87)
    ? code - 88 // 'X-Z'
    : code - 65; // 'A-C';
}

function pointsForGame(theirPlay: string, myPlay: string): number {
  const theirNum = itemToNumber(theirPlay);
  const myNum = itemToNumber(myPlay);
  // Points for item (index + 1) + points for game.
  return myNum + 1 + POINTS[(theirNum + POINTS.length - myNum) % POINTS.length];
}

function getMyPoints(lines: string[]): number {
  return lines.reduce(
    (sum, line) => sum + pointsForGame(...line.split(' ') as [string, string]), 0);
}

console.log(getMyPoints(data));
