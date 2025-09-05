# Name of the Docker image
APP_NAME = the-nexus
PORT = 3000

all: build run

# Build the Docker image
build:
	docker build -t $(APP_NAME):local -f Dockerfile .

build-debug:
	docker build --no-cache --progress=plain -t $(APP_NAME):local -f Dockerfile .

run:
	docker-compose up

# Stop and remove the running container
stop:
	docker stop $(APP_NAME)-container || true
	docker rm $(APP_NAME)-container || true

clean:
	docker rmi $(APP_NAME):local || true

erase: stop clean

logs:
	docker logs -f $(APP_NAME)-container

.PHONY: build run run-interactive stop clean restart logs ps all erase build-debug

