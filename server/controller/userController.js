 const UserService = require("../services/userService")

const createUser = async(req,res,next) =>{
    try{

    const {user,token} = await UserService.userRegister;

    return res

    }catch(err){
        return res.status(401).json({
            status:401,
            messgae:err.messgae
        })
    }
}