#!/bin/bash

touch /tmp/promote
gosu postgres pg_ctl reload -D /var/lib/postgresql/data/pgdata