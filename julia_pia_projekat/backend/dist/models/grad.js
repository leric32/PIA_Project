"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Grad = new Schema({
    idG: { type: Number },
    naziv: { type: String }
});
exports.default = mongoose_1.default.model('Grad', Grad, 'gradovi');
//# sourceMappingURL=grad.js.map