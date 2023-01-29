import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Agencija = new Schema({
    idA: {type:Number},
    naziv: {type:String},
    adresa: {type:String},
    grad: {type:Number},
    telefon: {type:String},
    PIB:{type:Number}
})

export default mongoose.model('Agencija', Agencija, 'agencije');