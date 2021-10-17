const multer = require('multer')
const path = require('path')

module.exports = app => {
    // Usuarios
    app.post('/usuarios/cadastrar', app.api.usuario.cadastrarUsuario)
    app.post('/usuarios/login', app.api.auth.logar)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .get(app.api.usuario.getUsuarios)

    app.route('/usuarios/:id_usu')
        .get(app.api.usuario.getUsuario)

    app.route('/usuarios/:id_usu/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.usuario.alterarUsuario)

    app.route('/usuarios/:id_usu/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.usuario.deletarUsuario)

    // Comunidades

    app.post('/comunidades/cadastrar', app.api.comunidade.cadastrarComunidade)

    app.route('/comunidades')
        .all(app.config.passport.authenticate())
        .get(app.api.comunidade.getComunidades)

    app.route('/comunidades/:nome_comu')
        .all(app.config.passport.authenticate())
        .get(app.api.comunidade.getComunidade)

    app.route('/comunidades/:id_comu/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.comunidade.alterarComunidade)

    app.route('/comunidades/:id_comu/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.comunidade.deletarComunidade)

    // Imagens

    const storage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, 'img/');
        },
        filename(req, file, callback) {
          callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
        },
      });

    let upload = multer({ storage: storage });

    app.get('/img/:imagem', app.api.img.enviarImagem)
    
    app.post('/api/upload', upload.single("photo"),(req, res) => {
        // console.log(`Files received: ${req.file.length}`);
        console.log('file', req.file);
        console.log('body', req.body);
        res.status(200).json({ link: 'http://192.168.15.28:3000/img/' + req.file.filename });
    });
}