#!/bin/bash

# Create a Docker volume (if not already created)
docker volume create mongo-data

# Start MongoDB container with replica set and volume
docker run --rm -d \
  -p 27017:27017 \
  -h "$(hostname)" \
  --name mongo \
  -v mongo-data:/data/db \
  mongo:6.0.5 \
  --replSet=RS

# Wait a few seconds for MongoDB to be ready
sleep 5

# Initialize the replica set
docker exec mongo mongosh --quiet --eval "rs.initiate();"
