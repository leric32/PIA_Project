"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
const comment_1 = __importDefault(require("../models/comment"));
const like_1 = __importDefault(require("../models/like"));
class WorkshopController {
    constructor() {
        this.hi = (req, res) => {
            let w = new workshop_1.default({
                "datum": new Date()
            });
            //console.log(u)
            w.save().then(user => {
                res.status(200).json({ msg: 'OK' });
            }).catch(err => {
                res.json({ msg: 'ERROR' });
            });
        };
        this.insert = (req, res) => {
            let w = new workshop_1.default(req.body);
            w.save().then(user => {
                res.status(200).json({ msg: 'OK' });
            }).catch(err => {
                res.json({ msg: 'ERROR' });
            });
        };
        this.getAll = (req, res) => {
            workshop_1.default.find((err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.deleteAllCommentsAndLikes = (req, res) => {
            let naziv = req.body.naziv;
            comment_1.default.deleteMany({ 'radionica': naziv }, (err, workshops) => {
                if (err)
                    console.log(err);
                else {
                    like_1.default.deleteMany({ 'radionica': naziv }, (err, workshops) => {
                        if (err)
                            console.log(err);
                        else {
                            workshop_1.default.findOneAndDelete({ 'naziv': naziv }, (err, workshops) => {
                                if (err)
                                    console.log(err);
                                else {
                                    res.json({ msg: 'OK' });
                                }
                            });
                        }
                    });
                }
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map