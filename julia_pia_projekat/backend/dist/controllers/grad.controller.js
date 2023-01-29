"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradController = void 0;
const opstina_1 = __importDefault(require("../models/opstina"));
const grad_1 = __importDefault(require("../models/grad"));
class GradController {
    constructor() {
        this.getAll = (req, res) => {
            grad_1.default.find({}, (err, g) => {
                if (err)
                    console.log(err);
                else
                    res.json(g);
            });
        };
        this.getAllOpstine = (req, res) => {
            opstina_1.default.find({}, (err, g) => {
                if (err)
                    console.log(err);
                else
                    res.json(g);
            });
        };
        this.getAllOpstineGrad = (req, res) => {
            opstina_1.default.find({ "idG": req.body.idG }, (err, g) => {
                if (err)
                    console.log(err);
                else
                    res.json(g);
                console.log(g);
            });
        };
    }
}
exports.GradController = GradController;
//# sourceMappingURL=grad.controller.js.map