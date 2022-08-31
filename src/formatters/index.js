import plain from './plain.js';
import stylish from './stylish.js';

export default (diff, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(diff);
  }

  if (format === 'plain') {
    return plain(diff);
  }

  if (format === 'json') {
    return JSON.stringify(diff);
  }

  return `Unknown format ${format}`;
};
