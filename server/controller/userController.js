const UserService = require("../services/userService");

const createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    const { user, token } = await UserService.userRegister({
      fullName,
      email,
      password,
      confirmPassword,
    });

    return res.status(201).json({
      status: 201,
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message || "An error occurred while creating the user.",
    });
  }
};


const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await UserService.userLogin({
 
      email,
      password,
    });

    return res.status(201).json({
      status: 200,
      message: "User login successfully",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: err.message || "An error occurred while creating the user.",
    });
  }
};

module.exports = {
  createUser,
  userLogin
};