const tmi = require('tmi.js');

const userCmd = require('./util/commands');
const UserList = require('./model/userDao');

let COOLDOWN = require('./config.json').cooldown;
const USERNAME = require('./config.json').username;
const PASSWORD = require('./config.json').password;
const CHANNEL = require('./config.json').channel;

const opts = {
    connection: {
      reconnect: true,
      secure: true
  },
  identity: {
    username: USERNAME,
    password: PASSWORD
  },
  channels: [
    ...CHANNEL
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
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  console.log(`* Soundboard cooldown set to ${COOLDOWN}`);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandChat = msg.trim().split(' ');
  const commandParam = commandChat[1];
  const commandTru = commandChat[0];

  // USER
    switch (commandTru){
      case '!sb':
        let msg;
        if (commandParam){
          userCmd.userTimer(context.username, commandParam, COOLDOWN) ? msg = null : msg = `@${context.username} é preciso esperar ${UserList.findUser(context.username).timer} segundos antes de mandar outro som.`;
        } else {
        msg = `@${context.username}, para o comando funcionar você precisa digitar "!sb + nome-do-comando". Ex: "!sb aiquelindo" (sem aspas).`;
        }

        if (msg) client.say(target, msg);
        break;
    }

  // ADMIN
    if (context.username === CHANNEL){
      switch (commandTru){
              case `!admin:users`:  
              UserList.printUserList();
              break;
            case `!admin:reset`:
              if (commandParam){
                UserList.cleanUserList;
                console.log('- Cooldown has been reseted to everyone');
              }
              UserList.removeUser(commandParam.toLowerCase());
              console.log(`- Cooldown has been reseted to ${commandParam}`);
              break;
            case `!admin:cooldown`:
              if (Number(commandParam)){
                COOLDOWN = commandParam;
                UserList.cleanUserList;
                console.log(`- Cooldown has been set to ${commandParam}`);
              };
              break;
            case `!admin:timeout`:
              if(Number(commandChat[2])){
                UserList.removeUser(commandChat[1].toLowerCase());
                userCmd.userTimer(commandChat[1].toLowerCase(), 'timeout', (commandChat[2] * 60));
              } 
              break;
            case '!admin:help':
              console.log(`- ADMIN OPTIONS:
              !admin:users: PRINTS LIST OF USERS ON COOLDOWN
              !admin:reset +(OPTIONAL = user): REMOVES EVERY USER FROM COOLDOWN LIST, REMOVES MEMBER FROM TIMEOUT IF SPECIFIED
              !admin:cooldown + seconds: RECEIVES PARAMETER AS SECONDS AND CHANGES COOLDOWN TIMER
              !admin:timeout + minutes + user: RECEIVES PARAMETER AS MINUTES AND TIMES OUT USER
              !admin:helps: PRINTS THIS OPTIONS LIST`);
              break;
      }
    }
}