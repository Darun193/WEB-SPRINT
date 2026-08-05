.PHONY: frontend-build image run

frontend-build:
	npm run build

image:
	docker build -t docker-demo .

run: image
	docker run --rm -p 8082:80 docker-demo