const userModel = require(__dirname + '/../model/userModel');


var getUser = async(req, res) => {
    try {
        let get_users = await userModel.getUserData(req.query);
        res.json(get_users);
    } catch(ex) {
        res.json({
            success: 0,
            status: 500,
            message: 'Something went wrong in get user controller'
        });
    }
}

var addUser = async(req, res) => {
    try {
        let result = await userModel.addUserData(req.body.data);
        res.json({
            success: 1,
            status: 200,
            message: 'User added successfully!'
        });
    } catch(ex) {
        res.json({
            success: 0,
            status: 500,
            message: 'Something went wrong in add user controller'
        });
    }
}

var getSingleUser = async(req, res) => {
    try {
        let result = await userModel.getSingleUserData(req.params.id);

        if(result) {
            res.json(result);
        }
    } catch(ex) {
        res.json({
            success: 0,
            message: 'Something went wrong in fetching user data'
        })
    }
}

var updateUser = async(req, res) => {
    try {
        let result = await userModel.updateUserData(req.body);

        if(result) {
            res.json(result)
        }
    } catch(ex) {
        res.json({
            success: 0,
            message: 'Something went wrong in updating user data'
        })
    }
}

var deleteUser = async(req, res) => {
    try {
        let result = await userModel.deleteUserData(req.body);
        
        if(result) {
            return res.json(result)
        }
    } catch(ex) {
        res.json({
            success: 0,
            message: 'Something went wrong in deleting user data'
        })
    }
}

module.exports = {
    getUser,
    addUser,
    getSingleUser,
    updateUser,
    deleteUser
}

