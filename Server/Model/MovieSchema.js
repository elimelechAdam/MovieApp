const mongoose = require("mongoose");

// Users Schema
const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    fullname: String,
  },
  {
    versionKey: false,
  }
);

// Movies Schema
const movieSchema = new mongoose.Schema(
  {
    name: String,
    yearPremiered: String,
    imageUrl: String,
    genres: [String],
  },
  {
    versionKey: false,
  }
);

// Members Schema
const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    city: String,
  },
  {
    versionKey: false,
  }
);

// Subscriptions Schema
const subscriptionSchema = new mongoose.Schema(
  {
    movieId: { type: mongoose.Types.ObjectId, ref: "Movie" }, // Foreign Key referencing Movies Collection
    memberId: { type: mongoose.Types.ObjectId, ref: "Member" }, // Foreign Key referencing Members Collection
    date: String,
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("User", userSchema);
const MovieModel = mongoose.model("Movie", movieSchema);
const MemberModel = mongoose.model("Member", memberSchema);
const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

module.exports = {
  UserModel,
  MovieModel,
  MemberModel,
  SubscriptionModel,
};
