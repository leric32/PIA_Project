"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mikrolokacija_controller_1 = require("../controllers/mikrolokacija.controller");
const mikrolokacijaRouter = express_1.default.Router();
mikrolokacijaRouter.route('/getAll').get((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().getAll(req, res));
mikrolokacijaRouter.route('/getAllPripadaMikro').get((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().getAllPripadaMikro(req, res));
mikrolokacijaRouter.route('/getAllPripada').get((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().getAllPripada(req, res));
mikrolokacijaRouter.route('/dodajMikrolokaciju').post((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().dodajMikrolokaciju(req, res));
mikrolokacijaRouter.route('/dodajMikrolokPripada').post((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().dodajMikrolokPripada(req, res));
mikrolokacijaRouter.route('/delete').post((req, res) => new mikrolokacija_controller_1.MikrolokacijaController().delete(req, res));
exports.default = mikrolokacijaRouter;
//# sourceMappingURL=mikro.routes.js.map