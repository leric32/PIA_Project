import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Message = new Schema({
    from: {type:String},
    to: {type:String},
    datum: {type:Date},
    tekst: {type:String},
    fromImg: {type:String},
    toImg: {type:String},
    radionica: {type:String},
     _idR: {type: String}

})

export default mongoose.model('Message', Message, 'messages');