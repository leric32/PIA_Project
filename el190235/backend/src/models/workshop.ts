import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Workshop = new Schema({
    _id: {type: ObjectId},
    naziv: {type:String},
    organizator: {type:String},
    mesto: {type:String},
    kratak_opis: {type:String},
    duzi_opis: {type:String},
    datum: {type:Date},
    mesta: {type:Number},
    zauzeto: {type:Number},
    slika0:{type:String},
    slike:{type:Array},
    prihvaceni: {type: Array},
    cekaju: {type: Array},
    status: {type: String},
    brojLajkova: {type: Number}
})

export default mongoose.model('Workshop', Workshop, 'workshops');