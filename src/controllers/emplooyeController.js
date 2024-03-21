const Emplooye = require("../models/emplooyeModel.js");
const bcrypt = require("bcrypt");

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
    console.log("Error ____ emplooye ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

const loginEmplooye = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error ____ emplooye ", error);
    res.status(500).json({
      ok: false,
      message: "Error Internal Server",
      data: null,
    });
  }
};

module.exports = { registerEmplooye, loginEmplooye };
