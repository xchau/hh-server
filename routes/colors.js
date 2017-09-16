const router = require('express').Router();
const knex = require('../knex');

router.get('/colors', (req, res, next) => {
  knex('colors')
    .orderBy('id', 'ASC')
    .then(colors => {
      res.send(colors);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
