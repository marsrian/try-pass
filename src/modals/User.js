import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Anonymous",
      min: 2,
      max: 100,
      // required: true
    },
    email: {
      type: String,
      // required: true,
      unique: true,
      min: 2,
      max: 100,
    },
    password: {
      type: String,
      min: 6,
      // required: true
    },
    uid: {
      type: String,
      // unique: true,
    },
    roles: {
      type: [Number],
      default: [2001],
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    softDelete: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: String,
      default: Date.now(),
    },
    refreshToken: {
      type: String,
      default: null,
    },
    sAccessToken: {
      type: String,
      default: null,
    },
    issuedAt: {
      type: String,
      default: 101010,
    },
    occupation: String,
    deletedAt: String,
    provider: String,
    image: String,
    bio: String,
    lastLoginIp: String,
    city: String,
    state: String,
    country: String,

    phoneNumber: String,

    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
