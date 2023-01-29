import express from 'express';
import { NekretninaController } from '../controllers/nekretnina.controller';
import { GradController } from '../controllers/grad.controller';

const nekretninaRouter = express.Router();

nekretninaRouter.route('/getAll').get(
    (req, res)=>new NekretninaController().getAll(req, res)
)

nekretninaRouter.route('/getAllLinije').get(
    (req, res)=>new NekretninaController().getAllLinije(req, res)
)

nekretninaRouter.route('/getAllSlike').get(
    (req, res)=>new NekretninaController().getAllSlike(req, res)
)

nekretninaRouter.route('/getAllTipNekretnine').get(
    (req, res)=>new NekretninaController().getAllTipNekretnine(req, res)
)

nekretninaRouter.route('/getAllSlikeSadrzi').get(
    (req, res)=>new NekretninaController().getAllSlikeSadrzi(req, res)
)

nekretninaRouter.route('/dodajNekretninu').post(
    (req, res)=>new NekretninaController().dodajNekretninu(req, res)
)

nekretninaRouter.route('/dodajSliku').post(
    (req, res)=>new NekretninaController().dodajSliku(req, res)
)


nekretninaRouter.route('/promeniNesto').post(
    (req, res)=>new NekretninaController().promeniNesto(req, res)
)

nekretninaRouter.route('/dodajSlikuSadrzi').post(
    (req, res)=>new NekretninaController().dodajSlikuSadrzi(req, res)
)


export default nekretninaRouter;