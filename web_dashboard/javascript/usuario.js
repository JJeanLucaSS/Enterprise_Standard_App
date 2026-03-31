class Usuario {
    #email;
    #passwordHash;

    constructor(email, passwordHash) {
        this.#email = email;
        this.#passwordHash = passwordHash;
    }

    // Método Público (Getter) para o e-mail
    get email() {
        return this.#email;
    }

    // O Hash da senha não tem um "get", ele só pode ser validado internamente
    async validarSenha(senhaInformada) {
        const bcrypt = require('bcrypt');
        // O encapsulamento aqui protege o processo de comparação
        return await bcrypt.compare(senhaInformada, this.#passwordHash);
    }
}