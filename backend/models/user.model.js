const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema   = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function(personalEmail) {
                return new RegExp('^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$').test(personalEmail)
            },
            message: 'Invalid email'
        },
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function (next) {
    if (this.password) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
});

module.exports = mongoose.model('User', UserSchema);
