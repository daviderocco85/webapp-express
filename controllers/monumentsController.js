import { connection } from '../config/db.js';

// Logica index di tutti i monumenti

export const getAll = async (req, res) => {
    const sql = 'SELECT * FROM monuments';
    const [results] = await connection.query(sql);

    res.json(results);
};

// Logica show di un id di uno specifico monumento con relativa recensione

export const getById = async (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json({ error: 'Id deve essere un numero intero' });
        return;
    }


    const sqlMonument = 'SELECT m.*, round(avg(r.vote)) average_vote FROM monuments m JOIN reviews r ON r.monument_id = m.id WHERE m.id = ?'
    const [[resultMonument]] = await connection.query(sqlMonument, [id]);

    if (resultMonument === undefined) {
        res.status(404).json({ error: 'Monumento non trovato' });
        return;
    }

    const sqlReviews = `
       SELECT id, reviewer_name, vote, text
       FROM reviews
       WHERE monument_id = ?
       `;

    const [resultReviews] = await connection.query(sqlReviews, [id]);
    resultMonument.reviews = resultReviews;


    res.json(resultMonument);
};
