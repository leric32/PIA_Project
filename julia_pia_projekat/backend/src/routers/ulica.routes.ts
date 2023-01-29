import express from 'express';
import ulica_pripada from '../models/ulica_pripada';
import { UlicaController } from '../controllers/ulica.controller';

const ulicaRouter = express.Router();

ulicaRouter.route('/getAll').get(
    (req, res)=>new UlicaController().getAll(req, res)
)

ulicaRouter.route('/getAllPripadaUlica').get(
    (req, res)=>new UlicaController().getAllPripadaUlica(req, res)
)

ulicaRouter.route('/getAllPripada').get(
    (req, res)=>new UlicaController().getAllPripada(req, res)
)

ulicaRouter.route('/dodajUlicu').post(
    (req, res)=>new UlicaController().dodajUlicu(req, res)
)

ulicaRouter.route('/dodajUlicaPripada').post(
    (req, res)=>new UlicaController().dodajUlicaPripada(req, res)
)

export default ulicaRouter;