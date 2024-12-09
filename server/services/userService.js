const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userRegister = async (payload) => {
  try {
    const { fullName, email, password, confirmPassword } = payload;

    if (password !== confirmPassword) {
      throw new Error("Password and confirm password do not match!");
    }

    const user = await User.create({
      fullName,
      email,
      password, 
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.UserService = {
  userRegister,
};
