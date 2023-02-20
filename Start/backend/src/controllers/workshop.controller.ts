import * as express from 'express';
import Workshop from '../models/workshop';
import User from '../models/user'
import Comment from '../models/comment';
import Like from '../models/like';
import { ObjectId } from 'mongodb';
import Message from '../models/message';

export class WorkshopController {

    hi = (req: express.Request, res: express.Response) => {

        let w = new Workshop({
            "datum": new Date()
        })

        //console.log(u)

        w.save().then(user => {
            res.status(200).json({ msg: 'OK' });
        }).catch(err => {
            res.json({ msg: 'ERROR' })
        })

    }

    insert = (req: express.Request, res: express.Response) => {

        let w = new Workshop(req.body)

        w.save().then(user => {
            res.status(200).json({ msg: 'OK' });
        }).catch(err => {
            res.json({ msg: 'ERROR' })
        })

    }

    getAll = (req: express.Request, res: express.Response) => {
        Workshop.find((err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    deleteAllCommentsAndLikes = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;

        Comment.deleteMany({ 'radionica': naziv }, (err, workshops) => {
            if (err) console.log(err);
            else {
                Like.deleteMany({ 'radionica': naziv }, (err, workshops) => {
                    if (err) console.log(err);
                    else {
                        Workshop.findOneAndDelete({ 'naziv': naziv }, (err, workshops) => {
                            if (err) console.log(err);
                            else { res.json({ msg: 'OK' }) }
                        })
                    }
                })
            }
        })

    }

    getAllForUser = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({ 'prihvaceni': korisnicko_ime, 'datum': { $lt: new Date() } }, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    getAllForUser2 = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({ 'prihvaceni': korisnicko_ime, 'datum': { $gt: new Date() } }, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    getAllForUser4 = (req: express.Request, res: express.Response) => {

        Workshop.find({ 'status': 'pending'}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    getAllForUser3 = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({ 'datum': { $gt: new Date() } }, (err, workshops) => {
            if (err) console.log(err);
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

                res.json(workshops)
            }
        })

    }

    getLikes = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Like.find({ 'ucesnik': korisnicko_ime }, (err, likes) => {
            if (err) console.log(err);
            else res.json(likes)
        })

    }

    getOneWorkshop = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;

        Workshop.findOne({ 'naziv': naziv }, (err, w) => {
            if (err) console.log(err);
            else res.json(w)
        })

    }

    getComments = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Comment.find({ 'ucesnik': korisnicko_ime }, (err, likes) => {
            if (err) console.log(err);
            else res.json(likes)
        })

    }

    deleteLike = (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;

        Like.findOneAndDelete({ 'ucesnik': ucesnik, 'radionica': radionica }, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    deleteComment = (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;

        Comment.findOneAndDelete({ 'ucesnik': ucesnik, 'radionica': radionica }, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    updateComment = (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;
        let komentar = req.body.komentar;

        Comment.findOneAndUpdate({ 'ucesnik': ucesnik, 'radionica': radionica }, { $set: { 'komentar': komentar } }, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    povuciPrijavu = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.findOne({ 'naziv': naziv }, (err, w) => {
            if (err) console.log(err);
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
                        User.findOne({ 'korisnicko_ime': arr2[i] }, (err, user) => {
                            if (err) console.log(err);
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
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        res.json({ msg: 'OK' })
                                    }
                                });
                            }
                        })
                    }
                    arr2 = new Array();
                }

                Workshop.findOneAndUpdate({ 'naziv': naziv }, { $set: { 'prihvaceni': arr, 'cekaju': arr2}, $inc: { 'zauzeto': -1 }}, (err, w) => {
                    res.json({ msg: 'OK' })
                })
            }
        })

    }

    addPart = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.findOne({ 'naziv': naziv }, (err, w) => {
            if (err) console.log(err);
            else {
                let arr = w.cekaju;
                arr.push(korisnicko_ime);

                Workshop.findOneAndUpdate({ 'naziv': naziv }, { $set: { 'cekaju': arr } }, (err, w) => {
                    res.json({ msg: 'OK' })
                })
            }
        })

    }

    alreadyPart = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.findOne({ 'naziv': naziv, 'cekaju': korisnicko_ime }, (err, w) => {
            if (err) console.log(err);
            else {
                if (w) {
                    res.json({ msg: 'OK' })
                } else {
                    res.json({ msg: 'NO' })
                }
            }
        })

    }

    hastPastWorkshop = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.findOne({ 'naziv': naziv, 'prihvaceni': korisnicko_ime, 'datum': { $lt: new Date() } }, (err, w) => {
            if (err) console.log(err);
            else {
                if (w) {
                    res.json({ msg: 'OK' })
                } else {
                    res.json({ msg: 'NO' })
                }
            }
        })

    }

    getLikesForWorkshop = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;

        Like.find({ 'radionica': naziv}, (err, w) => {
            if (err) console.log(err);
            else res.json(w)
        })

    }

    getCommentsForWorkshop = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;

        Comment.find({ 'radionica': naziv}, (err, w) => {
            if (err) console.log(err);
            else res.json(w)
        })

    }

    addLike = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        let l = new Like({ucesnik: korisnicko_ime, radionica: naziv})

        l.save().then(like => {
            res.status(200).json({ msg: 'OK' });
        }).catch(err => {
            res.json({ msg: 'ERROR' })
        })

    }

    addComment = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;
        let komentar = req.body.komentar;

        let c = new Comment({ucesnik: korisnicko_ime, radionica: naziv, komentar: komentar, datum: new Date})

        c.save().then(comment => {
            res.status(200).json({ msg: 'OK' });
        }).catch(err => {
            res.json({ msg: 'ERROR' })
        })

    }


    update = (req: express.Request, res: express.Response) => {

        let _id = req.body._id;

        let idTmp = new ObjectId(_id)

        Workshop.findOneAndUpdate({ '_id': idTmp }, {
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
            if (err) console.log(err);
            else res.json({ msg: "OK" });
        })

    }

    changeStatus = (req: express.Request, res: express.Response) => {

        let _id = req.body._id;

        let idTmp = new ObjectId(_id)

        Workshop.findOneAndUpdate({ '_id': idTmp }, {
            $set: {
                'status': 'aktivan'
            }
        }, (err, succ) => {
            if (err) console.log(err);
            else res.json({ msg: "OK" });
        })

    }

    getWorkshopById = (req: express.Request, res: express.Response) => {

        let _id = req.body._id;

        let idTmp = new ObjectId(_id)

        Workshop.findOne({ '_id': idTmp }, (err, ws) => {
            if (err) console.log(err);
            else res.json(ws);
        })

    }

    getAllMessagesForUser = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Message.find({ 'to': korisnicko_ime }, (err, m) => {
            if (err) console.log(err);
            else {
                let mTmp = m;
                Message.find({ 'from': korisnicko_ime }, (err, m2) => {
                    if (err) console.log(err);
                    else {
                        let mTmp2 = m2;

                        let resTmp = mTmp2.concat(mTmp);
                        //console.log(resTmp)
                        res.json(resTmp)
                    }
                })
            }
        })

    }

    sendMsg = (req: express.Request, res: express.Response) => {

        let m = new Message(req.body)

        m.save().then(user => {
            res.status(200).json({ msg: 'OK' , 'mes': m});
        }).catch(err => {
            res.json({ msg: 'ERROR' })
        })

    }

    getActiveWorkshops = (req: express.Request, res: express.Response) => {

        Workshop.find({ 'status': 'aktivan'}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    searchWorkshops = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let mesto = req.body.mesto;

        Workshop.find({ 'naziv': naziv, 'mesto': mesto }, (err, ws) => {
            if (err) console.log(err);
            else res.json(ws);
        })

    }

    searchTopWorkshop = (req: express.Request, res: express.Response) => {

        Workshop.find((err, ws) => {
            if (err) console.log(err);
            else {

                let wsTmp = ws
                let pTmp = []
                let ind = 0;

                wsTmp.forEach(w =>{
                    Like.find({'radionica': w.naziv},(err, ls) => {
                        console.log(ls.length)
                        w.brojLajkova = ls.length
                        pTmp.push({'rad': wsTmp, 'brojL': ls.leng})
                    })
                })

                //console.log(pTmp)
            }
        })

    }

    getAllMessagesForUserForOneWorkshop =  (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;
        let _idR = req.body._idR;

        Message.find({ 'to': korisnicko_ime, '_idR': _idR }, (err, m) => {
            if (err) console.log(err);
            else {
                let mTmp = m;
                Message.find({ 'from': korisnicko_ime,'_idR': _idR  }, (err, m2) => {
                    if (err) console.log(err);
                    else {
                        let mTmp2 = m2;
                        let resTmp = mTmp2.concat(mTmp);
                        // console.log(resTmp)
                        res.json(resTmp)
                    }
                })
            }
        })

    }

}