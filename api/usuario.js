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
            .then(usuarios => res.json(usuarios))
            .catch(erro => res.status(400).json(erro))
    }

    const cadastrarUsuario = (req, res) => {
        console.log(req.body)
        obterHash(req.body.senha_usu, hash => {
            const password = hash

            app.db('usuario')
                .insert({ 
                    nome_usu: req.body.nome_usu,
                    email_usu: req.body.email_usu.toLowerCase(),
                    senha_usu: password,
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    const alterarUsuario = (req, res) => {
        const alteracao = req.params.alteracao
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
                    const msg = `Não foi encontrada task com id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json(erro))
    }

    return { cadastrarUsuario, getUsuarios, deletarUsuario, alterarUsuario }
}