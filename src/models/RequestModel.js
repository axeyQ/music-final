import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MusicDetails',  
        required: true
    },
    requestType: {
        type: String,
        enum: ['EDIT', 'DELETE'],
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    message: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema);
export default Request;
