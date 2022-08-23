import _ from 'lodash';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const diffArr = sortedKeys.map((key) => {
    if (!(_.has(data1, key))) {
      return {
        name: key,
        value: data2[key],
        type: 'added',
      };
    } if (!(_.has(data2, key))) {
      return {
        name: key,
        value: data1[key],
        type: 'deleted',
      };
    } if (data1[key] !== data2[key]) {
      return {
        name: key,
        value1: data1[key],
        value2: data2[key],
        type: 'changed',
      };
    }
    return {
      name: key,
      value: data1[key],
      type: 'unchanged',
    };
  });

  return diffArr;
};

const genDiff = (filepath1, filepath2) => {
  const path1 = resolve(process.cwd(), filepath1);
  const path2 = resolve(process.cwd(), filepath2);

  const data1 = JSON.parse(readFileSync(path1), 'utf-8');
  const data2 = JSON.parse(readFileSync(path2), 'utf-8');

  const diff = createDiff(data1, data2);

  diff.forEach((item) => {
    if (item.type === 'deleted') {
      console.log(`- ${item.name}: ${item.value}`);
    } else if (item.type === 'unchanged') {
      console.log(`  ${item.name}: ${item.value}`);
    } else if (item.type === 'changed') {
      console.log(`- ${item.name}: ${item.value1}`);
      console.log(`+ ${item.name}: ${item.value2}`);
    } else {
      console.log(`+ ${item.name}: ${item.value}`);
    }
  });
};

export default genDiff;
