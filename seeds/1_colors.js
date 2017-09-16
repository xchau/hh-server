'use strict';

const colors = require('../utils/colors');

exports.seed = function(knex) {
  return knex('colors').del()
    .then(() => {
      return knex('colors').insert(colors);
    });
};
