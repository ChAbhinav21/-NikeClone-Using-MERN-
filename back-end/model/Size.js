const mongoose = require('mongoose')
const {Schema} = mongoose;

const SizeSchema = new Schema({
    label:{type:String,required:true,unique:true},
    value:{type:String,required:true,unique:true}, 
})

module.exports = mongoose.model("Size",SizeSchema)