import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import parser from './parsers.js';
import createDiff from './createDiff.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filepath) => resolve(process.cwd(), filepath);
const getExtension = (filepath) => path.extname(filepath).substring(1);
const readFile = (filepath) => readFileSync(filepath);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const extension1 = getExtension(path1);
  const extension2 = getExtension(path2);

  const data1 = parser(extension1)(readFile(path1));
  const data2 = parser(extension2)(readFile(path2));
  const diff = createDiff(data1, data2);

  return formatter(format)(diff);
};

export default genDiff;
