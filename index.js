const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const path = require('path')
const app = express();
const port = process.env.PORT || 8080;


process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, './graphic-ring-435605-d0-c273fd9da9fb.json')
// Instantiate BigQuery client
const bigquery = new BigQuery();
// Define a route that queries the public BigQuery dataset for USA Names
app.get('/', async (req, res) => {
    try {
        // Define the SQL query to retrieve data from the public dataset
        const query = `
      SELECT name, gender, number
      FROM \`bigquery-public-data.usa_names.usa_1910_current\`
      WHERE year = 2020
      ORDER BY number DESC
      LIMIT 10;
    `;

        // Run the query on BigQuery
        const [rows] = await bigquery.query(query);

        // Send the query results as JSON
        res.json(rows);
    } catch (err) {
        console.error('ERROR:', err);
        res.status(500).send('Error querying BigQuery');
    }
});
app.get('/all', async (req, res) => {
    try {
        // Define the SQL query to retrieve data from the public dataset
        const query = `
      SELECT *
      FROM \`bigquery-public-data.usa_names.usa_1910_current\`
      WHERE year = 2020
      ORDER BY number DESC
      LIMIT 10;
    `;

        // Run the query on BigQuery
        const [rows] = await bigquery.query(query);

        // Send the query results as JSON
        res.json(rows);
    } catch (err) {
        console.error('ERROR:', err);
        res.status(500).send('Error querying BigQuery');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
