# AIT - Postgres replication demo

This repository contains a pre-configured docker image of `postgresql`  which supports streaming replication.
Docker image build based on https://github.com/hakamadare/docker-postgres-replication.

## Performing the demo

  1. start all containers: `docker-compose up --build`
  2. start more slaves: `docker-compose scale pg-slave=2`
  2. access the mini web interface at http://localhost:3000
  3. add some data (you can also interact with the servers directly using `docker exec -it <container> gosu postgres psql -d data`)
  4. slay the master: `docker kill demo2_pg-master_1`
  5. promote a slave: `docker exec demo2_pg-slave_1 /utils/promote.sh`
  6. reconfigure slaves: `docker exec demo2_pg-slave_2 /utils/update.sh (./get-ip demo2_pg-slave_1)`
  7. restart slaves: `docker restart demo2_pg-slave_2`

Slaves should now replicate from the new master.