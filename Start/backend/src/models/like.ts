import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Like = new Schema({
    ucesnik: {type:String},
    radionica: {type:String},
    datum: {type:Date}

})

export default mongoose.model('Like', Like, 'likes');