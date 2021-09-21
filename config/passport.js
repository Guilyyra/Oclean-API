const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }
    
    const strategy = new Strategy(params, (payload, done) => {
        app.db('usuario')
            .where({ id_usu: payload.id_usu })
            .first()
            .then(user => {
                if (user) {
                    done(null, { id_usu: user.id_usu, email_usu: user.email_usu })
                } else {
                    done(null, false)
                }
            })
            .catch(erro => done(erro, false))
    })

    passport.use(strategy)

    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false }),
    }
}