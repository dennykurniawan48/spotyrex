const { Schema, model, models } = require("mongoose");

const artistModel = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: false },
});

const Artists = models?.artist || model("artist", artistModel);

export default Artists;