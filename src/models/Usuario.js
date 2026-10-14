
class Usuario {
    constructor({ id = null, nome = "", email = "", telefone = "" } = {}) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

const usuarioConverter = {
    toFirestore(usuario) {
        return {
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
        };
    },

    fromFirestore(snapshot, options) {
        const dados = snapshot.data(options);

        return new Usuario({
            id: snapshot.id,
            nome: dados.nome,
            email: dados.email,
            telefone: dados.telefone,
        });
    },
};

export { Usuario, usuarioConverter };
