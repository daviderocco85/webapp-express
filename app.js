import express from 'express';
import { env } from './config/env.js';
import { monumentsRouter } from './routers/monumentsRouter.js';

const app = express();
const port = env.SERVE_PORT;

app.use(express.static('public'));


app.use('/monuments', monumentsRouter);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

