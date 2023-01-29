import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Mikrolokacija = new Schema({
    idM: {type:Number},
    naziv: {type:String}
})

export default mongoose.model('Mikrolokacija', Mikrolokacija, 'mikrolokacije');