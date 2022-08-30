import _ from 'lodash';

const replaceAt = (str, index, symbol) => (
  str.substring(0, index) + symbol + str.substring((index) + symbol.length)
);

const indent = (depth, symbol = ' ') => {
  const emptyString = '    '.repeat(depth);
  const string = replaceAt(emptyString, emptyString.length - 2, symbol);
  return depth === 0 ? '    ' : string;
};

const toString = (obj, depth) => {
  if (!_.isObject(obj)) {
    return String(obj);
  }

  const entries = Object.entries(obj);
  const result = entries
    // eslint-disable-next-line no-use-before-define
    .map(([name, value]) => conversionFunctions.unchanged({ name, value }, depth + 1));

  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const conversionFunctions = {
  root: (item, depth, fn) => {
    const result = item.children
      .map((child) => conversionFunctions[child.type](child, depth + 1, fn))
      .join('\n');
    return `{\n${result}\n}`;
  },
  added: (item, depth) => `${indent(depth, '+')}${item.name}: ${toString(item.value, depth)}`,
  removed: (item, depth) => `${indent(depth, '-')}${item.name}: ${toString(item.value, depth)}`,
  nested: (item, depth, fn) => {
    const result = item.children
      .map((child) => conversionFunctions[child.type](child, depth + 1, fn))
      .join('\n');
    return `${indent(depth)}${item.name}: {\n${String(
      result,
    )}\n${indent(depth)}}`;
  },
  changed: (item, depth) => `${indent(depth, '-')}${item.name}: ${toString(
    item.value1,
    depth,
  )}\n${indent(depth, '+')}${item.name}: ${toString(
    item.value2,
    depth,
  )}`,
  unchanged: (item, depth) => `${indent(depth)}${item.name}: ${toString(item.value, depth)}`,
};

const stylish = (diff) => {
  const iter = (item, depth) => conversionFunctions[item.type](item, depth, iter);

  return iter(diff, 0);
};

const formatter = (diff, format = 'stylish') => {
  if (format !== 'stylish') {
    return `Unknown format ${format}`;
  }

  return stylish(diff);
};

export default formatter;
