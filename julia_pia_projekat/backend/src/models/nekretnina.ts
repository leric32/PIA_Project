import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Nekretnina = new Schema({
    idN:{type:Number},
    naziv: {type:String},
    tip_nekretnine: {type:Number},
    grad: {type:Number},
    opstina: {type:Number},
    mikrolokacija: {type:Number},
    ulica: {type:Number},
    kvadratura: {type:Number},
    broj_soba: {type:Number},
    cena: {type:Number},
    godina: {type:Number},
    stanje: {type:Array},
    tip_grejanja: {type:Array},
    sprat: {type:Number},
    max_sprat: {type:Number},
    parking: {type:Boolean},
    opis: {type:String},
    terasa: {type:Boolean},
    podrum: {type:Boolean},
    internet: {type:Boolean},
    lodja: {type:Boolean},
    garaza: {type:Boolean},
    interfon: {type:Boolean},
    franc_balkon: {type:Boolean},
    sa_bastom: {type:Boolean},
    telefon: {type:Boolean},
    lift: {type:Boolean},
    klima: {type:Boolean},
    mesecne_rezije: {type:Number},
    poslednja_izmena: {type:Date},
    linije: {type:Array},
    mesec_prodaje: {type:Number},
    agent: {type:String}
})

export default mongoose.model('Nekretnina', Nekretnina, 'nekretnine');