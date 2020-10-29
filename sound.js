const sound = require('sound-play')
const path = require('path')
const fs = require('fs');

function checkSound(audioName){
    const filePath = path.join(__dirname, 'music', (audioName + '.mp3'));

    return fs.existsSync(filePath) ? true : false;    
}

function playSound(audioName){
    const filePath = path.join(__dirname, 'music', (audioName + '.mp3'));

    if(fs.existsSync(filePath)){
        sound.play(filePath).then(res => {
        }).catch(err => {
            console.log(err);
        })
        return true;
    } else {
        return false;
    }
}

exports.playSound = playSound;
exports.checkSound = checkSound;