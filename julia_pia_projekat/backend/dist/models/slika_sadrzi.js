"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let SlikaSadrzi = new Schema({
    idN: { type: Number },
    idS: { type: Number }
});
exports.default = mongoose_1.default.model('SlikaSadrzi', SlikaSadrzi, 'sadrzi_sliku');
//# sourceMappingURL=slika_sadrzi.js.map