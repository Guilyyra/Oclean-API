const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const logar = async (req, res) => {
        if (!req.body.email_usu || !req.body.senha_usu) {
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('usuario')
            .whereRaw("LOWER(email_usu) = LOWER(?)", req.body.email_usu)
            .first()
    
        if (user) {
            bcrypt.compare(req.body.senha_usu, user.senha_usu, (erro, isMatch) => {
                if (erro || !isMatch) {
                    return res.status(401).send('A senha informada é inválida!')
                }

                const payload = {
                    id_usu: user.id_usu,
                    name_usu: user.name_usu,
                    email_usu: user.email_usu
                }

                res.status(200).json({
                    name_usu: user.name_usu,
                    email_usu: user.email_usu,
                    token: jwt.encode(payload, authSecret),
                })
            })
        } else {
            res.status(400).send('Email errado ou usuário não cadastrado!')
        }
    }

    return { logar }
}