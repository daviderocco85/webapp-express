import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { monumentsRouter } from './routers/monumentsRouter.js';
import { notFound } from './middlewares/notFound.js';
import { errorsHandler } from './middlewares/errorsHandler.js';

const app = express();
const port = env.SERVE_PORT;

app.use(cors({
    origin: env.FE_ORIGIN
}));

app.use(express.static('public'));

app.use(express.json());

app.use('/monuments', monumentsRouter);

app.use(notFound);

app.use(errorsHandler);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

