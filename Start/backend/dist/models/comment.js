"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Comment = new Schema({
    ucesnik: { type: String },
    radionica: { type: String },
    komentar: { type: String },
    datum: { type: Date }
});
exports.default = mongoose_1.default.model('Comment', Comment, 'comments');
//# sourceMappingURL=comment.js.map