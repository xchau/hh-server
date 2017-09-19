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

router.get('/colors/count', (req, res, next) => {
  knex('colors')
    .count('id')
    .first()
    .then(num => {
      num.count = Number.parseInt(num.count);
      res.send(num);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/colors/:start/:limit', (req, res, next) => {
  const start = req.params.start;
  const limit = req.params.limit;

  knex('colors')
    .offset(start)
    .limit(limit)
    .then(colors => {
      res.send(colors);
    })
    .catch(err => {
      next(err);
    });
});

router.get('/color/:id', (req, res, next) => {
  const id = req.params.id;

  knex('colors')
    .where('id', id)
    .first()
    .then(color => {
      res.send(color);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
