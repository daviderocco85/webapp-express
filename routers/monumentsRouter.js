import express from 'express';
import * as monumentsController from '../controllers/monumentsController.js';

export const monumentsRouter = express.Router();

// Index di tutti i monumenti
monumentsRouter.get('/', monumentsController.getAll);

// Show del monumento con specifico id
monumentsRouter.get('/:id', monumentsController.getById);

