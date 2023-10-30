const { SubscriptionModel } = require("../Model/MovieSchema");

const getAllSubs = () => {
  return SubscriptionModel.find({});
};

const getSub = (id) => {
  return SubscriptionModel.findById(id);
};
const addSub = async (sub) => {
  const newSub = SubscriptionModel(sub);
  console.log("inside BLL - Subscription");
  console.log(sub);
  await newSub.save();
  return `Subscription Added`;
};
const updateSub = async (id, sub) => {
  await SubscriptionModel.findByIdAndUpdate(id, sub);
  return `Sub - Updated`;
};

const deleteSub = async (id) => {
  await SubscriptionModel.findByIdAndDelete(id);
  return `Sub ${id} - Removed`;
};

module.exports = {
  getAllSubs,
  getSub,
  addSub,
  updateSub,
  deleteSub,
};
