const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

// Configuração do Banco de Dados
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'sua_senha',
    database: 'seu_banco'
};

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);
        
        // 1. Buscar o usuário pelo e-mail
        const [rows] = await connection.execute(
            'SELECT * FROM usuarios WHERE email = ?', 
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: "E-mail ou senha inválidos" });
        }

        const user = rows[0];

        // 2. Comparar a senha enviada com o Hash do banco
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({ error: "E-mail ou senha inválidos" });
        }

        // 3. Gerar Token de Acesso (JWT)
        const token = jwt.sign(
            { id: user.id, email: user.email },
            'SEGREDO_SUPER_SEGURO', // Use uma variável de ambiente (.env)
            { expiresIn: '1h' }
        );
        res.json({ 
            message: "Login realizado com sucesso!",
            token: token 
        });

    } catch (err) {
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

