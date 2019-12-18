#!/usr/bin/env node

const fs = require('fs');
const fastcsv = require('fast-csv');
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.LAB_PG_WRITER,
    host: process.env.LAB_PG_HOST,
    database: process.env.LAB_PG_DB,
    password: process.env.LAB_PG_PASS,
    port: process.env.LAB_PG_PORT
});

const stream = fs.createReadStream("../data/stories.csv");
const errFile = fs.createWriteStream("../data/errors-stories.csv", {
    flags: "a"
});
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
        data[2] = (data[2] == 'private' ? 'TRUE' : 'FALSE');
        csvData.push(data);
    })
    .on("end", function() {
        csvData.shift();
    });

const query = "INSERT INTO stories (launch_date, title, privacy, likes) VALUES ($1, $2, $3, $4)";
let errCount = 0;

pool.connect((err, client, done) => {
    if (err) throw err;

    try {
        csvData.forEach(row => {
            client.query(query, row, (err, res) => {
                if (err) {
                    errCount++;
                    errFile.write(row.toString());
                } else {
                    console.log("Inserted row:", row);
                }
            });
        });
    } finally {
        if (errCount > 0) {
            console.log("There was at least one error, check the data directory for error file");
        }
        done();
    }
});

stream.pipe(csvStream);
