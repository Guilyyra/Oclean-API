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

    app.route('/comunidades/:id_comu')
        .all(app.config.passport.authenticate())
        .get(app.api.comunidade.getComunidade)

    app.route('/comunidades/:id_comu/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.comunidade.alterarComunidade)

    app.route('/comunidades/:id_comu/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.comunidade.deletarComunidade)
}