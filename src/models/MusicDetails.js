const { Schema, model, models } = require("mongoose");
const lyricsSchema = new Schema({
    section: {
      type: String,
    },
    text: {
      type: [String], // Array of strings to store the lyrics lines
    },
  });
  
const MusicDetailsSchema = new Schema({
    title:{
        type: String,
    },
    artist: {
        type: String,
    },
    album:{
        type: String,
    },
    genre:{
        type: String,
    },
    releaseYear:{
        type: Number,
    },
    duration:{
        type: String,
    },
    // lyrics:[{
    //     section:{
    //         type: String,
    //         required: false,
    //     },
    //     text:[lyricsSchema]
    // }],
    images:[{
        type:String,
    }],
    lyrics:{
        type:String,
    }

    
},
{
    timestamps:true
});

const MusicDetails = models.MusicDetails || model('MusicDetails', MusicDetailsSchema);

export default MusicDetails;