"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nekretnina_controller_1 = require("../controllers/nekretnina.controller");
const nekretninaRouter = express_1.default.Router();
nekretninaRouter.route('/getAll').get((req, res) => new nekretnina_controller_1.NekretninaController().getAll(req, res));
nekretninaRouter.route('/getAllLinije').get((req, res) => new nekretnina_controller_1.NekretninaController().getAllLinije(req, res));
nekretninaRouter.route('/getAllSlike').get((req, res) => new nekretnina_controller_1.NekretninaController().getAllSlike(req, res));
nekretninaRouter.route('/getAllTipNekretnine').get((req, res) => new nekretnina_controller_1.NekretninaController().getAllTipNekretnine(req, res));
nekretninaRouter.route('/getAllSlikeSadrzi').get((req, res) => new nekretnina_controller_1.NekretninaController().getAllSlikeSadrzi(req, res));
nekretninaRouter.route('/dodajNekretninu').post((req, res) => new nekretnina_controller_1.NekretninaController().dodajNekretninu(req, res));
nekretninaRouter.route('/dodajSliku').post((req, res) => new nekretnina_controller_1.NekretninaController().dodajSliku(req, res));
nekretninaRouter.route('/promeniNesto').post((req, res) => new nekretnina_controller_1.NekretninaController().promeniNesto(req, res));
nekretninaRouter.route('/dodajSlikuSadrzi').post((req, res) => new nekretnina_controller_1.NekretninaController().dodajSlikuSadrzi(req, res));
exports.default = nekretninaRouter;
//# sourceMappingURL=nekretnina.routes.js.map