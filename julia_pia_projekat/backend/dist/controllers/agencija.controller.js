"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencijaController = void 0;
const agencija_1 = __importDefault(require("../models/agencija"));
class AgencijaController {
    constructor() {
        this.getAll = (req, res) => {
            agencija_1.default.find({}, (err, a) => {
                if (err)
                    console.log(err);
                else
                    res.json(a);
            });
        };
        this.dodajAgenciju = (req, res) => {
            let a = new agencija_1.default({ idA: req.body.idA, naziv: req.body.naziv,
                adresa: req.body.adresa, grad: req.body.grad, telefon: req.body.telefon, PIB: req.body.PIB });
            console.log(a);
            a.save().then(agencija => {
                res.status(200).json({ 'message': 'uneta agencija' });
            }).catch(err => {
                res.status(400).json({ 'message': 'error' });
            });
        };
    }
}
exports.AgencijaController = AgencijaController;
//# sourceMappingURL=agencija.controller.js.map