const colors = [];

const createColor = () => {
  let color = '';

  while (color.length < 7) {
    color = '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  return color;
}

for (let i = 0; i < 200; i++) {
  colors.push({
    id: i + 1,
    hex: createColor()
  });
}

module.exports = colors;
