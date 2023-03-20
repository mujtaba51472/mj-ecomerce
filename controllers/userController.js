const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utilis/jwtToken");
exports.userRegister = async (req, res, next) => {
  console.log("req", req.body);
  try {
    let { name, email, password } = req.body;

    //  missing fields
    if (!name || !email || !password) {
      res.status(404).json({
        status: "failed",
        message: "Please provide all fields values",
      });
    }

    // fields okay
    if (name && email && password) {
      //   user exists allready
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        return res
          .status(201)
          .json({ status: "failed", message: "User  Already registered" });
      } else {
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hanshedPassword = await bcrypt.hash(password, salt);
        console.log("hash", hanshedPassword);

        const user = await UserModel.create({
          name,
          email,
          password: hanshedPassword,
        });
        if (user) {
          return res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user,
            token: generateToken(user._id),
          });
        }
      }
    }
  } catch (error) {
    if (error) {
      res
        .status(500)
        .json({ status: "failed", message: "Internal Server error" });
    }
  }
};
