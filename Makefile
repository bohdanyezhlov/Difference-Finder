install: install-deps

install-deps:
	npm ci

link:
	sudo npm link

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8