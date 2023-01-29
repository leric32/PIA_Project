import express from 'express';
import user from '../models/user';
import { UserController } from '../controllers/user.controller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>new UserController().login(req, res)
)

userRouter.route('/register').post(
    (req, res)=>new UserController().register(req, res)
)

userRouter.route('/dodajOmiljenu').post(
    (req, res)=>new UserController().dodajOmiljenu(req, res)
)
userRouter.route('/promeniNesto').post(
    (req, res)=>new UserController().promeniNesto(req, res)
)

userRouter.route('/dodajOmiljenuZa').post(
    (req, res)=>new UserController().dodajOmiljenuZa(req, res)
)
userRouter.route('/getAllOmiljene').get(
    (req, res)=>new UserController().getAllOmiljene(req, res)
)
userRouter.route('/getAllOmiljeneZa').post(
    (req, res)=>new UserController().getAllOmiljeneZa(req, res)
)


userRouter.route('/getAll').get(
    (req, res)=>new UserController().getAll(req, res)
)

export default userRouter;