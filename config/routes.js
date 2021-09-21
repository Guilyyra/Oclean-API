module.exports = app => {
    app.post('/usuarios/cadastrar', app.api.usuario.cadastrarUsuario)
    app.post('/usuarios/login', app.api.auth.logar)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .get(app.api.usuario.getUsuarios)

    app.route('/usuarios/:id_usu/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.usuario.alterarUsuario)

    app.route('/usuarios/:id_usu/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.usuario.deletarUsuario)
}