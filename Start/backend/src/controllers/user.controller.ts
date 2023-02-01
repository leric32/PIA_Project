import * as express from 'express';
import User from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        User.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, (err, user) => {
            if (err) console.log(err);
            else res.json(user)
        })
    }

    mail = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

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
            to: 'aanamaksimovic9@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'Uradi bre is2 projkeat'
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

    register = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime

        User.findOne({ 'korisnicko_ime': korisnicko_ime }, (err, user) => {
            if (err) console.log(err);
            else {
                if (user != null) {
                    res.json({ msg: 'ki' })
                }
                else {
                    let email = req.body.email;
                    User.findOne({ 'email': email }, (err, user) => {
                        if (err) console.log(err);
                        else {
                            if (user != null) {
                                res.json({ msg: 'em' })
                            }
                            else {
                                let u = new User(req.body)

                                //console.log(u)

                                u.save().then(user => {
                                    res.status(200).json({ msg: 'OK' });
                                }).catch(err => {
                                    res.json({ msg: 'ERROR' })
                                })
                            }
                        }
                    })

                }
            }
        })

    }


    getAllExceptAdmins = (req: express.Request, res: express.Response) => {
        User.find({ 'tip': ["ucesnik", "organizator"] }, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })

    }

    delete = (req: express.Request, res: express.Response) => {

        User.deleteOne({ 'tip': ["ucesnik", "organizator"] }, (err, users) => {
            if (err) console.log(err);
            else res.json(users)
        })

    }

    update = (req: express.Request, res: express.Response) => {

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

        User.findOneAndUpdate({ 'korisnicko_ime': rki }, {
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
                'broj_org': req.body.broj_org
            }
        }, ( err, succ )=> {
            if(err) console.log(err);
            else res.json({ msg: "OK" });
        })

        //                     }
        //                 }
        //             })

        //         }
        //     }
        // })

    }

    approve = (req: express.Request, res: express.Response) => {

        User.findOneAndUpdate({ 'korisnicko_ime': req.body.korisnicko_ime }, {
            $set: {
                'status': 'aktivan'
            }
        }, ( err, succ )=> {
            if(err) console.log(err);
            else res.json({ msg: "OK" });
        })

    }

    decline = (req: express.Request, res: express.Response) => {

        User.findOneAndUpdate({ 'korisnicko_ime': req.body.korisnicko_ime }, {
            $set: {
                'status': 'neaktivan'
            }
        }, ( err, succ )=> {
            if(err) console.log(err);
            else res.json({ msg: "OK" });
        })

    }

}