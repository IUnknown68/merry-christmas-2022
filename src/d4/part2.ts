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

function overlaps(rangeTest : Range, rangeTarget : Range) : boolean {
  return (
    ((rangeTest.start >= rangeTarget.start) && (rangeTest.start <= rangeTarget.end))
    || ((rangeTarget.start >= rangeTest.start) && (rangeTarget.start <= rangeTest.end))
  );
}

function countOverlaps(groups: RangeTuple[]): number {
  return groups.reduce(
    (sum, group) => (overlaps(group[0], group[1]) ? sum + 1 : sum),
    0
  );
}

console.log(countOverlaps(parseData(data)));
