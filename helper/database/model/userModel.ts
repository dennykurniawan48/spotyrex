const { Schema, model, models } = require("mongoose");

const userModel = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: false },
});

const Users = models?.user || model("user", userModel);

export default Users;