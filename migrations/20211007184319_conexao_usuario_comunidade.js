// knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('conexao_usuario_comunidade', table => {
        table.increments('id_comu', { primaryKey: false }).references('id_comu')
            .inTable('comunidade').notNull()
        table.increments('id_usu').references('id_usu')
            .inTable('usuario', { primaryKey: false }).notNull()
    })
};

// knex migrate:rollback
exports.down = function(knex) {
    return knex.schema.dropTable('conexao_usuario_comunidade')
};