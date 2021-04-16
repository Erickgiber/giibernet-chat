const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

require('./socket')(io);

app.set('port', process.env.PORT || 3000);


// static files
app.use(express.static(path.join(__dirname, "public")));

// startin the server
server.listen(3000, () => {
  console.log("server on port", app.get('port'));
});