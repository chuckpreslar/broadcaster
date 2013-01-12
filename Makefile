# Broadcaster Makefile
VERSION=1.0.8

test:
	@./node_modules/.bin/serve test

build:
	cp index.js broadcaster-$(VERSION).js
	uglifyjs -m -c -o broadcaster-$(VERSION).min.js index.js
	uglifyjs --source-map broadcaster-$(VERSION).map.js broadcaster-$(VERSION).js

.PHONY: test