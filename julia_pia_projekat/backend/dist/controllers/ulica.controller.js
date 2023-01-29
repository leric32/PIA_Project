"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UlicaController = void 0;
const ulica_1 = __importDefault(require("../models/ulica"));
const ulica_pripada_1 = __importDefault(require("../models/ulica_pripada"));
class UlicaController {
    constructor() {
        this.getAll = (req, res) => {
            ulica_1.default.find({}, (err, u) => {
                if (err)
                    console.log(err);
                else
                    res.json(u);
            });
        };
        this.getAllPripadaUlica = (req, res) => {
            ulica_pripada_1.default.find({ "idU": req.body.idM }, (err, u) => {
                if (err)
                    console.log(err);
                else
                    res.json(u);
            });
        };
        this.getAllPripada = (req, res) => {
            ulica_pripada_1.default.find({}, (err, u) => {
                if (err)
                    console.log(err);
                else
                    res.json(u);
            });
        };
        this.dodajUlicu = (req, res) => {
            let u = new ulica_1.default({ idU: req.body.idU, naziv: req.body.naziv });
            u.save().then(ulica => {
                res.status(200).json({ 'message': 'uneta ulica' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
        this.dodajUlicaPripada = (req, res) => {
            let u = new ulica_pripada_1.default({ idU: req.body.idU, idM: req.body.idM });
            u.save().then(ulica_pripada => {
                res.status(200).json({ 'message': 'uneta ulicapripada' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
    }
}
exports.UlicaController = UlicaController;
//# sourceMappingURL=ulica.controller.js.map