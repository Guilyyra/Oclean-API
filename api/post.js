module.exports = app => {

    const getPosts = (req, res) => {
        app.db('post')
            .orderBy('id_post')
            .then(posts => res.status(200).json(posts))
            .catch(erro => res.status(400).json(erro))
    }

    const getPost = (req, res) => {
        app.db('post')
            .where({ id_sin: req.params.id_sin })
            .then(post => res.status(200).json(post))
            .catch(erro => res.status(400).json(erro))
    }

    const cadastrarPost = (req, res) => {
        app.db('post')
            .insert({ 
                titulo_post: req.body.titulo_post,
                descricao_post: req.body.descricao_post,
                foto_post: req.body.foto_post,
                data_post: req.body.data_post,
                id_post: req.body.cidade_post,
            })
            .then(post => res.status(204).json(post))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)})
    }

    const deletarPost = (req, res) => {
        app.db('post')
            .where({ id_post: req.params.id_post })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi encontrado post com id ${req.params.id_post}.`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json(erro))
    }

    return { getPost, getPosts, cadastrarPost, deletarPost }

}