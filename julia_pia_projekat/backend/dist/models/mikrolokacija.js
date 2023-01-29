"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Mikrolokacija = new Schema({
    idM: { type: Number },
    naziv: { type: String }
});
exports.default = mongoose_1.default.model('Mikrolokacija', Mikrolokacija, 'mikrolokacije');
//# sourceMappingURL=mikrolokacija.js.map