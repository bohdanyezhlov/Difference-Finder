import _ from 'lodash';
import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import parser from './parsers.js';

const createDiff = (data1, data2) => {
  const iter = (currentValue1, currentValue2) => {
    const keys1 = Object.keys(currentValue1);
    const keys2 = Object.keys(currentValue2);
    const unionKeys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(unionKeys);
    // console.log(sortedKeys);

    const result = sortedKeys.map((key) => {
      const value1 = currentValue1[key];
      const value2 = currentValue2[key];

      if (_.isObject(value1) && _.isObject(value2)) {
        console.log(value1);
        console.log(value2);
        return iter(value1, value2);
      }

      if (!(_.has(currentValue1, key))) {
        return {
          name: key,
          value: currentValue2[key],
          type: 'added',
        };
      } if (!(_.has(currentValue2, key))) {
        return {
          name: key,
          value: currentValue1[key],
          type: 'deleted',
        };
      } if (currentValue1[key] !== currentValue2[key]) {
        return {
          name: key,
          value1: currentValue1[key],
          value2: currentValue2[key],
          type: 'changed',
        };
      }
      return {
        name: key,
        value: currentValue1[key],
        type: 'unchanged',
      };
    });

    return result;
  };

  return iter(data1, data2);
};

const genDiff = (filepath1, filepath2) => {
  const path1 = resolve(process.cwd(), filepath1);
  const path2 = resolve(process.cwd(), filepath2);
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  const data1 = parser(readFileSync(path1), extension1);
  const data2 = parser(readFileSync(path2), extension2);

  const diff = createDiff(data1, data2);

  const result = diff.map((item) => {
    if (item.type === 'deleted') {
      return `  - ${item.name}: ${item.value}`;
    }
    if (item.type === 'unchanged') {
      return `    ${item.name}: ${item.value}`;
    }
    if (item.type === 'changed') {
      return `  - ${item.name}: ${item.value1}\n  + ${item.name}: ${item.value2}`;
    }
    return `  + ${item.name}: ${item.value}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
