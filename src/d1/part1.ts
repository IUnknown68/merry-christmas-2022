// eslint-disable-next-line max-classes-per-file
import {
  readFile,
} from 'node:fs/promises';

const data: string[] = (await readFile('src/d1/data.txt', 'utf-8'))
  .split('\n');

// In this case it actually helps to have an empty line at the end.
if (data[data.length - 1] !== '') {
  data.push('');
}

/*
// Approach 1 - the let's-use-array-methods-approach. Not very flexible though.
function getMostCalories(lines: string[]): number {
  const result = lines.reduce((acc, line) => {
    if (line === '') {
      // EOE - End Of Elf
      acc.caloriesMax = Math.max(acc.caloriesMax, acc.caloriesCurrent);
      acc.caloriesCurrent = 0;
    } else {
      acc.caloriesCurrent += parseInt(line, 10);
    }
    return acc;
  }, { caloriesMax: 0, caloriesCurrent: 0 });
  // Don't forget: Current might still contain the last elf.
  return Math.max(result.caloriesMax, result.caloriesCurrent);
}

console.log(getMostCalories(data));
*/

// Approach 2 - classical. Probably better maintainable and easier to reason
// about.
function getMostCalories(lines: string[]): number {
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
  return elves[0];
}

console.log(getMostCalories(data));

/*
// Approach 3: OO-Approach. In case we are planning a christmas-app and will be
// dealing with elves and their food all the time.
class Elf {
  calories: number;

  constructor() {
    this.calories = 0;
  }

  addCalories(calories: number): void {
    this.calories += calories;
  }
}

class ElfCollection {
  elves: Elf[];

  constructor() {
    this.elves = [];
  }

  addElf(elf: Elf): void {
    this.elves.push(elf);
  }

  getTopElf(): Elf {
    // Sure, we could do a
    // return [...this.elves].sort((a, b) => b - a)[0];
    // but that means sorting the whole array.
    return this.elves.reduce(
      (result, elf) => (elf.calories > result.calories ? elf : result)
    );
  }
}

function getMostCalories(lines: string[]): number {
  const elves = new ElfCollection();
  let elv = new Elf();
  for (const line of lines) {
    if (line === '') { // EOE - End Of Elf
      elves.addElf(elv);
      elv = new Elf();
    } else {
      elv.addCalories(parseInt(line, 10));
    }
  }
  return elves.getTopElf().calories;
}

console.log(getMostCalories(data));
*/
