"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grad_controller_1 = require("../controllers/grad.controller");
const gradRouter = express_1.default.Router();
gradRouter.route('/getAll').get((req, res) => new grad_controller_1.GradController().getAll(req, res));
gradRouter.route('/getAllOpstine').get((req, res) => new grad_controller_1.GradController().getAllOpstine(req, res));
gradRouter.route('/getAllOpstineGrad').get((req, res) => new grad_controller_1.GradController().getAllOpstineGrad(req, res));
exports.default = gradRouter;
//# sourceMappingURL=grad.routes.js.map