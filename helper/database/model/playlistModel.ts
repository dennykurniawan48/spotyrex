const { Schema, model, models } = require("mongoose");

const playlistModel = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  songs: {type: [String], required: false}
});

const Playlists = models?.playlist || model("playlist", playlistModel);

export default Playlists;