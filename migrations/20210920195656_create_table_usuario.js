// knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id_usu').primary()
        table.string('nome_usu').notNull()
        table.string('email_usu').notNull().unique()
        table.string('senha_usu').notNull()
        table.string('tipo_usu').notNull()
        table.string('telefone_usu')
        table.string('descricao_usu')
        table.string('loc_usu')
        table.datetime('nasc_usu')
    })
};

// knex migrate:rollback
exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
