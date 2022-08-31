import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
const actual2 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
const expected1 = readFile(('expected_file.yml'));
const expected2 = readFile(('expected_plain_file.yaml'));

test('gendiff stylish format', () => {
  expect(actual1).toBe(expected1);
});

test('gendiff plain format', () => {
  expect(actual2).toBe(expected2);
});
