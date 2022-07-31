FROM postgres:latest
 ENV POSTGRES_USER ${POSTGRES_USER}
 ENV POSTGRES_PASSWORD ${POSTGRES_PASSWORD}
 ENV POSTGRES_DB ${DB_DATABASE_NAME}
COPY *.sql /docker-entrypoint-initdb.d/
# ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE ${POSTGRES_PORT}
CMD ["postgres", "-c", "logging_collector=on", "-c", "log_statement=mod"]
