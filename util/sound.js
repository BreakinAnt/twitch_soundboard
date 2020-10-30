const sound = require('sound-play');
const path = require('path');
const fs = require('fs');

function checkSound(audioName){
    const filePath = path.join(__dirname, '..', 'music', (audioName + '.mp3'));

    return fs.existsSync(filePath) ? true : false;    
}

function playSound(audioName){
    const filePath = path.join(__dirname, '..', 'music', (audioName + '.mp3'));
    
    sound.play(filePath).then(res => {
        return true;
    }).catch(err => {
        return false;
    })
}

exports.playSound = playSound;
exports.checkSound = checkSound;