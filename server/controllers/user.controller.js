import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import User from "../models/user.model.js";

config();
const secret = process.env.SCRET_KEY;

export const signin = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const oldUser = await User.findOne({ username });
    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: oldUser._id, username: oldUser.username, email: oldUser.email }, secret, { expiresIn: "24h" });

    res.status(200).json({ profile: { _id: oldUser._id, username: oldUser.username, email: oldUser.email, name: oldUser.name } , token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    const emailUser = await User.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });
    if (emailUser) return res.status(400).json({ message: "Email is already use by other user" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ username, email, password: hashedPassword, name: `${firstname} ${lastname}` });
    const token = jwt.sign( { id: result._id, username: result.username, email: result.email }, secret, { expiresIn: "24h" } );

    res.status(201).json({ profile: { _id: result._id, username: result.username, email: result.email, name: result.name }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};