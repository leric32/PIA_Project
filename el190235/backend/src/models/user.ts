import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {type:String},
    prezime: {type:String},
    korisnicko_ime: {type:String},
    lozinka: {type:String},
    tel: {type:String},
    email:{type:String},
    tip:{type:String},
    organizacija:{type:String},
    adresa_org:{type:String},
    broj_org:{type:String},
    slika:{type:String},
    status:{type:String},
    token:{type: String},
    token_date: {type: Date}

})

export default mongoose.model('User', User, 'users');