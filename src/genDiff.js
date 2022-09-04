import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import parser from './parsers.js';
import createDiff from './createDiff.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath);
const readFile = (filepath) => readFileSync(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const extension1 = getExtension(path1);
  const extension2 = getExtension(path2);

  const data1 = parser(readFile(path1), extension1);
  const data2 = parser(readFile(path2), extension2);
  const diff = createDiff(data1, data2);

  return formatter(diff, format);
};

export default genDiff;
