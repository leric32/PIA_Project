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
        this.getAllForUser = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.find({ 'prihvaceni': korisnicko_ime, 'datum': { $lt: new Date() } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllForUser2 = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.find({ 'prihvaceni': korisnicko_ime, 'datum': { $gt: new Date() } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.getAllForUser3 = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.find({ 'datum': { $gt: new Date() } }, (err, workshops) => {
                if (err)
                    console.log(err);
                else {
                    console.log(workshops);
                    let arr = workshops;
                    if (arr != null) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].prihvaceni.includes(korisnicko_ime)) {
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    console.log(workshops);
                    res.json(workshops);
                }
            });
        };
        this.getLikes = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            like_1.default.find({ 'ucesnik': korisnicko_ime }, (err, likes) => {
                if (err)
                    console.log(err);
                else
                    res.json(likes);
            });
        };
        this.getComments = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            comment_1.default.find({ 'ucesnik': korisnicko_ime }, (err, likes) => {
                if (err)
                    console.log(err);
                else
                    res.json(likes);
            });
        };
        this.deleteLike = (req, res) => {
            let ucesnik = req.body.ucesnik;
            let radionica = req.body.radionica;
            like_1.default.findOneAndDelete({ 'ucesnik': ucesnik, 'radionica': radionica }, (err, likes) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: 'OK' });
            });
        };
        this.deleteComment = (req, res) => {
            let ucesnik = req.body.ucesnik;
            let radionica = req.body.radionica;
            comment_1.default.findOneAndDelete({ 'ucesnik': ucesnik, 'radionica': radionica }, (err, likes) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: 'OK' });
            });
        };
        this.updateComment = (req, res) => {
            let ucesnik = req.body.ucesnik;
            let radionica = req.body.radionica;
            let komentar = req.body.komentar;
            comment_1.default.findOneAndUpdate({ 'ucesnik': ucesnik, 'radionica': radionica }, { $set: { 'komentar': komentar } }, (err, likes) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: 'OK' });
            });
        };
        this.povuciPrijavu = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.findOne({ 'naziv': naziv }, (err, w) => {
                if (err)
                    console.log(err);
                else {
                    let arr = w.prihvaceni;
                    if (arr != null) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] == korisnicko_ime) {
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    workshop_1.default.findOneAndUpdate({ 'naziv': naziv }, { $set: { 'prihvaceni': arr }, $inc: { 'zauzeto': -1 } }, (err, w) => {
                        res.json({ msg: 'OK' });
                    });
                }
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map