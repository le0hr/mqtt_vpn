FROM postgres:15-alpine

ENV POSTGRES_DB=sensor_data
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=user

COPY init.sql /docker-entrypoint-initdb.d/

