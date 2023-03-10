"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            user_1.default.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.mail = (req, res) => {
            let email = req.body.email;
            let token = Math.random.toString().slice(2, 7);
            let d = new Date;
            user_1.default.findOneAndUpdate({ "email": email }, {
                $set: {
                    'token': token,
                    'token_date': d
                }
            }, (err, succ) => {
                if (err)
                    console.log(err);
                else {
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
                        to: email,
                        subject: 'Reset Password',
                        text: "http://localhost:4200/reset_password/" + token
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
        };
        this.register = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            user_1.default.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, user) => {
                if (err)
                    console.log(err);
                else {
                    if (user != null) {
                        res.json({ msg: 'ki' });
                    }
                    else {
                        let email = req.body.email;
                        user_1.default.findOne({ 'email': email }, (err, user) => {
                            if (err)
                                console.log(err);
                            else {
                                if (user != null) {
                                    res.json({ msg: 'em' });
                                }
                                else {
                                    let u = new user_1.default(req.body);
                                    //console.log(u)
                                    u.save().then(user => {
                                        res.status(200).json({ msg: 'OK' });
                                    }).catch(err => {
                                        res.json({ msg: 'ERROR' });
                                    });
                                }
                            }
                        });
                    }
                }
            });
        };
        this.getAllExceptAdmins = (req, res) => {
            user_1.default.find({ 'tip': ["ucesnik", "organizator"] }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.delete = (req, res) => {
            user_1.default.deleteOne({ 'tip': ["ucesnik", "organizator"] }, (err, users) => {
                if (err)
                    console.log(err);
                else
                    res.json(users);
            });
        };
        this.update = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let rki = req.body.rki;
            // User.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, user) => {
            //     if (err) console.log(err);
            //     else {
            //         if (user != null) {
            //             res.json({ msg: 'ki' })
            //         }
            //         else {
            //             let email = req.body.email;
            //             User.findOne({ 'email': email }, (err, user) => {
            //                 if (err) console.log(err);
            //                 else {
            //                     if (user != null) {
            //                         res.json({ msg: 'em' })
            //                     }
            //                     else {
            user_1.default.findOneAndUpdate({ 'korisnicko_ime': rki }, {
                $set: {
                    'ime': req.body.ime,
                    'prezime': req.body.prezime,
                    'korisnicko_ime': req.body.korisnicko_ime,
                    'lozinka': req.body.lozinka,
                    'tel': req.body.tel,
                    'email': req.body.email,
                    'tip': req.body.tip,
                    'organizacija': req.body.organizacija,
                    'adresa_org': req.body.adresa_org,
                    'broj_org': req.body.broj_org,
                    'slika': req.body.slika
                }
            }, (err, succ) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "OK" });
            });
            //                     }
            //                 }
            //             })
            //         }
            //     }
            // })
        };
        this.approve = (req, res) => {
            user_1.default.findOneAndUpdate({ 'korisnicko_ime': req.body.korisnicko_ime }, {
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
        this.decline = (req, res) => {
            user_1.default.findOneAndUpdate({ 'korisnicko_ime': req.body.korisnicko_ime }, {
                $set: {
                    'status': 'neaktivan'
                }
            }, (err, succ) => {
                if (err)
                    console.log(err);
                else
                    res.json({ msg: "OK" });
            });
        };
        this.getOne = (req, res) => {
            user_1.default.findOne({ 'token': req.body.token }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.getOneByName = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            user_1.default.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, user) => {
                if (err)
                    console.log(err);
                else
                    res.json(user);
            });
        };
        this.sendCancelationEmail = (req, res) => {
            let email = req.body.email;
            let naziv = req.body.naziv;
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
                to: email,
                subject: 'Otkazivanje radionice',
                text: "Postavani, obavetsavamo Vas da je radionica " + naziv + " otkazana."
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
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map