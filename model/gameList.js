const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'games_list.txt');
let gameList = [];

class GameList {
    static addGame(game){
        gameList.push(game);
    }

    static saveList(){
        let text;
        Object.values(
                gameList.map(val => {
                const insertText = `@${val.getUsername()} recomendou: Nome = ${val.getGame()} - Console = ${val.getPlatform()}\n`;
                text = text ? text + insertText : insertText;
            })
        )

        fs.writeFile(filePath, text, err => err ? console.log(err) : null);
    }
}

module.exports = GameList;