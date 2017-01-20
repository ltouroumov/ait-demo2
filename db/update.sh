#!/bin/bash

export REPLICATE_FROM=$1
/docker-entrypoint-initdb.d/setup-replication.sh