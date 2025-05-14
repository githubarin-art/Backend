import mongoose from 'mongoose';
import User from '../models/user.models.js';

const UserData = async (req, res) => {
  const { username, password, email } = req.params;
  if (username) {
    return res.status(200).json({
      message: "User found",
      user: username
    });
  } else if (password) {
    return res.status(200).json({
      message: "Password found",
      password: password
    });
  } else if (email) {
    return res.status(200).json({
      message: "Email found",
      email: email
    });
  } else {
    return res.status(400).json({
      message: "No valid parameter provided"
    });
  }
};

export { UserData };