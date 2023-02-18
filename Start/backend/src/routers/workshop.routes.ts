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

workshopRouter.route('/getAllForUser4').get(
    (req, res)=>new WorkshopController().getAllForUser4(req, res)
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

workshopRouter.route('/addPart').post(
    (req, res)=>new WorkshopController().addPart(req, res)
)

workshopRouter.route('/alreadyPart').post(
    (req, res)=>new WorkshopController().alreadyPart(req, res)
)

workshopRouter.route('/hastPastWorkshop').post(
    (req, res)=>new WorkshopController().hastPastWorkshop(req, res)
)
workshopRouter.route('/getLikesForWorkshop').post(
    (req, res)=>new WorkshopController().getLikesForWorkshop(req, res)
)
workshopRouter.route('/getCommentsForWorkshop').post(
    (req, res)=>new WorkshopController().getCommentsForWorkshop(req, res)
)

workshopRouter.route('/addComment').post(
    (req, res)=>new WorkshopController().addComment(req, res)
)

workshopRouter.route('/addLike').post(
    (req, res)=>new WorkshopController().addLike(req, res)
)

workshopRouter.route('/update').post(
    (req, res)=>new WorkshopController().update(req, res)
)

workshopRouter.route('/changeStatus').post(
    (req, res)=>new WorkshopController().changeStatus(req, res)
)

workshopRouter.route('/getAllMessagesForUser').post(
    (req, res)=>new WorkshopController().getAllMessagesForUser(req, res)
)

workshopRouter.route('/getOneWorkshop').post(
    (req, res)=>new WorkshopController().getOneWorkshop(req, res)
)

workshopRouter.route('/getWorkshopById').post(
    (req, res)=>new WorkshopController().getWorkshopById(req, res)
)

workshopRouter.route('/sendMsg').post(
    (req, res)=>new WorkshopController().sendMsg(req, res)
)

workshopRouter.route('/getActiveWorkshops').get(
    (req, res)=>new WorkshopController().getActiveWorkshops(req, res)
)

workshopRouter.route('/searchWorkshops').get(
    (req, res)=>new WorkshopController().searchWorkshops(req, res)
)

workshopRouter.route('/searchTopWorkshop').get(
    (req, res)=>new WorkshopController().searchTopWorkshop(req, res)
)
export default workshopRouter;