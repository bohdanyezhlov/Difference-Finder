import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
const actual2 = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
const expected = readFile(('expected_file.yml'));

test('gendiff for json files', () => {
  expect(actual1).toBe(expected);
});

test('gendiff for yml files', () => {
  expect(actual2).toBe(expected);
});
