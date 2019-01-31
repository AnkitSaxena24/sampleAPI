const userModel = require(__dirname + '/../model/userModel');

exports.getUser = async(req, res) => {
    try {
        let get_users = await userModel.getUserData(req.query);
        res.json(get_users);
    } catch(ex) {
        res.json({
            success: 0,
            status: 500,
            message: 'Something went wrong in controller'
        });
    }
}