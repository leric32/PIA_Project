"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agencija_controller_1 = require("../controllers/agencija.controller");
const agencijaRouter = express_1.default.Router();
agencijaRouter.route('/getAll').get((req, res) => new agencija_controller_1.AgencijaController().getAll(req, res));
agencijaRouter.route('/dodajAgenciju').post((req, res) => new agencija_controller_1.AgencijaController().dodajAgenciju(req, res));
exports.default = agencijaRouter;
//# sourceMappingURL=agencija.routes.js.map