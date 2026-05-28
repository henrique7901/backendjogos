import { sql } from './db.js';

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS jogos (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        price DECIMAL(10, 2),
        platform VARCHAR(255),
        genre VARCHAR(255)
    )
`;

sql.query(createTableQuery)
    .then(() => {
        console.log("Tabela 'jogos' criada ou já existente com sucesso no MySQL!");
    })
    .catch((err) => {
        console.error("Erro ao criar a tabela no MySQL:");
        console.error(err.message);
    });