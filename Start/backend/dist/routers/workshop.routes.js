"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workshop_controller_1 = require("../controllers/workshop.controller");
const workshopRouter = express_1.default.Router();
workshopRouter.route('/hi').get((req, res) => new workshop_controller_1.WorkshopController().hi(req, res));
workshopRouter.route('/insert').post((req, res) => new workshop_controller_1.WorkshopController().insert(req, res));
workshopRouter.route('/getAll').get((req, res) => new workshop_controller_1.WorkshopController().getAll(req, res));
workshopRouter.route('/deleteAllCommentsAndLikes').post((req, res) => new workshop_controller_1.WorkshopController().deleteAllCommentsAndLikes(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.routes.js.map