import express from 'express';
import { env } from './config/env.js';
import { connection } from './config/db.js';

const app = express();
const port = env.SERVE_PORT;

// Index
app.get('/', async (req, res) => {
    const sql = 'SELECT * FROM monuments';
    const [results] = await connection.query(sql);

    res.json(results);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});