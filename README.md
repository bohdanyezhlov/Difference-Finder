# Difference generator
[![Actions Status](https://github.com/Bohdan2241/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Bohdan2241/frontend-project-lvl2/actions)
[![Node CI](https://github.com/Bohdan2241/frontend-project-lvl2/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Bohdan2241/frontend-project-lvl2/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/b2d52342403a73a27529/maintainability)](https://codeclimate.com/github/Bohdan2241/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b2d52342403a73a27529/test_coverage)](https://codeclimate.com/github/Bohdan2241/frontend-project-lvl2/test_coverage)
## Difference generator - compares two configuration files and shows a difference.
#### Supported file formats: json, yaml
#### Supported output: stylish, plain, json
## Installing
- `make install` install dependencies
- `make link` install the package
## Tests and Linters
- `make test`
- `make test --coverage`
- `make lint`
## Usage
- `gendiff -f plain yourfile1.json yourfile2.yaml`
## Options
- `gendiff -h` display help for command
- `gendiff -V` output the version number
- `gendiff -f <type>` output format [stylish, plain, json] (default: 'stylish')
## Demo
[![asciicast](https://asciinema.org/a/518921.svg)](https://asciinema.org/a/518921)