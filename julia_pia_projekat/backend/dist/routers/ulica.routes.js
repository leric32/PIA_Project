"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ulica_controller_1 = require("../controllers/ulica.controller");
const ulicaRouter = express_1.default.Router();
ulicaRouter.route('/getAll').get((req, res) => new ulica_controller_1.UlicaController().getAll(req, res));
ulicaRouter.route('/getAllPripadaUlica').get((req, res) => new ulica_controller_1.UlicaController().getAllPripadaUlica(req, res));
ulicaRouter.route('/getAllPripada').get((req, res) => new ulica_controller_1.UlicaController().getAllPripada(req, res));
ulicaRouter.route('/dodajUlicu').post((req, res) => new ulica_controller_1.UlicaController().dodajUlicu(req, res));
ulicaRouter.route('/dodajUlicaPripada').post((req, res) => new ulica_controller_1.UlicaController().dodajUlicaPripada(req, res));
exports.default = ulicaRouter;
//# sourceMappingURL=ulica.routes.js.map