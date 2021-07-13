let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwd: {type: String, required: true, minlength: 5},
    age: Number,
    phone: Number
}, {timestamps: true});

userSchema.pre('save', function(next) {
    if(this.passwd && this.isModified('passwd')) {
        bcrypt.hash(this.passwd, 12, (err, hashed) => {
            this.passwd = hashed;
            next();
        })
    } else {
        next();
    }
})

module.exports = mongoose.model("User", userSchema);