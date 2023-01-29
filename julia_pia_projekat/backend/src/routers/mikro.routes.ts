import express from 'express';
import { MikrolokacijaController } from '../controllers/mikrolokacija.controller';

const mikrolokacijaRouter = express.Router();

mikrolokacijaRouter.route('/getAll').get(
    (req, res)=>new MikrolokacijaController().getAll(req, res)
)

mikrolokacijaRouter.route('/getAllPripadaMikro').get(
    (req, res)=>new MikrolokacijaController().getAllPripadaMikro(req, res)
)

mikrolokacijaRouter.route('/getAllPripada').get(
    (req, res)=>new MikrolokacijaController().getAllPripada(req, res)
)

mikrolokacijaRouter.route('/dodajMikrolokaciju').post(
    (req, res)=>new MikrolokacijaController().dodajMikrolokaciju(req, res)
)

mikrolokacijaRouter.route('/dodajMikrolokPripada').post(
    (req, res)=>new MikrolokacijaController().dodajMikrolokPripada(req, res)
)

mikrolokacijaRouter.route('/delete').post(
    (req, res)=>new MikrolokacijaController().delete(req, res)
)

export default mikrolokacijaRouter;