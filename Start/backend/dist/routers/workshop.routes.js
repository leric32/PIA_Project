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
workshopRouter.route('/getAllForUser').post((req, res) => new workshop_controller_1.WorkshopController().getAllForUser(req, res));
workshopRouter.route('/getAllForUser2').post((req, res) => new workshop_controller_1.WorkshopController().getAllForUser2(req, res));
workshopRouter.route('/getAllForUser3').post((req, res) => new workshop_controller_1.WorkshopController().getAllForUser3(req, res));
workshopRouter.route('/getComments').post((req, res) => new workshop_controller_1.WorkshopController().getComments(req, res));
workshopRouter.route('/getLikes').post((req, res) => new workshop_controller_1.WorkshopController().getLikes(req, res));
workshopRouter.route('/deleteLike').post((req, res) => new workshop_controller_1.WorkshopController().deleteLike(req, res));
workshopRouter.route('/deleteComment').post((req, res) => new workshop_controller_1.WorkshopController().deleteComment(req, res));
workshopRouter.route('/updateComment').post((req, res) => new workshop_controller_1.WorkshopController().updateComment(req, res));
workshopRouter.route('/povuciPrijavu').post((req, res) => new workshop_controller_1.WorkshopController().povuciPrijavu(req, res));
exports.default = workshopRouter;
//# sourceMappingURL=workshop.routes.js.map