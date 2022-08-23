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

  let resultStr = '{\n';
  diff.forEach((item, i) => {
    let endOfStr = '';
    if (i !== diff.length - 1) {
      endOfStr = '\n';
    } else {
      endOfStr = '';
    }

    if (item.type === 'deleted') {
      resultStr += `  - ${item.name}: ${item.value}${endOfStr}`;
    } else if (item.type === 'unchanged') {
      resultStr += `    ${item.name}: ${item.value}${endOfStr}`;
    } else if (item.type === 'changed') {
      resultStr += `  - ${item.name}: ${item.value1}${endOfStr}`;
      resultStr += `  + ${item.name}: ${item.value2}${endOfStr}`;
    } else {
      resultStr += `  + ${item.name}: ${item.value}${endOfStr}`;
    }
  });

  return `${resultStr}\n}`;
};

export default genDiff;
