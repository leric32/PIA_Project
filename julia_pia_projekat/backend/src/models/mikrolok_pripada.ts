import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let MikrolokacijaPripada = new Schema({
    idM: {type:Number},
    idO: {type:Number}
})

export default mongoose.model('MikrolokacijaPripada', MikrolokacijaPripada, 'mikrolokacija_pripada');