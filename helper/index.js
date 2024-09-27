async function insertData(bigquery, datasetId, tableId, rows) {
    try {


        await bigquery.dataset(datasetId).table(tableId).insert(rows);
        console.log(`Inserted ${rows.length} rows into ${tableId}.`);
    } catch (err) {
        console.error('Error inserting data:', err);
    }
}
// async function  updateData(bigquery,data) {
    
// }

module.exports = { insertData }