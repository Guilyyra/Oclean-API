const path = require('path')

module.exports = app => {

    const buscar = (req, res) => {
        try{
            const resultados = []

            app.db('comunidade')
                .whereRaw('LOWER(nome_comu) LIKE LOWER(?)', [`%${req.body.termo}%`])
                .then(comunidades => {
                        app.db('post')
                        .whereRaw('LOWER(titulo_post) LIKE LOWER(?)', [`%${req.body.termo}%`])
                        .then(posts => res.status(200).json([comunidades,posts]))})
        } catch(e) {
            res.status(400).json(e)
        }
    }

    return { buscar }
}
