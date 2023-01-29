"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const omiljene_1 = __importDefault(require("../models/omiljene"));
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.promeniNesto = (req, res) => {
            let sta = req.body.sta;
            let novo = req.body.novo;
            let korisnicko_ime = req.body.korisnicko_ime;
            console.log(req.body);
            switch (sta) {
                case "odobren":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "odobren": novo } });
                    break;
                case "lozinka":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "lozinka": novo } });
                    break;
                case "korisnicko_ime":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "korisnicko_ime": novo } });
                    break;
                case "ime":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "ime": novo } });
                    break;
                case "prezime":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "prezime": novo } });
                    break;
                case "tip":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "tip": novo } });
                    break;
                case "telefon":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "telefon": novo } });
                    break;
                case "agencija":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "agencija": novo } });
                    break;
                case "grad":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "grad": novo } });
                    break;
                case "datum_rodjenja":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "datum_rodjenja": novo } });
                    break;
                case "email":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "email": novo } });
                    break;
                case "br":
                    user_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "br": novo } });
                    break;
            }
            res.json({ 'message': 'Uspesno izmenjen korisnik' });
        };
        this.getAll = (req, res) => {
            user_1.default.find({}, (err, k) => {
                if (err)
                    console.log(err);
                else
                    res.json(k);
            });
        };
        this.getAllOmiljene = (req, res) => {
            omiljene_1.default.find({}, (err, o) => {
                if (err)
                    console.log(err);
                else
                    res.json(o);
            });
        };
        this.getAllOmiljeneZa = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            omiljene_1.default.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, o) => {
                if (err)
                    console.log(err);
                else
                    res.json(o);
                console.log(o);
            });
        };
        this.dodajOmiljenuZa = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let nekretnine = req.body.nekretnine;
            omiljene_1.default.collection.updateOne({ 'korisnicko_ime': korisnicko_ime }, { $set: { "nekretnine": nekretnine } });
            res.json({ 'message': 'Uspesno izmenjen omiljen' });
        };
        this.dodajOmiljenu = (req, res) => {
            let omiljena = new omiljene_1.default({ korisnicko_ime: req.body.korisnicko_ime, nekretnine: req.body.nekretnine });
            omiljena.save().then(omiljene => {
                res.status(200).json({ 'message': 'unet omiljen reg' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.register = (req, res) => {
            let user = new user_1.default({ ime: req.body.ime, prezime: req.body.prezime,
                korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka, grad: req.body.grad, datum_rodjenja: req.body.datum_rodjenja, telefon: req.body.telefon,
                email: req.body.email, tip: req.body.tip, agencija: req.body.agencija, br: req.body.br, slika: req.body.slika, odobren: req.body.odobren });
            user.save().then(user => {
                res.status(200).json({ 'message': 'unet korisnik reg' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map