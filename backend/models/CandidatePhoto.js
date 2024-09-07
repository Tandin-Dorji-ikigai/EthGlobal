const mongoose = require('mongoose');

const CandidatePhotoSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true,
        // unique: true
    }
});

const CandidatePhoto = mongoose.model('CandidatePhoto', CandidatePhotoSchema);
module.exports = CandidatePhoto;