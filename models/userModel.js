const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user email address"]
    },

    role: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please add the user email"],
    },
    adminauth: {
        type: Boolean,
    },
    userauth: {
        type: Boolean,
    },
    userId: {
        type: String,
    },
   token: {
        type: String,
        // required: [true, "Please add the state"],
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("user", userSchema);