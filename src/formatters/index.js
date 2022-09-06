import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  stylish,
  plain,
  json: JSON.stringify,
};

export default (type) => formatters[type];
