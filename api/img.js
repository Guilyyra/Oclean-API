const path = require('path')

module.exports = app => {
    const enviarImagem = (req, res) => {
        res.sendFile(path.join(__dirname, '../img/' + req.params.imagem))
    }

    return { enviarImagem }
}
