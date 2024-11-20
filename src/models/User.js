// const { Schema, model, models } = require("mongoose");

// const UserSchema = new Schema({
//     email:{
//         type: String,
//         required: [true, 'Email is required'],
//         unique: [true, 'Email already exists']
//     },
//     username:{
//         type: String,
//         required: [true, 'Username is required'],
//         unique: [true, 'Username already exists']
//     },
//     password:{
//         type: String,
//         required: [true, 'Password is required'],
//         minlength: [6, 'Password must be at least 6 characters']
//     },
//     contributions:[{
//         type: Schema.Types.ObjectId,
//         ref:'MusicDetails'
//     }]
    
// },{
//     timestamps:true
// });

// const User = models.User || model('User', UserSchema);

// export default User;