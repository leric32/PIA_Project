import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Slika = new Schema({
    idS: {type:Number},
    lokacija: {type:String}
})

export default mongoose.model('Slika', Slika, 'slike');