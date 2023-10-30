const { UserModel } = require("../Model/MovieSchema");

const getAllUsers = () => {
  return UserModel.find({});
};

const getUser = (id) => {
  return UserModel.findById(id);
};
const addUser = async (user) => {
  const newUser = UserModel(user);
  console.log("inside BLL - user");
  console.log(user);
  await newUser.save();
  return `User Added ${user.fullname} ${user.username} ${user.password}`;
};
const updateUser = async (id, user) => {
  UserModel.findByIdAndUpdate(id, user);
  return `User ${user.username} - Updated`;
};

const deleteUser = async (id) => {
  UserModel.findByIdAndDelete(id);
  return `User ${id} - Removed`;
};

module.exports = {
  getUser,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
