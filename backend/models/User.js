const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    walletAddress: { 
        type: String, 
        required: true, 
        unique: true
    },

    attestation_id: { 
        type: String, 
        required: true, 
        unique: true 
    }
}, 
{ timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;