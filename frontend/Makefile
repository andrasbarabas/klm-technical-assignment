.PHONY: all
all: build test-ci format clean

.PHONY: build
build:
	npm run build

.PHONY: clean
clean:
	rm -rf .angular coverage dist

.PHONY: format
format:
	npm run format

.PHONY: test
test:
	npm run test

.PHONY: test-ci
test-ci:
	npm run test:ci
