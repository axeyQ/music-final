import { Schema, model, models } from "mongoose";

// Define the Artist Schema
const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate artists
  },
  bio: {
    type: String,
    default: "",
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
}, { timestamps: true });

// Create or retrieve the model
const Artist = models.Artist || model("Artist", ArtistSchema);

export default Artist;
