import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let TipNekretnine = new Schema({
    idT: {type:Number},
    naziv: {type:String}
})

export default mongoose.model('TipNekretnine', TipNekretnine, 'tip_nekretnine');