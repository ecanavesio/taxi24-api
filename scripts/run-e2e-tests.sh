#!/bin/bash

# Start the PostgreSQL container
docker run --rm -d -p 5432:5432 \
  -e POSTGRES_USER=taxi24User \
  -e POSTGRES_PASSWORD=SuperPowerfull24Pass \
  -e POSTGRES_DB=taxi24 \
  --name taxi-postgres \
  postgis/postgis:15-3.3-alpine

# Run the e2e tests
npx jest --config jest-e2e.config.ts --detectOpenHandles

# Stop and remove the PostgreSQL container
docker stop taxi-postgres
