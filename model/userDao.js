let userList = [];

class UserDao{
    static addUser(user){
        userList.push(user);
    }

    static getUserList(){
        return userList;
    }

    static findUser(userName){
        return userList.find(val => {
            const fetched = Object.values(val);
            if(userName == fetched[0]){
                return fetched;
            }
        });
    }

    static removeUser(userName){
        const fetchedIndex = userList.findIndex(val => {
            const fetched = Object.values(val);
            if(userName == fetched[0]){
                return fetched;
            }
        });

        userList.splice(fetchedIndex, 1);
    }

    static cleanUserList(){
        userList = [];
    }
}

module.exports = UserDao;