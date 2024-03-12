const express = require('express');
const app = express();
const localData = require('./data.json')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// TODO: ADD API KEY

const apiKey = null

app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch('https://api.football-data.org/v4/competitions/SA/scorers',
            {
                headers: {
                    "X-Auth-Token": apiKey
                }
            });
        const data = await response.json();

        res.json(apiKey ? data : localData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
