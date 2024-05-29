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

function getCommonItem(rucksacks: string[]): string {
  const keys = [...new Set(rucksacks.join(''))];
  // Puzzle states "only item type carried by all three Elves", so there
  // can be no more than one common item. Just return first.
  return keys.filter(
    (key) => rucksacks.every((rucksack) => rucksack.includes(key))
  )[0];
}

function getPrioritySumGrouped(groups: string[][]): number {
  return groups.reduce(
    (sum, group) => sum + itemPriority(getCommonItem(group)),
    0
  );
}

function arrayDivide<T>(ar: T[], factor: number): T[][] {
  const ret = new Array(Math.ceil(ar.length / factor));
  for (let n = 0; n < ret.length; ++n) {
    ret[n] = ar.slice(n * factor, (n + 1) * factor);
  }
  return ret;
}

console.log(getPrioritySumGrouped(arrayDivide(data, 3)));
