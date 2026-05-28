import { randomUUID } from 'node:crypto';
import { sql } from './db.js';

export class DatabaseMySQL {

    // Listagem de jogos, com opção de busca por título
    async list(search) {
        let jogos;

        if (search) {
            [jogos] = await sql.execute(
                'SELECT * FROM jogos WHERE title LIKE ?',
                [`%${search}%`]
            );
        } else {
            [jogos] = await sql.execute('SELECT * FROM jogos');
        }

        return jogos;
    }

    // Criação de um novo jogo
    async create(jogo) {
        const jogoId = randomUUID();
        const { title, description, price, platform, genre } = jogo;

        await sql.execute(
            'INSERT INTO jogos (id, title, description, price, platform, genre) VALUES (?, ?, ?, ?, ?, ?)',
            [jogoId, title, description, price, platform, genre]
        );
    }

    // Atualização de um jogo específico
    async update(id, jogo) {
        const { title, description, price, platform, genre } = jogo;

        await sql.execute(
            'UPDATE jogos SET title = ?, description = ?, price = ?, platform = ?, genre = ? WHERE id = ?',
            [title, description, price, platform, genre, id]
        );
    }

    // Exclusão de um jogo específico
    async delete(id) {
        await sql.execute('DELETE FROM jogos WHERE id = ?', [id]);
    }
}