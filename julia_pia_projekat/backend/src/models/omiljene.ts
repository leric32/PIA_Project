import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Omiljene = new Schema({
    korisnicko_ime: {type:String},
    nekretnine: {type:Array}
})

export default mongoose.model('Omiljene', Omiljene, 'omiljene');