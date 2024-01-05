const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});
  
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
