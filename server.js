import { fastify } from 'fastify';
import { DatabaseMySQL } from './database-mysql.js';
import 'dotenv/config';

const { PORT } = process.env;

console.log('Variáveis de ambiente carregadas:', { PORT });

const server = fastify();

server.get('/', async (request, reply) => {
    return { message: 'API server - Loja de Jogos' };
});

const database = new DatabaseMySQL();

// Rota para criar um novo jogo
server.post('/jogos', async (request, reply) => {
    const { title, description, price, platform, genre } = request.body;
    await database.create({ title, description, price, platform, genre });
    return reply.status(201).send();
});

// Rota para listar jogos
server.get('/jogos', async (request) => {
    const search = request.query.search;
    const jogos = await database.list(search);
    return jogos;
});

// Rota para atualizar um jogo
server.put('/jogos/:id', async (request, reply) => {
    const jogoId = request.params.id;
    const { title, description, price, platform, genre } = request.body;
    await database.update(jogoId, { title, description, price, platform, genre });
    return reply.status(204).send();
});

// Rota para deletar um jogo
server.delete('/jogos/:id', async (request, reply) => {
    const jogoId = request.params.id;
    await database.delete(jogoId);
    return reply.status(204).send();
});

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});