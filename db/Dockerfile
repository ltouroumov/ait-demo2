FROM postgres:9.6
MAINTAINER Daniel Dent (https://www.danieldent.com)
ENV PG_MAX_WAL_SENDERS 8
ENV PG_WAL_KEEP_SEGMENTS 8
COPY setup-replication.sh /docker-entrypoint-initdb.d/
COPY docker-entrypoint.sh /docker-entrypoint.sh
COPY promote.sh /utils/
COPY update.sh /utils/
COPY sql /sql
RUN chmod +x /utils/*.sh /sql/*.sh /docker-entrypoint-initdb.d/setup-replication.sh /docker-entrypoint.sh
