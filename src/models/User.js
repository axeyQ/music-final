const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists']
    },
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists']
    },
    image:{
        type: String,
    }

    
},{
    timestamps:true
});

UserSchema.virtual('musicDetails', {
  ref: 'MusicDetails',
  localField: '_id',
  foreignField: 'owner'
});

// Make sure to enable virtuals if you add this
UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

const User = models.User || model('User', UserSchema);

export default User;