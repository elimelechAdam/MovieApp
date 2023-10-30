const { MemberModel, SubscriptionModel } = require("../Model/MovieSchema");

const getAllMembers = () => {
  return MemberModel.find({});
};

const getMember = (id) => {
  return MemberModel.findById(id);
};
const addMember = async (member) => {
  const newMember = MemberModel(member);
  console.log("inside BLL - Member");
  console.log(member);
  await newMember.save();
  return `Member Added`;
};
const updateMember = async (id, member) => {
  const resp = await MemberModel.findByIdAndUpdate(id, member, { new: true });
  console.log(resp);
  return resp;
};

const deleteMember = async (id) => {
  await SubscriptionModel.deleteMany({ memberId: id });
  await MemberModel.findByIdAndDelete(id);
  return `Member deleted`;
};

module.exports = {
  getMember,
  getAllMembers,
  addMember,
  updateMember,
  deleteMember,
};
