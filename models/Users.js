const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return v.length === 12;
      },
      message: (props) =>
        `${props.value} is not a valid mobile number! It must have exactly 12 characters.`,
    },
  },
  comparisonList: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Truck",
      },
    ],
    default: [],
  },
});

UserSchema.pre("validate", function (next) {
  if (!this.email && !this.mobile) {
    const error = new Error("At least one of email or mobile is required.");
    next(error);
  } else {
    next();
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
