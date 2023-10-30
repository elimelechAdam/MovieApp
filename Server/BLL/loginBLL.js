const { UserModel } = require("../Model/MovieSchema");

const loginUser = async (username, password) => {
  const user = await UserModel.findOne({ username, password });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  return user;
};

module.exports = {
  loginUser,
};
