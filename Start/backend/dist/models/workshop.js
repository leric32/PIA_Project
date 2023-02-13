"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Workshop = new Schema({
    naziv: { type: String },
    organizator: { type: String },
    mesto: { type: String },
    kratak_opis: { type: String },
    duzi_opis: { type: String },
    datum: { type: Date },
    mesta: { type: Number },
    zauzeto: { type: Number },
    slika0: { type: String },
    slike: { type: Array },
    prihvaceni: { type: Array },
    cekaju: { type: Array },
    status: { type: String }
});
exports.default = mongoose_1.default.model('Workshop', Workshop, 'workshops');
//# sourceMappingURL=workshop.js.map