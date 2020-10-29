const User = require('../model/user');
const UserList = require('../model/userDao');
const SoundPlayer = require('../sound');

function userTimer(username, sound, cooldown){
    if(!SoundPlayer.checkSound(sound) && sound !== 'timeout'){
      return false;
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
        return true;
      }
    } else {
      userPlaySound();
      return true;
    }
}

exports.userTimer = userTimer;
  
  