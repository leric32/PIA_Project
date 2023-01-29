import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Opstina = new Schema({
    idO: {type:Number},
    naziv: {type:String},
    idG: {type:Number}
})

export default mongoose.model('Opstina', Opstina, 'opstine');