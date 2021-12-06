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

    // Conexao_usuario_comunidade parte do usuario

    app.route('/usuarios/:id_usu/comunidades')
        .get(app.api.conexao_usuario_comunidade.numeroComunidades)
    
    app.route('/usuarios/:id_usu/conexoes')
        .get(app.api.conexao_usuario_comunidade.conexoesUsuario)

    app.route('/usuarios/:id_usu/conexoes/comunidades')
        .get(app.api.conexao_usuario_comunidade.comunidadesIdUsuario)

    // Comunidades

    app.post('/comunidades/cadastrar', app.api.comunidade.cadastrarComunidade)

    app.route('/comunidades')
        .all(app.config.passport.authenticate())
        .get(app.api.comunidade.getComunidades)

    // EXCLUIR APOS REMOVER O comunidades/id/:id_comu
    app.route('/comunidades/:nome_comu')
        .all(app.config.passport.authenticate())
        .get(app.api.comunidade.getComunidade)

    // REMOVER DEPOIS E SUBSTITUIR PELO /comunidades/:id_comu
    app.route('/comunidades/id/:id_comu')
        .get(app.api.comunidade.getComunidadeById)

    app.route('/comunidades/:id_comu/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.comunidade.alterarComunidade)

    app.route('/comunidades/:id_comu/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.comunidade.deletarComunidade)

    // Conexao_usuario_comundade parte da comunidade

    app.route('/comunidades/entrar')
        .all(app.config.passport.authenticate())
        .post(app.api.conexao_usuario_comunidade.entrarComunidade)

    app.route('/comunidades/sair')
        .all(app.config.passport.authenticate())
        .delete(app.api.conexao_usuario_comunidade.sairComunidade)

    app.route('/comunidades/membros')
        .post(app.api.conexao_usuario_comunidade.getConexoes)

    app.route('/comunidades/membro/verificar')
        .all(app.config.passport.authenticate())
        .post(app.api.conexao_usuario_comunidade.verificarUsuario)

    app.route('/comunidades/:id_comu/membros')
        .get(app.api.conexao_usuario_comunidade.numeroMembros)

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
        res.status(200).json({ link: 'http://192.168.15.10:3000/img/' + req.file.filename });
    });

    // Sinalizações

    app.route('/sinalizacao')
        .all(app.config.passport.authenticate())
        .get(app.api.sinalizacao.getSinalizacoes)

    app.route('/sinalizacao/:id_sin')
        .all(app.config.passport.authenticate())
        .get(app.api.sinalizacao.getSinalizacao)
    
    app.route('/sinalizacao/cadastrar')
        .all(app.config.passport.authenticate())
        .post(app.api.sinalizacao.cadastrarSinalizacao)
    
    app.route('/sinalizacao/:id_sin/alterar')
        .all(app.config.passport.authenticate())
        .put(app.api.sinalizacao.alterarSinalizacao)
    
    app.route('/sinalizacao/:id_sin/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.sinalizacao.deletarSinalizacao)

    // Posts

    app.route('/post')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPosts)
    
    app.route('/post/:id_post')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPost)

    app.route('/post/postar')
        .all(app.config.passport.authenticate())
        .post(app.api.post.cadastrarPost)

    app.route('/post/:id_post/deletar')
        .all(app.config.passport.authenticate())
        .delete(app.api.post.deletarPost)

    app.route('/post/:id_usu/buscar')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPostsUsuario)
        
    app.route('/post/:id_usu/perfil')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPostsPerfil)
        
    app.route('/post/:id_comu/comunidade')
        .all(app.config.passport.authenticate())
        .get(app.api.post.getPostsComunidade)
}