import plain from './plain.js';
import stylish from './stylish.js';

export default (diff, format = 'stylish') => {
  if (format === 'plain') {
    return plain(diff);
  }

  if (format === 'stylish') {
    return stylish(diff);
  }

  return `Unknown format ${format}`;
};
