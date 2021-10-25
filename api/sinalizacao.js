module.exports = app => {

    const getSinalizacoes = (req, res) => {
        app.db('sinalizacao')
            .orderBy('id_sin')
            .then(sinalizacoes => res.status(200).json(sinalizacoes))
            .catch(erro => res.status(400).json(erro))
    }

    const getSinalizacao = (req, res) => {
        app.db('sinalizacao')
            .where({ id_sin: req.params.id_sin })
            .then(sinalizacao=> res.status(200).json(sinalizacao))
            .catch(erro => res.status(400).json(erro))
    }

    const cadastrarSinalizacao = (req, res) => {
        console.log(req.body.latitude_sin)
        app.db('sinalizacao')
            .insert({ 
                latitude_sin: req.body.latitude_sin,
                longitude_sin: req.body.longitude_sin,
                data_sin: req.body.data_sin,
                praia_sin: req.body.praia_sin,
                cidade_sin: req.body.cidade_sin,
                ref_sin: req.body.ref_sin,
                status_sin: req.body.status_sin,
                foto_sin: req.body.foto_sin,
                id_usu_dono: req.body.id_usu_dono,
                id_usu_limpo: req.body.id_usu_limpo
            })
            .then(sinalizacao => res.status(204).json(sinalizacao))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)})
    }

    const alterarSinalizacao = (req, res) => {
        app.db('sinalizacao')
            .where({ id_sin: req.params.id_sin})
            .update(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    return { getSinalizacoes, getSinalizacao, cadastrarSinalizacao, alterarSinalizacao }
}