class User{
    constructor(name, timer){
        this.name = name;
        this.timer = timer;
    }

    printName(){
        console.log(this.name);
    }

    startTimer(){ 
        const loop = setInterval(() => countdown(), 1000);

        const countdown = () => {
            if(this.timer > 0){
                this.timer-=1;
            } else {
                clearInterval(loop);
                console.log(`- ${this.name} cooldown is over`)
            }
        }
    }

}

module.exports = User;