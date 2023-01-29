import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Linija = new Schema({
    broj_linije: {type:Number}
})

export default mongoose.model('Linija', Linija, 'linije');