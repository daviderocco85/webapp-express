import { connection } from '../config/db.js';

// Logica index di tutti i monumenti

export const getAll = async (req, res) => {

    const sql = ` 
          SELECT 
              m.*,
              ROUND(AVG(r.vote), 1) AS average_vote
          FROM monuments m
          JOIN reviews r ON r.monument_id = m.id
          GROUP BY m.id`;

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


    const sqlMonument = `
        SELECT 
            m.*, 
            ROUND(AVG(r.vote)) AS average_vote
        FROM monuments m
        LEFT JOIN reviews r ON r.monument_id = m.id
        WHERE m.id = ?
        GROUP BY m.id
    `;
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

// Store di una review di un monumento
export const create = async (req, res) => {
    const monumentId = Number(req.params.id);

    if (Number.isNaN(monumentId) || !Number.isInteger(monumentId)) {
        res.status(400).json({ error: 'Invalid param id' });
        return;
    }

    const { reviewer_name, vote, text } = req.body;

    if (!reviewer_name) {
        res.status(400).json({ error: 'Missing name' });
        return;
    }

    if (typeof reviewer_name !== 'string') {
        res.status(400).json({ error: 'Name must be string' });
        return;
    }

    if (vote == null) {
        res.status(400).json({ error: 'Missing vote' });
        return;
    }

    if (typeof vote !== 'number') {
        res.status(400).json({ error: 'Vote must be number' });
        return;
    }

    if (vote < 1 || vote > 5) {
        res.status(400).json({ error: 'Vote must be between 1 and 5' });
        return;
    }

    if (text && typeof text !== 'string') {
        res.status(400).json({ error: 'Text must be string' });
        return;
    }

    const sql = 'INSERT INTO reviews (monument_id, reviewer_name, vote, text) VALUES (?, ?, ?, ?)';

    let id;

    try {
        [{ insertId: id }] = await connection.query(sql, [monumentId, reviewer_name, vote, text]);
    }
    catch (err) {
        const msg = 'Inserting monument review failed';

        console.error(msg, err);
        res.status(500).json({ error: msg });

        return;
    }

    res.status(201).json({ id, monument_id: monumentId, reviewer_name, vote, text });
};
