"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Message = new Schema({
    from: { type: String },
    to: { type: String },
    datum: { type: Date },
    tekst: { type: String },
    fromImg: { type: String },
    toImg: { type: String },
    radionica: { type: String },
    _idR: { type: String }
});
exports.default = mongoose_1.default.model('Message', Message, 'messages');
//# sourceMappingURL=message.js.map