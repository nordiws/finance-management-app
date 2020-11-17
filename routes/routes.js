import app from 'express';
import trxServices from '../services/transactionService.js';

const transactionRouter = app.Router();

transactionRouter.get('/', trxServices.getTrx);
transactionRouter.get('/:id', trxServices.getTrxById);
transactionRouter.post('/', trxServices.createTrx);
transactionRouter.put('/:id', trxServices.updateTrxById);
transactionRouter.delete('/:id', trxServices.deleteTrxById);

export { transactionRouter as routes };
