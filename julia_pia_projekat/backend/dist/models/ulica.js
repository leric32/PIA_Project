"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ulica = new Schema({
    idU: { type: Number },
    naziv: { type: String }
});
exports.default = mongoose_1.default.model('Ulica', Ulica, 'ulice');
//# sourceMappingURL=ulica.js.map