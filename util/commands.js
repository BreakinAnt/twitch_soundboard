const User = require('../model/user');
const UserList = require('../model/userDao');
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

exports.playSong = playSong;
  
  