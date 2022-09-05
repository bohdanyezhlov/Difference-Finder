import plain from './plain.js';
import stylish from './stylish.js';

const formatters = {
  stylish: (diff) => stylish(diff),
  plain: (diff) => plain(diff),
  json: (diff) => JSON.stringify(diff),
};

export default (diff, type) => formatters[type](diff);
