import express from 'express';
import user from '../models/user';
import { UserController } from '../controllers/user.controller';
import { WorkshopController } from '../controllers/workshop.controller';
const workshopRouter = express.Router();

workshopRouter.route('/hi').get(
    (req, res)=>new WorkshopController().hi(req, res)
)

workshopRouter.route('/insert').post(
    (req, res)=>new WorkshopController().insert(req, res)
)

workshopRouter.route('/getAll').get(
    (req, res)=>new WorkshopController().getAll(req, res)
)

workshopRouter.route('/deleteAllCommentsAndLikes').post(
    (req, res)=>new WorkshopController().deleteAllCommentsAndLikes(req, res)
)

workshopRouter.route('/getAllForUser').post(
    (req, res)=>new WorkshopController().getAllForUser(req, res)
)

export default workshopRouter;