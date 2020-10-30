const User = require('../model/user');
const UserList = require('../model/userDao');
const Game = require('../model/game');
const GameList = require('../model/gameList');
const SoundPlayer = require('./sound');

function playSong(username, sound, cooldown){
  //validation
  if (!sound) {
    return `@${username}, para o comando funcionar você precisa digitar "!sb + nome-do-comando". Ex: "!sb aiquelindo" (sem aspas).`;
  }
  if (!SoundPlayer.checkSound(sound) && sound !== 'timeout'){
    return `${sound} não encontrado.`;
  }
  //

  const fetchedUser = UserList.findUser(username);

  // Plays sound chose by the user
  const userPlaySound = () => {
    const user = new User(username, cooldown);
    UserList.addUser(user);
    SoundPlayer.playSound(sound);
    user.startTimer();

    if (sound === 'timeout') {
      console.log(`- ${user.getName()} is on timeout for ${cooldown} seconds!`);
    } else {
      console.log(`- ${user.getName()} has put ${sound}.mp3 to play!`);
    }
  }

  if (fetchedUser) {
    if (fetchedUser.getTimer() <= 0 ){
      UserList.removeUser(username);
      userPlaySound();
      return null;
    } 
    return `@${username} é preciso esperar ${fetchedUser.getTimer()} ${fetchedUser.getTimer() > 1 ? 'segundos' : 'segundo'} antes de mandar outro som.`;
  } else {
    userPlaySound();
    return null;
  }
}

function addGame(game, username){
  if(!game){
    return msg = `Comando: !recomendo "nome do jogo" - "console do jogo"`
  }

  let fetchedGameString = "";
  let fetchedGameArray;
  
  game.forEach((val, index) => {
    if (index > 0){
      fetchedGameString += val + ' ';
    }
  });

  fetchedGameArray = fetchedGameString.split('-');

  const fetchedGame = fetchedGameArray[0];
  const fetchedPlatform = fetchedGameArray[1];

  if (!fetchedGame){
    return msg = `@${username}, você esquece de colocar o nome do jogo!`;
  } else if(!fetchedPlatform){
    return msg = `@${username}, você precisa colocar o console do jogo também!`;
  }
  
  const newGame = new Game(fetchedGame, fetchedPlatform, username);
  GameList.addGame(newGame);
  GameList.saveList();

  return msg = `Valeu pela recomendação @${username}!`;
}

exports.addGame = addGame;
exports.playSong = playSong;
  
  