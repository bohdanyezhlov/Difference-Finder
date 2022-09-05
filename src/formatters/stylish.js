import _ from 'lodash';

const replaceAt = (str, index, symbol) => (
  str.substring(0, index) + symbol + str.substring((index) + symbol.length)
);

const indent = (depth, symbol = ' ') => {
  const emptyString = '    '.repeat(depth);
  const string = replaceAt(emptyString, emptyString.length - 2, symbol);
  return depth === 0 ? '    ' : string;
};

const stringify = (val, depth) => {
  if (!_.isObject(val) || Array.isArray(val)) {
    return String(val);
  }

  const entries = Object.entries(val);
  const result = entries
    // eslint-disable-next-line no-use-before-define
    .map(([key, value]) => conversionFunctions.unchanged({ key, value }, depth + 1));

  return `{\n${result.join('\n')}\n${indent(depth)}}`;
};

const conversionFunctions = {
  root: (node, depth, fn) => {
    const result = node.children
      .map((child) => conversionFunctions[child.type](child, depth + 1, fn));
    return `{\n${result.join('\n')}\n}`;
  },
  added: (node, depth) => `${indent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`,
  removed: (node, depth) => `${indent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`,
  nested: (node, depth, fn) => {
    const result = node.children
      .map((child) => conversionFunctions[child.type](child, depth + 1, fn));
    return `${indent(depth)}${node.key}: {\n${String(
      result.join('\n'),
    )}\n${indent(depth)}}`;
  },
  changed: (node, depth) => `${indent(depth, '-')}${node.key}: ${stringify(
    node.value1,
    depth,
  )}\n${indent(depth, '+')}${node.key}: ${stringify(
    node.value2,
    depth,
  )}`,
  unchanged: (node, depth) => `${indent(depth)}${node.key}: ${stringify(node.value, depth)}`,
};

const stylish = (diff) => {
  const iter = (node, depth) => conversionFunctions[node.type](node, depth, iter);

  return iter(diff, 0);
};

export default stylish;
