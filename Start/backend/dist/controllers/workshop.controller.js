"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopController = void 0;
const workshop_1 = __importDefault(require("../models/workshop"));
const user_1 = __importDefault(require("../models/user"));
const comment_1 = __importDefault(require("../models/comment"));
const like_1 = __importDefault(require("../models/like"));
const mongodb_1 = require("mongodb");
const message_1 = __importDefault(require("../models/message"));
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
        this.getAllForUser4 = (req, res) => {
            workshop_1.default.find({ 'status': 'pending' }, (err, workshops) => {
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
                    // console.log(workshops)
                    let arr = workshops;
                    if (arr != null) {
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] != null && arr[i].prihvaceni.includes(korisnicko_ime)) {
                                arr.splice(i, 1);
                                i--;
                            }
                        }
                    }
                    //console.log(workshops)
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
        this.getOneWorkshop = (req, res) => {
            let naziv = req.body.naziv;
            workshop_1.default.findOne({ 'naziv': naziv }, (err, w) => {
                if (err)
                    console.log(err);
                else
                    res.json(w);
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
                    //dodaj za mailove
                    let arr2 = w.cekaju;
                    if (arr2 != null && w.mesta == w.zauzeto) {
                        for (var i = 0; i < arr2.length; i++) {
                            user_1.default.findOne({ 'korisnicko_ime': arr2[i] }, (err, user) => {
                                if (err)
                                    console.log(err);
                                else {
                                    //send emails
                                    const nodemailer = require('nodemailer');
                                    var transporter = nodemailer.createTransport({
                                        service: 'hotmail',
                                        auth: {
                                            user: 'le_pia@outlook.com',
                                            pass: 'mixipeder123'
                                        }
                                    });
                                    var mailOptions = {
                                        from: 'le_pia@outlook.com',
                                        to: user.email,
                                        subject: 'Oslobadjanje mesta na radionici',
                                        text: "Postavani, obavetsavamo Vas da je oslobodjeno mesto na radionici "
                                            + naziv + " i da mozete da se priajvite na nju."
                                    };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent: ' + info.response);
                                            res.json({ msg: 'OK' });
                                        }
                                    });
                                }
                            });
                        }
                        arr2 = new Array();
                    }
                    workshop_1.default.findOneAndUpdate({ 'naziv': naziv }, { $set: { 'prihvaceni': arr, 'cekaju': arr2 }, $inc: { 'zauzeto': -1 } }, (err, w) => {
                        res.json({ msg: 'OK' });
                    });
                }
            });
        };
        this.addPart = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.findOne({ 'naziv': naziv }, (err, w) => {
                if (err)
                    console.log(err);
                else {
                    let arr = w.cekaju;
                    arr.push(korisnicko_ime);
                    workshop_1.default.findOneAndUpdate({ 'naziv': naziv }, { $set: { 'cekaju': arr } }, (err, w) => {
                        res.json({ msg: 'OK' });
                    });
                }
            });
        };
        this.alreadyPart = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.findOne({ 'naziv': naziv, 'cekaju': korisnicko_ime }, (err, w) => {
                if (err)
                    console.log(err);
                else {
                    if (w) {
                        res.json({ msg: 'OK' });
                    }
                    else {
                        res.json({ msg: 'NO' });
                    }
                }
            });
        };
        this.hastPastWorkshop = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            workshop_1.default.findOne({ 'naziv': naziv, 'prihvaceni': korisnicko_ime, 'datum': { $lt: new Date() } }, (err, w) => {
                if (err)
                    console.log(err);
                else {
                    if (w) {
                        res.json({ msg: 'OK' });
                    }
                    else {
                        res.json({ msg: 'NO' });
                    }
                }
            });
        };
        this.getLikesForWorkshop = (req, res) => {
            let naziv = req.body.naziv;
            like_1.default.find({ 'radionica': naziv }, (err, w) => {
                if (err)
                    console.log(err);
                else
                    res.json(w);
            });
        };
        this.getCommentsForWorkshop = (req, res) => {
            let naziv = req.body.naziv;
            comment_1.default.find({ 'radionica': naziv }, (err, w) => {
                if (err)
                    console.log(err);
                else
                    res.json(w);
            });
        };
        this.addLike = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            let l = new like_1.default({ ucesnik: korisnicko_ime, radionica: naziv });
            l.save().then(like => {
                res.status(200).json({ msg: 'OK' });
            }).catch(err => {
                res.json({ msg: 'ERROR' });
            });
        };
        this.addComment = (req, res) => {
            let naziv = req.body.naziv;
            let korisnicko_ime = req.body.korisnicko_ime;
            let komentar = req.body.komentar;
            let c = new comment_1.default({ ucesnik: korisnicko_ime, radionica: naziv, komentar: komentar, datum: new Date });
            c.save().then(comment => {
                res.status(200).json({ msg: 'OK' });
            }).catch(err => {
                res.json({ msg: 'ERROR' });
            });
        };
        this.update = (req, res) => {
            let _id = req.body._id;
            let idTmp = new mongodb_1.ObjectId(_id);
            workshop_1.default.findOneAndUpdate({ '_id': idTmp }, {
                $set: {
                    'naziv': req.body.naziv,
                    'organizator': req.body.organizator,
                    'mesto': req.body.mesto,
                    'kratak_opis': req.body.kratak_opis,
                    'duzi_opis': req.body.duzi_opis,
                    'datum': req.body.datum,
                    'mesta': req.body.mesta,
                    'zauzeto': req.body.zauzeto,
                    'slika0': req.body.slika0,
                    'slike': req.body.slike,
                    'prihvaceni': req.body.prihvaceni,
                    'cekaju': req.body.cekaju,
                    'status': req.body.status
                }
            }, (err, succ) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "OK" });
            });
        };
        this.changeStatus = (req, res) => {
            let _id = req.body._id;
            let idTmp = new mongodb_1.ObjectId(_id);
            workshop_1.default.findOneAndUpdate({ '_id': idTmp }, {
                $set: {
                    'status': 'aktivan'
                }
            }, (err, succ) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "OK" });
            });
        };
        this.getWorkshopById = (req, res) => {
            let _id = req.body._id;
            let idTmp = new mongodb_1.ObjectId(_id);
            workshop_1.default.findOne({ '_id': idTmp }, (err, ws) => {
                if (err)
                    console.log(err);
                else
                    res.json(ws);
            });
        };
        this.getAllMessagesForUser = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            message_1.default.find({ 'to': korisnicko_ime }, (err, m) => {
                if (err)
                    console.log(err);
                else {
                    let mTmp = m;
                    message_1.default.find({ 'from': korisnicko_ime }, (err, m2) => {
                        if (err)
                            console.log(err);
                        else {
                            let mTmp2 = m2;
                            let resTmp = mTmp2.concat(mTmp);
                            //console.log(resTmp)
                            res.json(resTmp);
                        }
                    });
                }
            });
        };
        this.sendMsg = (req, res) => {
            let m = new message_1.default(req.body);
            m.save().then(user => {
                res.status(200).json({ msg: 'OK', 'mes': m });
            }).catch(err => {
                res.json({ msg: 'ERROR' });
            });
        };
        this.getActiveWorkshops = (req, res) => {
            workshop_1.default.find({ 'status': 'aktivan' }, (err, workshops) => {
                if (err)
                    console.log(err);
                else
                    res.json(workshops);
            });
        };
        this.searchWorkshops = (req, res) => {
            let naziv = req.body.naziv;
            let mesto = req.body.mesto;
            workshop_1.default.find({ 'naziv': naziv, 'mesto': mesto }, (err, ws) => {
                if (err)
                    console.log(err);
                else
                    res.json(ws);
            });
        };
        this.searchTopWorkshop = (req, res) => {
            workshop_1.default.find((err, ws) => {
                if (err)
                    console.log(err);
                else {
                    let wsTmp = ws;
                    let pTmp = [];
                    wsTmp.forEach(w => {
                        like_1.default.find({ 'radionica': w.naziv }, (err, ls) => {
                            console.log(ls.length);
                            w.brojLajkova = ls.length;
                            pTmp.push({ 'rad': wsTmp, 'brojL': ls.leng });
                        });
                    });
                    console.log(pTmp);
                    res.json(pTmp);
                }
            });
        };
    }
}
exports.WorkshopController = WorkshopController;
//# sourceMappingURL=workshop.controller.js.map