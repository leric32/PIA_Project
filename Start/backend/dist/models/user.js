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
    tel: { type: String },
    email: { type: String },
    tip: { type: String },
    organizacija: { type: String },
    adresa_org: { type: String },
    broj_org: { type: String },
    slika: { type: String },
    status: { type: String },
    token: { type: String },
    token_date: { type: Date }
});
exports.default = mongoose_1.default.model('User', User, 'users');
//# sourceMappingURL=user.js.map