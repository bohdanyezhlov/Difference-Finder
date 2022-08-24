import yaml from 'js-yaml';

const parser = (data, extension) => {
  if (extension === '.json') {
    return JSON.parse(data, 'utf-8');
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data, 'utf-8');
  }

  return new Error('unexpected extension');
};

export default parser;