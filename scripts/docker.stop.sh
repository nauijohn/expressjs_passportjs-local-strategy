echo 'Stopping docker containers...'

docker compose -p expressjs_passportjs-local-strategy \
	-f .docker/docker-compose.yml \
	\
	down # -f .docker/docker-compose.dev.yml \
