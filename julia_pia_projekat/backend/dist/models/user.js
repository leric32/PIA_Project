"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    ime: { type: String },
    prezime: { type: String },
    korisnicko_ime: { type: String },
    lozinka: { type: String },
    grad: { type: String },
    datum_rodjenja: { type: String },
    telefon: { type: String },
    email: { type: String },
    tip: { type: String },
    agencija: { type: String },
    br: { type: String },
    slika: { type: String },
    odobren: { type: Number }
});
exports.default = mongoose_1.default.model('User', User, 'korisnici');
//# sourceMappingURL=user.js.map