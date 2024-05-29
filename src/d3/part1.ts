import {
  readFile,
} from 'fs/promises';

const data: string[] = (await readFile('src/d3/data.txt', 'utf-8'))
  .split('\n');

function itemPriority(itemType: string): number {
  const code = itemType.charCodeAt(0);
  return (code > 96)
    ? code - 96 // 'a...'
    : code - 38; // 'A...';
}

function getPrioritySum(lines: string[]): number {
  return lines.reduce(
    (sum, line) => {
      const left = line.slice(0, line.length / 2);
      const right = line.slice(line.length / 2);
      const keys = [...new Set(line)];
      const containedInBoth = keys.filter((key) => left.includes(key) && right.includes(key));
      return sum + containedInBoth.reduce((acc, key) => acc + itemPriority(key), 0);
    }, 0);
}

console.log(getPrioritySum(data));
