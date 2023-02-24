import fastify from 'fastify';
import { knex } from './database';
import crypto from 'node:crypto';
import { env } from './env';

const app = fastify();

app.post('/transaction', async () => {
  const transaction = await knex(
    'transactions',
  )
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*');

  return transaction;
});

app.get('/transaction', async () => {
  const transactions = await knex(
    'transactions',
  ).select('*');

  return transactions;
});

app.get(
  '/transaction/amount',
  async () => {
    const transactions = await knex(
      'transactions',
    )
      .where('amount', 1000)
      .select('*');

    return transactions;
  },
);

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log(
      'HTTP Server Running...',
    );
  });
