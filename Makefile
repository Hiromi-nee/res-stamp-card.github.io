PORT ?= 8000

.PHONY: help build pages validate preview clean rebuild all

help:
	@printf '%s\n' \
	  'Targets:' \
	  '  make build     Build worker artifact into dist/' \
	  '  make pages     Build static GitHub Pages output into pages-dist/' \
	  '  make validate  Validate dist/ artifact exports default.fetch' \
	  '  make preview   Build pages-dist/ and serve locally at http://localhost:$(PORT)' \
	  '  make clean     Remove dist/ and pages-dist/' \
	  '  make rebuild   Clean, then build worker and pages output' \
	  '  make all       Build worker, validate artifact, and build pages output'

build:
	npm run build

pages:
	npm run build:pages

validate: build
	npm run validate

preview: pages
	python3 -m http.server $(PORT) --directory pages-dist

clean:
	rm -rf dist pages-dist

rebuild: clean build pages

all: build validate pages
