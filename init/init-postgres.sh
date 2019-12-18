#!/bin/bash

echo "Creating database $LAB_PG_DB..."
psql -d postgres -c "CREATE DATABASE $LAB_PG_DB"
psql -d homerlabmb -c "CREATE USER $LAB_PG_WRITER WITH ENCRYPTED PASSWORD '$LAB_PG_PASS'"
psql -d homerlabmb -c "CREATE TABLE stories(ID SERIAL PRIMARY KEY, LAUNCH_DATE DATE, TITLE TEXT, PRIVACY BOOLEAN, LIKES INT)"
psql -d homerlabmb -c "GRANT USAGE ON SCHEMA public TO $LAB_PG_WRITER"
psql -d homerlabmb -c "GRANT ALL PRIVILEGES ON stories TO $LAB_PG_WRITER"
psql -d homerlabmb -c "GRANT ALL PRIVILEGES ON stories_id_seq TO $LAB_PG_WRITER"
