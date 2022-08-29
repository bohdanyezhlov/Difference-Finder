import _ from 'lodash';

const stylish = (diff) => {
  const iter = (currentValue) => {
    if (_.isObject(currentValue) && !Array.isArray(currentValue)) {
      console.log(currentValue, 'from start!!!!!!!!!');
    }

    const result = currentValue.map((item) => {
      if (Array.isArray(item.value)) {
        // console.log(item.value);
        if (item.type === 'deleted') {
          return `  - ${item.name}: ${iter(item.value)}`;
        }
        if (item.type === 'unchanged') {
          return `    ${item.name}: ${iter(item.value)}`;
        }
        if (item.type === 'changed') {
          return `  - ${item.name}: ${iter(item.value1)}\n  + ${item.name}: ${iter(item.value2)}`;
        }
        return `  + ${item.name}: ${iter(item.value)}`;
      }

      if (_.isObject(item.value)) {
        // const keys = Object.keys(item);
        // console.log(keys);
        // console.log([item.value], 'fix me pls!');
        // return `  ${item.type} ${item.name}: ${iter([item.value])}`;
        // if (item.type === 'deleted') {
        //   return `  - ${item.name}: ${item.value}`;
        // }
        // if (item.type === 'unchanged') {
        //   return `    ${item.name}: ${item.value}`;
        // }
        // if (item.type === 'changed') {
        //   return `  - ${item.name}: ${item.value1}\n  + ${item.name}: ${item.value2}`;
        // }
        // return `  + ${item.name}: ${item.value}`;
      }

      if (item.type === 'deleted') {
        return `  - ${item.name}: ${item.value}`;
      }
      if (item.type === 'unchanged') {
        return `    ${item.name}: ${item.value}`;
      }
      if (item.type === 'changed') {
        return `  - ${item.name}: ${item.value1}\n  + ${item.name}: ${item.value2}`;
      }
      return `  + ${item.name}: ${item.value}`;
    });

    return `{\n${result.join('\n')}\n}`;
  };

  return iter(diff);
};

const formatter = (diff, format = 'stylish') => {
  if (format === '?') {
    // return
  }

  return stylish(diff);
};

export default formatter;
