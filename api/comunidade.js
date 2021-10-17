module.exports = app => {

    //req = request; res = resposta
    const getComunidades = (req, res) => {
        app.db('comunidade')
            .orderBy('id_comu')
            .then(comunidades => res.status(200).json(comunidades))
            .catch(erro => res.status(400).json(erro))
    }

    const getComunidade = (req, res) => {
        app.db('comunidade')
            .where({ nome_comu: req.params.nome_comu })
            .then(comunidade => res.status(200).json(comunidade))
            .catch(erro => res.status(400).json(erro))
    }

    const cadastrarComunidade = (req, res) => {
        app.db('comunidade')
            .insert({ 
                nome_comu: req.body.nome_comu,
                descricao_comu: req.body.descricao_comu,
                id_ong: req.body.id_ong
            })
            .then(comunidade => res.status(204).json(comunidade))
            .catch(err => {
                // Manda mensagem personalizada conforme o código do erro
                switch(err.code){
                    case "23505":
                        return res.status(400).json("Nome da comunidade já cadastrado!")
                    default:
                        return res.status(400).json(err)
                }
            })
    }

    const alterarComunidade = (req, res) => {
        app.db('comunidade')
            .where({ id_comu: req.params.id_comu})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const deletarComunidade = (req, res) => {
        app.db('comunidade')
            .where({ id_comu: req.params.id_comu })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado comunidade com id ${req.params.id_usu}.`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json(erro))
    }

    return { cadastrarComunidade, getComunidade, getComunidades, deletarComunidade, alterarComunidade }
}