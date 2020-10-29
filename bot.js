const tmi = require('tmi.js');
const User = require('./model/user');
const UserList = require('./model/userDao');
const SoundPlayer = require('./sound');

const COOLDOWN = require('./config.json').cooldown;
const USERNAME = require('./config.json').username;
const PASSWORD = require('./config.json').password;
const CHANNELS = require('./config.json').channels;

const opts = {
    connection: {
      reconnect: true,
      secure: true
  },
  options: {
    debug: true
  },
  identity: {
    username: USERNAME,
    password: PASSWORD
  },
  channels: [
    ...CHANNELS
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

  // If the command is known, let's execute it
    switch(commandTru){
      case '!sb':
        userTimer(context.username, commandParam);
        break;
      case '!ping':
        console.log(target)
        client.say(target, "pong");
        break;
    }
}

// Functions
function userTimer(username, sound){
  if(!SoundPlayer.checkSound(sound)){
    return false;
  }

  const doesUserExist = UserList.findUser(username);

  const userPlaySound = () => {
    const user = new User(username, COOLDOWN);
    UserList.addUser(user);
    SoundPlayer.playSound(sound);
    user.startTimer();

    console.log(`${user.name} has put ${sound}.mp3 to play!`)
  }

  if(doesUserExist){
    if(doesUserExist.timer <= 0 ){
      UserList.removeUser(username);
      userPlaySound();
      return true;
    }
  } else {
    userPlaySound();
    return true;
  }

  return false;
}

