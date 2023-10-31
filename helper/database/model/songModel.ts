const { Schema, model, models } = require("mongoose");

const songModel = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: false },
  artistId: {type: String, required: true},
  url: {type: String, required: true},
  duration: {type: Number, required: false},
});

const Songs = models?.song || model("song", songModel);

export default Songs;