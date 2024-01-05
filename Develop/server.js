const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (_, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(newNote);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});