
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN').notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.string('mileage').notNullable();
        tbl.string('transmission');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cars');
};