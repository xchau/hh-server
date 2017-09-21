const router = require('express').Router();
const knex = require('../knex');

const convertHex = require('../utils/convertHex');

router.get('/colors', (req, res, next) => {
  const limit = Number.parseInt(req.query.limit);
  const start = limit * (Number.parseInt(req.query.page) - 1);
  const family = req.query.family;
  const data = {};

  if (!family) {
    knex('colors')
      .then(allColors => {
        data.count = allColors.length;

        return knex('colors')
          .offset(start)
          .limit(limit);
      })
      .then(colors => {
        data.colors = colors;
        res.send(data);
      })
      .catch(err => {
        next(err);
      });
  }
  else {
    knex('colors')
      .then(colors => {
        const matches = [];
        const rgbValues = colors.map(color => {
          return convertHex(color.hex);
        });

        for (let i = 0; i < colors.length; i++) {
          // define red
          if (family === 'red' && rgbValues[i].r > 200 && rgbValues[i].g < 95 && rgbValues[i].b < 95) {
            matches.push(colors[i]);
          }

          // define green
          if (family === 'green' && rgbValues[i].r < 150 && rgbValues[i].g > 200 && rgbValues[i].b < 150) {
            matches.push(colors[i]);
          }

          // define blue
          if (family === 'blue' && rgbValues[i].r < 90 && rgbValues[i].g < 200 && rgbValues[i].b > 200) {
            matches.push(colors[i]);
          }

          // define purple
          if (family === 'purple' && rgbValues[i].r > 120 && rgbValues[i].g < 40 && rgbValues[i].b > 120) {
            matches.push(colors[i]);
          }

          // define yellow
          if (family === 'yellow' && rgbValues[i].r > 190 && rgbValues[i].g > 190 && rgbValues[i].b < 50) {
            matches.push(colors[i]);
          }

          // define orange
          if (family === 'orange' && rgbValues[i].r > 200 && rgbValues[i].g > 150 &&  rgbValues[i].g < 200 && rgbValues[i].b < 20) {
            matches.push(colors[i]);
          }

          // define brown
          if (family === 'brown' && rgbValues[i].r > 120 && rgbValues[i].r < 200 && rgbValues[i].g > 65 && rgbValues[i].g < 115 && rgbValues[i].b < 70) {
            matches.push(colors[i]);
          }

          // define gray
          if (family === 'gray' && rgbValues[i].r <= rgbValues[i].g  + 15 && rgbValues[i].r >= rgbValues[i].g  - 15 && rgbValues[i].b <= rgbValues[i].r + 15 && rgbValues[i].b >= rgbValues[i].r - 15) {
            matches.push(colors[i]);
          }
        }

        res.send({
          colors: matches,
          count: matches.length
        });
      })
      .catch(err => {
        next(err);
      });
  }
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

  console.log(req.query.color, color);

  knex('colors')
    .where('hex', 'ILIKE', `${color}%`)
    .then(colors => {
      console.log('checking..');
      res.send({
        count: colors.length,
        colors: colors
      });
    })
    .catch(err => {
      console.log('errorriringggg');
      next(err);
    });
});


module.exports = router;
