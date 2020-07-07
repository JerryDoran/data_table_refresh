const express = require('express');
const chance = require('chance').Chance();
const shuffleArray = require('shuffle-array');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const data = {
  headers: ['Name', 'Age', 'Profession', 'Country'],
  rows: new Array(10).fill(undefined).map(() => {
    return [
      chance.name(),
      chance.age(),
      chance.profession(),
      chance.country({ full: true })
    ];
  })
};

app.use(express.urlencoded({ extended: false }));



app.get('/data', (req, res) => {
  res.json({
    headers: data.headers,
    rows: shuffleArray(data.rows),
    lastUpdated: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
