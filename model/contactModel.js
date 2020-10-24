const {Schema, model} = require('mongoose');

const ContactShema = Schema({
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
    phone:{
        type: String,
        require: true,
        unique: true
    },
    user: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

ContactShema.method('toJSON', function(){
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Contact', ContactShema);