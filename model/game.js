class Game {
    constructor(game, platform, username){
        this._game = game;
        this._platform = platform;
        this._username = username;
    }

    getGame(){
        return this._game;
    }

    getPlatform(){
        return this._platform;
    }

    getUsername(){
        return this._username;
    }
}

module.exports = Game;