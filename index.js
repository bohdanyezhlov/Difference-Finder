import { program } from 'commander';

// const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.13.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format');

program.parse();

export default program;
