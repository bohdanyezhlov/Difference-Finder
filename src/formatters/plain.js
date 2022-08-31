import _ from 'lodash';

const createPath = (path, name) => {
  if (path !== '') {
    return [path, name].join('.');
  }
  return name;
};

const toString = (obj) => {
  if (!_.isObject(obj)) {
    if (typeof obj === 'string') {
      return `'${obj}'`;
    }
    return String(obj);
  }

  return '[complex value]';
};

const conversionFunctions = {
  root: (item, path, fn) => {
    const result = item.children.flatMap((child) => {
      if (child.type === 'unchanged') {
        return [];
      }
      return conversionFunctions[child.type](child, path, fn);
    });
    return `${result.join('\n')}`;
  },
  added: (item, path) => `Property '${createPath(path, item.name)}' was added with value: ${toString(item.value)}`,
  removed: (item, path) => `Property '${createPath(path, item.name)}' was removed`,
  nested: (item, path, fn) => {
    const result = item.children.flatMap((child) => {
      if (child.type === 'unchanged') {
        return [];
      }
      return conversionFunctions[child.type](child, createPath(path, item.name), fn);
    });

    return `${String(
      result.join('\n'),
    )}`;
  },
  changed: (item, path) => `Property '${createPath(path, item.name)}' was updated. From ${toString(item.value1)} to ${toString(item.value2)}`,
  unchanged: () => null,
};

const plain = (diff) => {
  const iter = (item, path) => conversionFunctions[item.type](item, path, iter);

  return iter(diff, '');
};

export default plain;
