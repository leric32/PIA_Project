import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Ulica = new Schema({
    idU: {type:Number},
    naziv: {type:String}
})

export default mongoose.model('Ulica', Ulica, 'ulice');