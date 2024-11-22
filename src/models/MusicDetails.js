const { Schema, model, models, default: mongoose } = require("mongoose");
const lyricsSchema = new Schema({
    section: {
      type: String,
    },
    text: {
      type: [String], // Array of strings to store the lyrics lines
    },
  });
  
const MusicDetailsSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
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
    images:[{
        type:String,
    }],
    lyrics:{
        type:String,
    },
    musicVideo:{
        type:String,
    },
    instrumentals:[{
        type:String,
    }],
    karaoke:[{
        type:String,
    }],
    dance:[{
        type:String,
    }],
    covers:[{
        type:String,
    }]

    
},
{
    timestamps:true
});

const MusicDetails = models.MusicDetails || model('MusicDetails', MusicDetailsSchema);

export default MusicDetails;