"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MikrolokacijaController = void 0;
const mikrolokacija_1 = __importDefault(require("../models/mikrolokacija"));
const mikrolok_pripada_1 = __importDefault(require("../models/mikrolok_pripada"));
class MikrolokacijaController {
    constructor() {
        this.getAll = (req, res) => {
            mikrolokacija_1.default.find({}, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.json(m);
            });
        };
        this.getAllPripadaMikro = (req, res) => {
            mikrolok_pripada_1.default.find({ "idM": req.body.idM }, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.json(m);
            });
        };
        this.getAllPripada = (req, res) => {
            mikrolok_pripada_1.default.find({}, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.json(m);
            });
        };
        this.dodajMikrolokaciju = (req, res) => {
            let m = new mikrolokacija_1.default({ idM: req.body.idM, naziv: req.body.naziv });
            m.save().then(mikrolokacija => {
                res.status(200).json({ 'message': 'uneta mikrolokacija' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.dodajMikrolokPripada = (req, res) => {
            let m = new mikrolok_pripada_1.default({ idM: req.body.idM, idO: req.body.idO });
            m.save().then(mikrolok_pripada => {
                res.status(200).json({ 'message': 'uneta mikrolokpripada' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.delete = (req, res) => {
            let idM = req.body.idM;
            mikrolokacija_1.default.collection.deleteOne({ 'idM': idM }, (err, m) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.MikrolokacijaController = MikrolokacijaController;
//# sourceMappingURL=mikrolokacija.controller.js.map