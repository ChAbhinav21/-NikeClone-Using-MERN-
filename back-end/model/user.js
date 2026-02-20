// back-end/model/user.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        select:false
    },

    role:{
        type:String,
        enum:["User","Admin"],
        default:"User"
    },

    addresses:{
        type:[Schema.Types.Mixed]
    },

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    dateOfBirth:{
        type:String,
        default:""
    },

    resetPasswordToken:{
        type:String
    }

},{timestamps:true});
 
userSchema.pre('save', async function () {
    if(!this.isModified('password')) return  ;
    this.password = await bcrypt.hash(this.password,12);
 
});

// userSchema.methods.correctPassword = async function (enteredPassword,storedPassword) {
//     return await bcrypt.compare(enteredPassword,storedPassword) //or simply this.password = user.password
// }

userSchema.methods.correctPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model('User',userSchema);
