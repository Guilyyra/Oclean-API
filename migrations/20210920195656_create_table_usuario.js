exports.up = function(knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id_usu').primary()
        table.string('nome_usu').notNull()
        table.string('email_usu').notNull().unique()
        table.string('senha_usu').notNull()
        table.string('descricao_usu')
        table.string('loc_usu')
        table.datetime('nasc_usu')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuario')
};
