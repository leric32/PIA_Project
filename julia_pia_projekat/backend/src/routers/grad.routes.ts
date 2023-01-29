import express from 'express';
import { GradController } from '../controllers/grad.controller';

const gradRouter = express.Router();

gradRouter.route('/getAll').get(
    (req, res)=>new GradController().getAll(req, res)
)

gradRouter.route('/getAllOpstine').get(
    (req, res)=>new GradController().getAllOpstine(req, res)
)

gradRouter.route('/getAllOpstineGrad').get(
    (req, res)=>new GradController().getAllOpstineGrad(req, res)
)


export default gradRouter;