import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all(); // pega todos os repositorios
    const balance = transactionsRepository.getBalance(); // pega os balancos
    return response.json({ transactions, balance }); // retorna como resposta
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body; // pega as informações da requisição

    const createTransaciton = new CreateTransactionService( // cria as regras de negócio
      transactionsRepository,
    );

    const transaction = createTransaciton.execute({ title, value, type }); // manda para verificações e criar o repositorio

    return response.json(transaction); // retorna a trasaction criada
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
