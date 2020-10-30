const tmi = require('tmi.js');

const userCmd = require('./util/commands');
const UserList = require('./model/userDao');
const cfg = require('./config.json');

let cooldown = cfg.cooldown;
const _USERNAME = cfg.username;
const _PASSWORD = cfg.password;
const _CHANNEL = cfg.channel;
const _DEBUG = cfg.debug;

const opts = {
  connection: {
    reconnect: true,
    secure: true
  },
  options: {
    debug: _DEBUG
  },
  identity: {
    username: _USERNAME,
    password: _PASSWORD
  },
  channels: [
    ..._CHANNEL
  ],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port){
  console.log(`* Connected to ${addr}:${port}`);
  console.log(`* Soundboard cooldown set to ${cooldown}`);
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self){
  if (self) { return; } // Ignore messages from the bot

  const commandFull = msg.trim().split(' ');
  const commandParam = commandFull[1];
  const commandFirst = commandFull[0];

  let newMsg;

  // USER
  switch (commandFirst) {
    case '!sb':
      newMsg = userCmd.playSong(context.username, commandParam, cooldown);;
      if (newMsg) client.say(target, newMsg);
      break;
    
    case '!recomendo':
      newMsg = userCmd.addGame(commandParam ? commandFull : null, context.username);
      if (newMsg) client.say(target, newMsg);
      break;
  }

  // ADMIN
  if (context.username === _CHANNEL || _DEBUG){
    switch (commandFirst) {
      case `!admin:users`:  
        UserList.printUserList();
        break;

      case `!admin:reset`:
        if (!commandParam) {
          UserList.cleanUserList();
          console.log('- cooldown has been reseted to everyone');
        } else {
          UserList.removeUser(commandParam.toLowerCase());
          console.log(`- cooldown has been reseted to ${commandParam}`);
        }
        break;

      case `!admin:cooldown`:
        if (Number(commandParam)) {
          cooldown = commandParam;
          UserList.cleanUserList;
          console.log(`- cooldown has been set to ${commandParam}`);
        };
        break;

      case `!admin:timeout`:
        if (Number(commandFull[2])) {
          UserList.removeUser(commandParam.toLowerCase());
          userCmd.playSong(commandParam.toLowerCase(), 'timeout', (commandFull[2] * 60));
        } 
        break;

      case '!admin:help':
        console.log(`- ADMIN OPTIONS:
        !admin:users: PRINTS LIST OF USERS ON cooldown
        !admin:reset +(OPTIONAL = user): REMOVES EVERY USER FROM cooldown LIST, REMOVES MEMBER FROM TIMEOUT IF SPECIFIED
        !admin:cooldown + seconds: RECEIVES PARAMETER AS SECONDS AND CHANGES cooldown TIMER
        !admin:timeout + minutes + user: RECEIVES PARAMETER AS MINUTES AND TIMES OUT USER
        !admin:helps: PRINTS THIS OPTIONS LIST`);
        break;
    }
  }
}