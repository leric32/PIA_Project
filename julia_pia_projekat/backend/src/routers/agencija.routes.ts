import express from 'express';
import { AgencijaController } from '../controllers/agencija.controller';

const agencijaRouter = express.Router();

agencijaRouter.route('/getAll').get(
    (req, res)=>new AgencijaController().getAll(req, res)
)
agencijaRouter.route('/dodajAgenciju').post(
    (req, res)=>new AgencijaController().dodajAgenciju(req, res)
)


export default agencijaRouter;