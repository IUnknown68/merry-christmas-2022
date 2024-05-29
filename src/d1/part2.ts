import {
  readFile,
} from 'fs/promises';

const data: string[] = (await readFile('src/d1/data.txt', 'utf-8'))
  .split('\n');

// In this case it actually helps to have an empty line at the end.
if (data[data.length - 1] !== '') {
  data.push('');
}

// Here we go - approach 2 was the better idea, makes part 2 easy. Function is
// now returning the whole sorted array.
function createSortedElves(lines: string[]): number[] {
  const elves: number[] = [];
  let calories: number = 0;
  for (const line of lines) {
    if (line === '') { // EOE - End Of Elf
      // We rely that the data does not contain consecutive empty lines,
      // so calories can't be 0 at this point.
      elves.push(calories);
      calories = 0;
    } else {
      calories += parseInt(line, 10);
    }
  }
  elves.sort((a, b) => b - a);
  return elves;
}

function getTopCalories(lines: string[], topN: number = 1): number {
  const elves = createSortedElves(lines);
  return elves.slice(0, topN).reduce((sum, current) => sum + current);
}

console.log(getTopCalories(data, 3));
