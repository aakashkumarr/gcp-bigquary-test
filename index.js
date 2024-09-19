const express = require('express');
const { BigQuery } = require('@google-cloud/bigquery');
const app = express();
const port = process.env.PORT || 8080;
// Instantiate BigQuery client
let cred = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
const bigquery = new BigQuery({ credentials: cred, projectId: cred.projectId });
// Define a route that queries the public BigQuery dataset for USA Names
app.get('/', async (req, res) => {
    try {
        // Define the SQL query to retrieve data from the public dataset
        const query = `
      SELECT firstName, lastName, age FROM \`graphic-ring-435605-d0.bq_user_test.users\`;
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
      FROM \`graphic-ring-435605-d0.bq_user_test.users\`;
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
