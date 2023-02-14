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

workshopRouter.route('/getAllForUser2').post(
    (req, res)=>new WorkshopController().getAllForUser2(req, res)
)

workshopRouter.route('/getAllForUser3').post(
    (req, res)=>new WorkshopController().getAllForUser3(req, res)
)

workshopRouter.route('/getComments').post(
    (req, res)=>new WorkshopController().getComments(req, res)
)

workshopRouter.route('/getLikes').post(
    (req, res)=>new WorkshopController().getLikes(req, res)
)

workshopRouter.route('/deleteLike').post(
    (req, res)=>new WorkshopController().deleteLike(req, res)
)

workshopRouter.route('/deleteComment').post(
    (req, res)=>new WorkshopController().deleteComment(req, res)
)

workshopRouter.route('/updateComment').post(
    (req, res)=>new WorkshopController().updateComment(req, res)
)

workshopRouter.route('/povuciPrijavu').post(
    (req, res)=>new WorkshopController().povuciPrijavu(req, res)
)
export default workshopRouter;