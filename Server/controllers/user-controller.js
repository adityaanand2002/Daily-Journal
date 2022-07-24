import User from "../model/User";
//import bcrypt from "bcryptjs";

export const AllUsers = async (req, res) => {
  let Users;
  try {
    Users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!Users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users: Users });
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  //const hashedpass = bcrypt.hashSync(password);

  let Exist;

  try {
    Exist = await User.findOne({ email: email });
  } catch (err) {
    res.send(err);
  }
  if (Exist) {
    return res.status(400).json({ message: "User already exists"});
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
    blogs: [],
  });
  try {
    await user.save();
  } catch (err) {
    res.send(err);
  }

  return res
    .status(201)
    .json({user: user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let Exist;

  try {
    Exist = await User.findOne({ email: email });
  } catch (err) {
    res.send(err);
  }
  if (!Exist) {
    return res.status(404).json({ message: "User not found" });
  }

 // const isPasswordCorrect = bcrypt.compareSync(password, Exist.password);

  if (password!==Exist.password) {
    return res.status(400).json({ message: "Incorrect password" });
  } else {
    return res
      .status(200)
      .json({ message: "Login successful", user: Exist });
  }
};
