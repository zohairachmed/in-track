const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/dist/index.html'));
// });

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'index.html');
    res.sendFile(index);
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));