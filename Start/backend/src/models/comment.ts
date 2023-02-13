import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Comment = new Schema({
    ucesnik: {type:String},
    radionica: {type:String},
    komentar: {type:String},
    datum: {type:Date}

})

export default mongoose.model('Comment', Comment, 'comments');