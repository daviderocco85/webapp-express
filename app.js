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

// Show
app.get('/:id', async (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json({ error: 'Id deve essere un numero intero' });
        return;
    }

    const sqlMonument = 'SELECT * FROM monuments WHERE id = ?';
    const [[resultMonument]] = await connection.query(sqlMonument, [id]);

    if (resultMonument === undefined) {
        res.status(404).json({ error: 'Monumento non trovato' });
        return;
    }

    const sqlReviews = `
       SELECT reviewer_name, vote, text
       FROM reviews
       WHERE monument_id = ?
       `;

    const [resultReviews] = await connection.query(sqlReviews, [id]);
    resultMonument.reviews = resultReviews;


    res.json(resultMonument);
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

