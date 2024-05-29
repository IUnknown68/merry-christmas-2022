import {
  readFile,
} from 'fs/promises';

const data: string[] = (await readFile('src/d4/data.txt', 'utf-8'))
  .split('\n');

interface Range {
  start: number;
  end: number;
}

type RangeTuple = [Range, Range];

// Ok, I admit, this one is rather wild...
function parseData(rows: string[]): RangeTuple[] {
  return rows
    .map((row) => row
      .split(',')
      .map((rangeStr) => rangeStr
        .split('-')
        .map((val) => parseInt(val, 10)))
      .map(([start, end]) => ({ start, end })) as RangeTuple
    );
}

function isContainedIn(rangeTest : Range, rangeTarget : Range) : boolean {
  return (rangeTest.start >= rangeTarget.start)
    && (rangeTest.end <= rangeTarget.end);
}

function isContainedInOneAnother(rangeTest : Range, rangeTarget : Range) : boolean {
  return isContainedIn(rangeTest, rangeTarget) || isContainedIn(rangeTarget, rangeTest);
}

function countContaining(groups: RangeTuple[]): number {
  return groups.reduce(
    (sum, group) => (isContainedInOneAnother(group[0], group[1]) ? sum + 1 : sum),
    0
  );
}

console.log(countContaining(parseData(data)));
