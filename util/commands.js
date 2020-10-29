const User = require('../model/user');
const UserList = require('../model/userDao');
const SoundPlayer = require('./sound');

function userTimer(username, sound, cooldown){
    if(!SoundPlayer.checkSound(sound) && sound !== 'timeout'){
      return `${sound} não encontrado.`;
    }

    const fetchedUser = UserList.findUser(username);
    const userPlaySound = () => {
      const user = new User(username, cooldown);
      UserList.addUser(user);
      SoundPlayer.playSound(sound);
      user.startTimer();
  
      if(sound === 'timeout'){
        console.log(`- ${user.name} is on timeout for ${cooldown} seconds!`)
      } else {
        console.log(`- ${user.name} has put ${sound}.mp3 to play!`)
      }
    }
  
    if(fetchedUser){
      if(fetchedUser.timer <= 0 ){
        UserList.removeUser(username);
        userPlaySound();
        return null;
      } else {
        return `@${username} é preciso esperar ${fetchedUser.timer} ${fetchedUser.timer > 1 ? 'segundos' : 'segundo'} antes de mandar outro som.`;
      }
    } else {
      userPlaySound();
      return null;
    }
}

exports.userTimer = userTimer;
  
  