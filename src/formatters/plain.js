import _ from 'lodash';

const createPath = (path, key) => {
  if (path !== '') {
    return [path, key].join('.');
  }
  return key;
};

const stringify = (val) => {
  if (!_.isObject(val) || Array.isArray(val)) {
    if (typeof val === 'string') {
      return `'${val}'`;
    }
    return String(val);
  }

  return '[complex value]';
};

const conversionFunctions = {
  root: (node, path, fn) => {
    const result = node.children
      .flatMap((child) => conversionFunctions[child.type](child, path, fn));

    return `${result.join('\n')}`;
  },
  added: (node, path) => `Property '${createPath(path, node.key)}' was added with value: ${stringify(node.value)}`,
  removed: (node, path) => `Property '${createPath(path, node.key)}' was removed`,
  nested: (node, path, fn) => {
    const result = node.children
      .flatMap((child) => conversionFunctions[child.type](child, createPath(path, node.key), fn));

    return `${String(
      result.join('\n'),
    )}`;
  },
  changed: (node, path) => (
    `Property '${createPath(path, node.key)}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`
  ),
  unchanged: () => [],
};

const plain = (diff) => {
  const iter = (node, path) => conversionFunctions[node.type](node, path, iter);

  return iter(diff, '');
};

export default plain;
