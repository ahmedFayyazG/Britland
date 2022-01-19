// const mongoose = require("mongoose");
// const crypto = require("crypto");
// const { v4: uuidv4 } = require("uuid");

// const UserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       trim: true,
//       maxLenght: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       maxLenght: 20,
//     },
//     hashed_password: {
//       type: String,
//       required: true,
//     },
//     salt: String,
//     role: {
//       type: Number,
//       default: 0,
//     },
//     history: {
//       type: Array,
//       default: [],
//     },
//   },
//   { timestamps: true }
// );

// //Virtual Fields
// UserSchema.virtual("password")
//   .set(function (password) {
//     (this._password = password),
//       (this._salt = uuidv4()),
//       (this._hashedPassword = this.encryptPassword(password));
//   })
//   .get(function () {
//     return this._password;
//   });

// //methods
// UserSchema.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this._hashedPassword;
//   },

//   encryptPassword: function (password) {
//     if (!password) {
//       return "";
//     }

//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (error) {
//       return error;
//     }
//   },
// };

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

//Virtual Fields
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

//YAHAN WOH FUNCTIONS DECLARE HON GY JOH YAHN UPER USE HO SKEN
UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "Erorr?";
    }
  },
};
module.exports = mongoose.model("User", UserSchema);
