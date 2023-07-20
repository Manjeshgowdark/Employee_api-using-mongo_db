const User = require('../model/User');


const handleLogout =  async(req,res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204)

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
        if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 100});
        return res.sendStatus(204);
        }
        

        // Delete the refresh token in the database
        foundUser.refreshToken = ''
        const result = await foundUser.save();
        console.log(result);
       res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 100}); //secure: true - only serves on https
       res.sendStatus(204)
    }

module.exports = {handleLogout}