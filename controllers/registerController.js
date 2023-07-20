const User = require('../model/User');
const bcrypt = require('bcrypt');



const handleNewUser = async (req,res) => {
    const {user, pwd} = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password are required'})
    // check for duplicate usernames in the database
    const duplicate = await User.findOne({username: user}).exec();
    if(duplicate) return res.sendStatus(409); //Conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd,10)

        //create and store the new User
        const result = await User.create({
            "username": user, 
            "password": hashedPwd
        });

            //Other Method to create user
            // const newUser = new User();
            // newUser.name = user, newUser.password = hashedPwd
            // const result = await newUser.save();
       
            console.log(result); 

        res.status(201).json({'sucess': `New user ${user} created!`});        
    } catch (err) {
        res.status(500).json({'message': err.message});
    }
}

module.exports = {handleNewUser};