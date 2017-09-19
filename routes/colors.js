const router = require('express').Router();
const knex = require('../knex');

const convertHex = require('../utils/convertHex');

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

router.get('/search', (req, res, next) => {
  const color = '#' + req.query.color;

  knex('colors')
    .where('hex', 'ILIKE', `${color}%`)
    .then(colors => {
      res.send({
        count: colors.length,
        colors: colors
      });
    })
    .catch(err => {
      next(err);
    });
});

router.get('/family', (req, res, next) => {
  const fam = req.query.fam;

  knex('colors')
    .then(colors => {
      const matches = [];
      const rgbValues = colors.map(color => {
        return convertHex(color.hex);
      });

      for (let i = 0; i < colors.length; i++) {
        // define red
        if (fam === 'red' && rgbValues[i].r > 200 && rgbValues[i].g < 110 && rgbValues[i].b < 110) {
          matches.push(colors[i]);
        }

        // define green
        if (fam === 'green' && rgbValues[i].r < 150 && rgbValues[i].g > 200 && rgbValues[i].b < 150) {
          matches.push(colors[i]);
        }

        // define blue
        if (fam === 'blue' && rgbValues[i].r < 90 && rgbValues[i].g < 200 && rgbValues[i].b > 200) {
          matches.push(colors[i]);
        }

        // define purple
        if (fam === 'purple' && rgbValues[i].r > 120 && rgbValues[i].g < 40 && rgbValues[i].b > 120) {
          matches.push(colors[i]);
        }

        // define yellow
        if (fam === 'yellow' && rgbValues[i].r > 190 && rgbValues[i].g > 190 && rgbValues[i].b < 50) {
          matches.push(colors[i]);
        }

        // define orange
        if (fam === 'orange' && rgbValues[i].r > 200 && rgbValues[i].g > 150 &&  rgbValues[i].g < 200 && rgbValues[i].b < 20) {
          matches.push(colors[i]);
        }
      }

      res.send(matches);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
