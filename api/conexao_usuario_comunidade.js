module.exports = app => {

    // Retorna todas as conexoes
    const getConexoes = (req, res) => {
        app.db('conexao_usuario_comunidade')
            .orderBy('id_con')
            .then(conexoes => res.status(200).json(conexoes))
            .catch(erro => res.status(400).json(erro))
    }

    // Cria uma nova conexão
    const entrarComunidade = (req, res) => {
        app.db('conexao_usuario_comunidade')
            .insert({ 
                id_usu: req.body.id_usu,
                id_comu: req.body.id_comu,
            })
            .then(conexao => res.status(204).json(conexao))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)})
    }

    // Deleta uma nova conexão
    const sairComunidade = (req,res) => {
        app.db('conexao_usuario_comunidade')
            .where({ id_usu: req.body.id_usu, id_comu: req.body.id_comu })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Não foi possível sair da comunidade`
                    res.status(400).send(msg)
                }
            })
            .catch(erro => res.status(400).json("AA" + erro))
    }

    // Checa se um usuário está em uma comunidade
    // Retorna a conexão achada no bd
    const verificarUsuario = (req, res) => {
        app.db('conexao_usuario_comunidade')
            .where({ id_usu: req.body.id_usu, id_comu: req.body.id_comu })
            .then(conexao =>res.status(200).json(conexao))
            .catch(erro => res.status(400).json(erro))
    }

    // Retorna a qnt de conexoes que possuem determinado id_comu
    const numeroMembros = (req,res) => {
        app.db('conexao_usuario_comunidade')
            .where({ id_comu: req.params.id_comu })
            .then(conexoes => res.status(200).json(conexoes.length))
            .catch(erro => res.status(400).json(erro))
    }

    // Retonra a qnt de conexoes que possuem determinado id_usu
    const numeroComunidades = (req,res) => {
        app.db('conexao_usuario_comunidade')
            .where({ id_usu: req.params.id_usu })
            .then(conexoes => res.status(200).json(conexoes.length))
            .catch(erro => res.status(400).json(erro))
    }

    // Retorna as conexoes que possuem determinado id_usu
    const conexoesUsuario = (req,res) => {
        app.db('conexao_usuario_comunidade')
            .where({ id_usu: req.params.id_usu })
            .then(conexoes => res.status(200).json(conexoes))
            .catch(erro => res.status(400).json(erro))
    }

    const comunidadesIdUsuario = (req,res) =>{
        app.db('conexao_usuario_comunidade')
            .where({ id_usu: req.params.id_usu })
            .then(conexoes => {
                const ids = new Array()
                for( var conexao in conexoes){
                    const id = conexoes[conexao].id_comu
                    ids.push(id)
                }
                res.status(200).json(ids)
            })

    }

    return { comunidadesIdUsuario, getConexoes, entrarComunidade, sairComunidade, verificarUsuario, numeroMembros, numeroComunidades, conexoesUsuario }

}