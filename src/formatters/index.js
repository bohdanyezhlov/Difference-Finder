import plain from './plain.js';
import stylish from './stylish.js';

export default (diff, format) => {
  if (format === 'stylish') {
    return stylish(diff);
  }

  if (format === 'plain') {
    return plain(diff);
  }

  if (format === 'json') {
    return JSON.stringify(diff);
  }

  throw new Error(`Unknown format ${format}`);
};
