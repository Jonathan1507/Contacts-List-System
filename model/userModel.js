const {Schema, model} = require('mongoose');

const UserShema = Schema({
    name:{
        type: String,
        require: true
    },
    surnames:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
});

// This is to change the name from id => "_id" to "uid": it can be any name.
// We also hide the password (it does not return or does not show in the postman)
UserShema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('User', UserShema);