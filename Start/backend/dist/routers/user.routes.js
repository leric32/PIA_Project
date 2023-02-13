"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/mail').post((req, res) => new user_controller_1.UserController().mail(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/getAllExceptAdmins').get((req, res) => new user_controller_1.UserController().getAllExceptAdmins(req, res));
userRouter.route('/delete').post((req, res) => new user_controller_1.UserController().delete(req, res));
userRouter.route('/update').post((req, res) => new user_controller_1.UserController().update(req, res));
userRouter.route('/approve').post((req, res) => new user_controller_1.UserController().approve(req, res));
userRouter.route('/decline').post((req, res) => new user_controller_1.UserController().decline(req, res));
userRouter.route('/getOne').post((req, res) => new user_controller_1.UserController().getOne(req, res));
userRouter.route('/getOneByName').post((req, res) => new user_controller_1.UserController().getOneByName(req, res));
userRouter.route('/sendCancelationEmail').post((req, res) => new user_controller_1.UserController().sendCancelationEmail(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map