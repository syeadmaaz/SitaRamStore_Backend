const mongoose = require('mongoose');
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        // unique: true,
        required: true
    },
    mobile: {
        type: Number,
        // unique: true,
        required: true,
    },
    address:{
        type: String,
        default: null,
     
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true,
    }
})


const User = mongoose.model('userMaster', userSchema);

module.exports = User;