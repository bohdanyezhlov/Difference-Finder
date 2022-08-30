import _ from 'lodash';

const creatingDiffTree = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      const currentValue = creatingDiffTree(value1, value2);
      return {
        name: key,
        children: currentValue,
        type: 'nested',
      };
    }

    if (!(_.has(data1, key))) {
      return {
        name: key,
        value: value2,
        type: 'added',
      };
    }

    if (!(_.has(data2, key))) {
      return {
        name: key,
        value: value1,
        type: 'removed',
      };
    }

    if (value1 !== value2) {
      return {
        name: key,
        value1,
        value2,
        type: 'changed',
      };
    }

    return {
      name: key,
      value: value1,
      type: 'unchanged',
    };
  });
};

const createTree = (object1, object2) => ({
  children: creatingDiffTree(object1, object2),
  type: 'root',
});

export default createTree;
