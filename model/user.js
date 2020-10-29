class User {
    constructor(name, timer){
        this._name = name;
        this._timer = timer;
    }

    printName(){
        console.log(this.name);
    }

    startTimer(){ 
        const loop = setInterval(() => countdown(), 1000);

        const countdown = () => {
            if (this._timer > 0) {
                this._timer-=1;
            } else {
                clearInterval(loop);
                console.log(`- ${this._name} cooldown is over`)
            }
        }
    }

    getName(){
        return this._name;
    }

    getTimer(){
        return this._timer;
    }

}

module.exports = User;