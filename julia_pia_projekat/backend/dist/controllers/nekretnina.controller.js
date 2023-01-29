"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NekretninaController = void 0;
const slika_sadrzi_1 = __importDefault(require("../models/slika_sadrzi"));
const nekretnina_1 = __importDefault(require("../models/nekretnina"));
const slika_1 = __importDefault(require("../models/slika"));
const tip_nekretnine_1 = __importDefault(require("../models/tip_nekretnine"));
const linija_1 = __importDefault(require("../models/linija"));
class NekretninaController {
    constructor() {
        this.getAll = (req, res) => {
            nekretnina_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.getAllLinije = (req, res) => {
            linija_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.getAllTipNekretnine = (req, res) => {
            tip_nekretnine_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.getAllSlike = (req, res) => {
            slika_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.getAllSlikeSadrzi = (req, res) => {
            slika_sadrzi_1.default.find({}, (err, n) => {
                if (err)
                    console.log(err);
                else
                    res.json(n);
            });
        };
        this.dodajNekretninu = (req, res) => {
            let n = new nekretnina_1.default(req.body);
            n.save().then(Nekretnina => {
                res.status(200).json({ 'message': 'uneta nekretnina' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.dodajSliku = (req, res) => {
            let s = new slika_1.default(req.body);
            s.save().then(slika => {
                res.status(200).json({ 'message': 'uneta slika' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.dodajSlikuSadrzi = (req, res) => {
            let ss = new slika_sadrzi_1.default(req.body);
            ss.save().then(slika_sadrzi => {
                res.status(200).json({ 'message': 'uneta slikasadrzi' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.promeniNesto = (req, res) => {
            let sta = req.body.sta;
            let novo = req.body.novo;
            let idN = req.body.idN;
            switch (sta) {
                case "naziv":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "naziv": novo } });
                    break;
                case "tip_nekretnine":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "tip_nekretnine": novo } });
                    break;
                case "grad":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "grad": novo } });
                    break;
                case "opstina":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "opstina": novo } });
                    break;
                case "mikrolokacija":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "mikrolokacija": novo } });
                    break;
                case "ulica":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "ulica": novo } });
                    break;
                case "kvadratura":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "kvadratura": novo } });
                    break;
                case "broj_soba":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "broj_soba": novo } });
                    break;
                case "cena":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "cena": novo } });
                    break;
                case "godina":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "godina": novo } });
                    break;
                case "stanje":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "stanje": novo } });
                    break;
                case "tip_grejanja":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "tip_grejanja": novo } });
                    break;
                case "sprat":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "sprat": novo } });
                    break;
                case "max_sprat":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "max_sprat": novo } });
                    break;
                case "parking":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "parking": novo } });
                    break;
                case "opis":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "opis": novo } });
                    break;
                case "terasa":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "terasa": novo } });
                    break;
                case "podrum":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "podrum": novo } });
                    break;
                case "internet":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "internet": novo } });
                    break;
                case "lodja":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "lodja": novo } });
                    break;
                case "garaza":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "garaza": novo } });
                    break;
                case "interfon":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "interfon": novo } });
                    break;
                case "franc_balkon":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "franc_balkon": novo } });
                    break;
                case "sa_bastom":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "sa_bastom": novo } });
                    break;
                case "telefon":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "telefon": novo } });
                    break;
                case "lift":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "lift": novo } });
                    break;
                case "klima":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "klima": novo } });
                    break;
                case "mesecne_rezije":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "mesecne_rezije": novo } });
                    break;
                case "poslednja_izmena":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "poslednja_izmena": novo } });
                    break;
                case "linije":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "linije": novo } });
                    break;
                case "mesec_prodaje":
                    nekretnina_1.default.collection.updateOne({ 'idN': idN }, { $set: { "mesec_prodaje": novo } });
                    break;
            }
            res.json({ 'message': 'Uspesno izmenjena nekretnina' });
        };
    }
}
exports.NekretninaController = NekretninaController;
//# sourceMappingURL=nekretnina.controller.js.map