"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/register').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/dodajOmiljenu').post((req, res) => new user_controller_1.UserController().dodajOmiljenu(req, res));
userRouter.route('/promeniNesto').post((req, res) => new user_controller_1.UserController().promeniNesto(req, res));
userRouter.route('/dodajOmiljenuZa').post((req, res) => new user_controller_1.UserController().dodajOmiljenuZa(req, res));
userRouter.route('/getAllOmiljene').get((req, res) => new user_controller_1.UserController().getAllOmiljene(req, res));
userRouter.route('/getAllOmiljeneZa').post((req, res) => new user_controller_1.UserController().getAllOmiljeneZa(req, res));
userRouter.route('/getAll').get((req, res) => new user_controller_1.UserController().getAll(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map