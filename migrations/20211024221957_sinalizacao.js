// knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('sinalizacao', table => {
        table.increments('id_sin').primary()
        table.string('latitude_sin').notNull()
        table.string('longitude_sin').notNull()
        table.datetime('data_sin').notNull()
        table.string('praia_sin').notNull()
        table.string('cidade_sin').notNull()
        table.string('ref_sin').notNull()
        table.string('status_sin').notNull()
        table.string('foto_sin').notNull()
        table.integer('id_usu_dono').references('id_usu')
            .inTable('usuario').notNull()
        table.integer('id_usu_limpo').references('id_usu')
            .inTable('usuario')
    })
};

// knex migrate:rollback
exports.down = function(knex) {
    return knex.schema.dropTable('sinalizacao')
};