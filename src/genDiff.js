import _ from 'lodash';
import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import parser from './parsers.js';
// import formatter from './formatter.js';

const createDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const result = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const currentValue = createDiff(value1, value2);
      console.log(currentValue);
      return {
        name: key,
        value: currentValue,
        type: 'unchanged',
      };
    }

    if (!(_.has(data1, key))) {
      return {
        name: key,
        value: value2,
        type: 'added',
      };
    } if (!(_.has(data2, key))) {
      return {
        name: key,
        value: value1,
        type: 'deleted',
      };
    } if (value1 !== value2) {
      return {
        name: key,
        value1,
        value2,
        type: 'changed',
      };
    }
    return {
      name: key,
      value: value1,
      type: 'unchanged',
    };
  });

  return result;
};

const genDiff = (filepath1, filepath2) => {
  const path1 = resolve(process.cwd(), filepath1);
  const path2 = resolve(process.cwd(), filepath2);
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  const data1 = parser(readFileSync(path1), extension1);
  const data2 = parser(readFileSync(path2), extension2);

  const diff = createDiff(data1, data2);
  console.log(diff);
  // const result = formatter(diff, format);
  // return result;
};

export default genDiff;
