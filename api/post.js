module.exports = app => {

    const getPosts = (req, res) => {
        app.db('post')
            .orderBy('id_post')
            .then(posts => res.status(200).json(posts))
            .catch(erro => res.status(400).json(erro))
    }

    const getPost = (req, res) => {
        app.db('post')
            .where({ id_post: req.params.id_post })
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
                id_usu: req.body.id_usu,
                id_comu: req.body.id_comu,
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

    const getPostsUsuario = (req, res) => {
        app.db('conexao_usuario_comunidade')
        .where({ id_usu: req.params.id_usu })
        .then(conexoes => {
            var ids = new Array()
            for( var conexao in conexoes){
                
                const id = conexoes[conexao].id_comu
                ids.push(id)
            }

            const db = app.db('post')
                // .whereIn('id_comu', ids)
                .join('comunidade', 'post.id_comu', '=', 'comunidade.id_comu')
                .join('usuario', 'post.id_usu', '=', 'usuario.id_usu' )
                .whereIn('post.id_comu', ids)
                .orderBy('data_post', 'desc')
                .then(post => res.status(200).json(post))
        })
    }

    const getPostsPerfil = (req, res) => {
        const id = req.params.id_usu
        app.db('post')
            .join('comunidade', 'post.id_comu', '=', 'comunidade.id_comu')
            .join('usuario', 'post.id_usu', '=', 'usuario.id_usu' )
            .where({'post.id_usu': id})
            .orderBy('data_post', 'desc')
            .then(post => res.status(200).json(post))
    }

    const getPostsComunidade = (req, res) => {
        app.db('post')
            .join('comunidade', 'post.id_comu', '=', 'comunidade.id_comu')
            .join('usuario', 'post.id_usu', '=', 'usuario.id_usu' )
            .where({'post.id_comu' : req.params.id_comu})
            .orderBy('data_post', 'desc')
            .then(post => res.status(200).json(post))
    }
    return { getPostsUsuario, getPost, getPosts, cadastrarPost, deletarPost, getPostsPerfil, getPostsComunidade }

}