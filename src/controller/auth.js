const User = require("../models/user");
const jwt = require("jsonwebtoken");

function GenerateTokenAndCookie(data, status, message, res) {
  const token = jwt.sign({ data }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
  
  return res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 - 2000),
    })
    .status(status)
    .json({ message: message, data });
}

exports.Signin = async (req, res) => {
  const { Email, passWord } = req.body;
  if (!Email || !passWord)
    return res.status(401).send("please provide email or password");
  const user = await User.findOne({ Email });
  if (!user || !(await user.ConfirmLogin(passWord, user.passWord)))
    return res.status(401).send("Email or password are wrong");
  user.passWord = undefined;
  const status = 200;
  const message = "successfully Signin";
  return GenerateTokenAndCookie(user, status, message, res);

  // return res.status(400).json({ message: "welcome",user })
};

exports.Signup = async (req, res) => {
  const { Name, Email, passWord, confirmPassword } = req.body;
  const user = new User({ Name, Email, passWord, confirmPassword });
  
  if(req.file)
      user.Profile=req.file.filename;
  await user.save((error, data) => {
    if (error) {
      if (error.code === 11000)
        return res.status(409).json({ message: "email already used" });
      return res.status(401).json({ error });
    }
    data.passWord = undefined;
    const status = 201;
    const message = "successfully created";
    return GenerateTokenAndCookie(data, status, message, res);
    /* const token = jwt.sign(
      { name: data.name, _id: data._id, email: data.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res
      .cookie(jwt, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(201)
       .json({ message: "Successfuly created", data: user });*/
  });
};

exports.logout =async (req, res) => {
    await res.clearCookie("token");
    res.status(200).json({ message:" successfully logout "});
};
