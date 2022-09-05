import yaml from 'js-yaml';

const parser = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
};

export default (data, type) => parser[type](data);
