import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let SlikaSadrzi = new Schema({
    idN: {type:Number},
    idS: {type:Number}
})

export default mongoose.model('SlikaSadrzi', SlikaSadrzi, 'sadrzi_sliku');