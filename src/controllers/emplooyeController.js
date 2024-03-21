const Emplooye = require("../models/emplooyeModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secret = "%$&#*345sd<#$%&?";

const registerEmplooye = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailExist = await Emplooye.findOne({ email: email });

    if (emailExist) {
      return res.status(400).json({
        ok: false,
        message: "Email already exist",
        data: null,
      });
    }

    const emplooyes = await Emplooye.find();

    const emplooyeData = {
      userId: emplooyes.length + 1,
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
    };

    const newEmplooye = await Emplooye(emplooyeData);
    const savedEmplooye = await newEmplooye.save();

    res.status(201).json({
      ok: true,
      message: "Emplooye registered succesfully",
      data: savedEmplooye,
    });
  } catch (error) {
    console.log("Error registering emplooye ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const loginEmplooye = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emplooyeFound = await Emplooye.findOne({ email: email });

    if (!emplooyeFound) {
      return res.status(404).json({
        ok: false,
        message: "EMAIL or password incorrect",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      emplooyeFound.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        ok: false,
        message: "Email or PASSWORD incorrect",
        data: null,
      });
    }

    const token = jwt.sign({ userId: emplooyeFound.userId }, jwt_Secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      ok: true,
      message: "User login succesfully",
      token: token,
      data: emplooyeFound,
    });
  } catch (error) {
    console.log("Error in login emplooye ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

module.exports = { registerEmplooye, loginEmplooye };
