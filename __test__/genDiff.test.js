import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const expected = readFile(('expected_file.yml'));

test('gendiff', () => {
  expect(actual).toBe(expected);
});
