import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {type:String},
    prezime: {type:String},
    korisnicko_ime: {type:String},
    lozinka: {type:String},
    grad: {type:String},
    datum_rodjenja:{type:String},
    telefon:{type:String},
    email:{type:String},
    tip:{type:String},
    agencija:{type:String},//ili prazno, ili id zato string
    br:{type:String},
    slika:{type:String},
    odobren:{type:Number}
})

export default mongoose.model('User', User, 'korisnici');