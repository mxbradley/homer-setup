GraphQL Interview Project

In terminal:

Install necessary NPM dependencies: `npm i`

`cd` to "init" directory

Edit `lab_env.sh` as appropriate for Postgres DB

Source `lab_env.sh` `Term> . lab_env.sh`      *Yes, could have used .env file; Demo of shell scripting

Run `init-postgres.sh` which will create necessary Postgres DB/table - Creates a new database, add "stories" table, sets up permissions

Run `dbloader` script: `Term> ./src/dbloader.js`

Should see feedback that stories.csv file has been loaded.

Now proceed to `homer-api` project
