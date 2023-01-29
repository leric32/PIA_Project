"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    idN: { type: Number },
    naziv: { type: String },
    tip_nekretnine: { type: Number },
    grad: { type: Number },
    opstina: { type: Number },
    mikrolokacija: { type: Number },
    ulica: { type: Number },
    kvadratura: { type: Number },
    broj_soba: { type: Number },
    cena: { type: Number },
    godina: { type: Number },
    stanje: { type: Array },
    tip_grejanja: { type: Array },
    sprat: { type: Number },
    max_sprat: { type: Number },
    parking: { type: Boolean },
    opis: { type: String },
    terasa: { type: Boolean },
    podrum: { type: Boolean },
    internet: { type: Boolean },
    lodja: { type: Boolean },
    garaza: { type: Boolean },
    interfon: { type: Boolean },
    franc_balkon: { type: Boolean },
    sa_bastom: { type: Boolean },
    telefon: { type: Boolean },
    lift: { type: Boolean },
    klima: { type: Boolean },
    mesecne_rezije: { type: Number },
    poslednja_izmena: { type: Date },
    linije: { type: Array },
    mesec_prodaje: { type: Number },
    agent: { type: String }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map