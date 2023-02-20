import express from 'express';
import user from '../models/user';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/mail').post(
    (req, res)=>new UserController().mail(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/getAllExceptAdmins').get(
    (req, res)=>new UserController().getAllExceptAdmins(req, res)
)

userRouter.route('/delete').post(
    (req, res)=>new UserController().delete(req, res)
)

userRouter.route('/update').post(
    (req, res)=>new UserController().update(req, res)
)

userRouter.route('/approve').post(
    (req, res)=>new UserController().approve(req, res)
)

userRouter.route('/decline').post(
    (req, res)=>new UserController().decline(req, res)
)

userRouter.route('/getOne').post(
    (req, res)=>new UserController().getOne(req, res)
)

userRouter.route('/getOneByName').post(
    (req, res)=>new UserController().getOneByName(req, res)
)

userRouter.route('/sendCancelationEmail').post(
    (req, res)=>new UserController().sendCancelationEmail(req, res)
)

export default userRouter;