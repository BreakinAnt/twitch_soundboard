let _userList = [];

class UserDao {
    static addUser(user){
        _userList.push(user);
    }

    static getUserList(){
        return _userList;
    }

    static printUserList(){
        console.log('- _Userlist: {');
        _userList.forEach((val) => {
            if(val)
            console.log(val);
        })
        console.log('} -');
    }

    static findUser(userName){
        return _userList.find(val => {
                const fetched = Object.values(val);
                if(userName == fetched[0]){
                    return val;
                }
            }
        );
    }

    static removeUser(userName){
        const fetchedIndex = _userList.findIndex(val => {
                const fetched = Object.values(val);
                if(userName == fetched[0]){
                    return fetched;
                }
            }
        );

        _userList.splice(fetchedIndex, 1);
    }

    static cleanUserList(){
        _userList = [];
    }
}

module.exports = UserDao;