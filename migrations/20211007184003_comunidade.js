// knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('comunidade', table => {
        table.increments('id_comu').primary()
        table.string('nome_comu').notNull().unique()
        table.string('descricao_comu').notNull()
        table.integer('id_ong').references('id_usu')
            .inTable('usuario').notNull()
    })
};

// knex migrate:rollback
exports.down = function(knex) {
    return knex.schema.dropTable('comunidade')
};
