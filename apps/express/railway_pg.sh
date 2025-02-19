#!/bin/bash

docker run \
    --name postgres \
    -e POSTGRES_PASSWORD= \
    -e PGPASSWORD= \
    -d postgres

docker exec -it postgres \
    psql -h maglev.proxy.rlwy.net \
    -U postgres \
    -p 50187 \
    -d railway

