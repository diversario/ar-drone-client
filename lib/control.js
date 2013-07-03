var arDrone = require('ar-drone')
  , debug = require('debug')('ar-drone-client') // $> DEBUG=ar-drone-client node app.js
  , client = arDrone.createClient()
  , commands = {};


/**
 * Takeoff or land depending on the current state
 */
commands.switchPower = function () {
  debug('switchPower');
};


/**
 * Move up
 */
commands.up = function () {
  debug('up');
  client.up(0.1);
};


/**
 * Move down
 */
commands.down = function () {
  debug('down');
  client.down(0.1);
};


/**
 * Move forward
 */
commands.forward = function () {
  debug('forward');
  client.front(0.1);
};


/**
 * Move backwards
 */
commands.backward = function () {
  debug('backward');
  client.back(0.1);
};


/**
 * Rotate left/counterclockwise
 */
commands.left = function () {
  debug('left');
  client.counterClockwise(0.1);
};


/**
 * Rotate right/clockwise
 */
commands.right = function () {
  debug('right');
  client.clockwise(0.1);
};


module.exports = function (io) {
  io.sockets.on('connection', function (socket) {
    socket.on('command', function (cmd) {
      commands[cmd.command]();
    });
  });
};
