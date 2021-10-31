// knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('post', table => {
        table.increments('id_post').primary()
        table.string('titulo_post').notNull()
        table.string('descricao_post')
        table.string('foto_post')
        table.datetime('data_post').notNull()
        table.integer('id_usu').references('id_usu')
            .inTable('usuario').notNull()
    })
};

// knex migrate:rollback
exports.down = function(knex) {
    return knex.schema.dropTable('post')
};