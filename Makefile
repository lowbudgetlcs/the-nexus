# Name of the Docker image
APP_NAME = the-nexus
PORT = 3000

all: build run

# Build the Docker image
build:
	docker build -t $(APP_NAME) -f Dockerfile .

build-debug:
	docker build --no-cache --progress=plain -t $(APP_NAME) -f Dockerfile .

run:
	docker-compose up

# Stop and remove the running container
stop:
	docker stop $(APP_NAME)-container || true
	docker rm $(APP_NAME)-container || true

# Clean up all stopped containers and dangling images
clean:
	docker rmi $(APP_NAME) || true

erase: stop clean

# Rebuild and restart the container
all: erase build run

# Show logs from the running container
logs:
	docker logs -f $(APP_NAME)-container

# Show running containers
ps:
	docker ps

.PHONY: build run run-interactive stop clean restart logs ps all erase build-debug

