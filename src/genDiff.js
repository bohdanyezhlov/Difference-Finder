import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import parser from './parsers.js';
import creatingDiff from './creatingDiff.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format) => {
  const path1 = resolve(process.cwd(), filepath1);
  const path2 = resolve(process.cwd(), filepath2);
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  const data1 = parser(readFileSync(path1), extension1);
  const data2 = parser(readFileSync(path2), extension2);
  const diff = creatingDiff(data1, data2);

  const result = formatter(diff, format);
  return result;
};

export default genDiff;
