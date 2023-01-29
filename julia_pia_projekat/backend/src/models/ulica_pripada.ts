import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let UlicaPripada = new Schema({
    idU: {type:Number},
    idM: {type:Number}
})

export default mongoose.model('UlicaPripada', UlicaPripada, 'ulica_pripada');