const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (senha, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(senha, salt, null, (erro, hash) => callback(hash))
        })
    }

    //req = request; res = resposta
    const getUsuarios = (req, res) => {
        app.db('usuario')
            .orderBy('id_usu')
            .then(usuarios => res.status(200).json(usuarios))
            .catch(erro => res.status(400).json(erro))
    }

    const getUsuario = (req, res) => {
        app.db('usuario')
            .where({ id_usu: 20})
            .then(usuario => res.status(200).json(usuario))
            .catch(erro => res.status(400).json(erro))
    }

    const cadastrarUsuario = (req, res) => {
        obterHash(req.body.senha_usu, hash => {
            const senhaCriptografada = hash

            app.db('usuario')
                .insert({ 
                    nome_usu: req.body.nome_usu,
                    email_usu: req.body.email_usu.toLowerCase(),
                    senha_usu: senhaCriptografada,
                    tipo_usu: req.body.tipo_usu,
                    telefone_usu: req.body.telefone_usu,
                    descricao_usu: req.body.descricao_usu,
                    nasc_usu: req.body.nasc_usu,
                    loc_usu: req.body.loc_usu
                })
                .then(_ => res.status(204).send())
                .catch(err => {
                    // Manda mensagem personalizada conforme o código do erro
                    switch(err.code){
                        case "23505":
                            return res.status(400).json("Email já cadastrado!")
                        default:
                            return res.status(400).json(err)
                    }})
        })
    }

    const alterarUsuario = (req, res) => {
        app.db('usuario')
            .where({ id_usu: req.params.id_usu})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const deletarUsuario = (req, res) => {
        app.db('usuario')
            .where({ id_usu: req.params.id_usu })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado usuario com id ${req.params.id_usu}.`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json(erro))
    }

    return { cadastrarUsuario, getUsuarios, getUsuario, deletarUsuario, alterarUsuario }
}