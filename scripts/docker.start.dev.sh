#!/bin/bash

echo "Running docker.start.sh script"

docker compose -p expressjs_passportjs-local-strategy \
	-f .docker/docker-compose.yml \
	-f .docker/docker-compose.dev.yml \
	up -d --build

echo "Finish running docker.start.sh script"
