
exports.seed = function (knex, Promise) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        { VIN: 'Acura', make: 2000, model: 'MDX', mileage: 4000.00, transmission: 'clean' },
        { VIN: 'Audi', make: 2000, model: 'MDX', mileage: 4000.00 },
        { VIN: 'BMW', make: 2003, model: 'MDX', mileage: 4000.00 },
        { VIN: 'Ford', make: 2000, model: 'MDX', mileage: 4000.00 },
        { VIN: 'Fiat', make: 2006, model: 'MDX', mileage: 4000.00 }
      ]);
    });
};