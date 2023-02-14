import * as express from 'express';
import Workshop from '../models/workshop';
import User from '../models/user'
import workshop from '../models/workshop';
import Comment from '../models/comment';
import Like from '../models/like';

export class WorkshopController {
    
    hi = (req: express.Request, res: express.Response) => {

        let w = new Workshop({
            "datum":  new Date()
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
                        Workshop.findOneAndDelete({'naziv': naziv}, (err, workshops) => {
                            if (err) console.log(err);
                            else {res.json({ msg: 'OK' })}
                        })
                    }
                })
            }
        })

    }

    getAllForUser = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({'prihvaceni': korisnicko_ime, 'datum': {$lt: new Date()}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    getAllForUser2 = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({'prihvaceni': korisnicko_ime, 'datum': {$gt: new Date()}}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

    getAllForUser3 = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.find({'datum': {$gt: new Date()}}, (err, workshops) => {
            if (err) console.log(err);
            else {
                console.log(workshops)

                let arr = workshops;
                if(arr != null){
                    for( var i = 0; i < arr.length; i++){ 
                                   
                        if ( arr[i].prihvaceni.includes(korisnicko_ime)) { 
                            arr.splice(i, 1); 
                            i--; 
                        }
                    }
                }
                console.log(workshops)

                res.json(workshops)
            }
        })

    }

    getLikes = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Like.find({'ucesnik': korisnicko_ime}, (err, likes) => {
            if (err) console.log(err);
            else res.json(likes)
        })

    }

    getComments = (req: express.Request, res: express.Response) => {

        let korisnicko_ime = req.body.korisnicko_ime;

        Comment.find({'ucesnik': korisnicko_ime}, (err, likes) => {
            if (err) console.log(err);
            else res.json(likes)
        })

    }

    deleteLike =  (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;

        Like.findOneAndDelete({'ucesnik': ucesnik, 'radionica': radionica}, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    deleteComment =  (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;

        Comment.findOneAndDelete({'ucesnik': ucesnik, 'radionica': radionica}, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    updateComment =  (req: express.Request, res: express.Response) => {

        let ucesnik = req.body.ucesnik;
        let radionica = req.body.radionica;
        let komentar = req.body.komentar;

        Comment.findOneAndUpdate({'ucesnik': ucesnik, 'radionica': radionica}, {$set: {'komentar': komentar}}, (err, likes) => {
            if (err) console.log(err);
            else res.json({ msg: 'OK' })
        })

    }

    povuciPrijavu = (req: express.Request, res: express.Response) => {

        let naziv = req.body.naziv;
        let korisnicko_ime = req.body.korisnicko_ime;

        Workshop.findOne({'naziv': naziv}, (err, w) => {
            if (err) console.log(err);
            else {
                let arr = w.prihvaceni;
                if(arr != null){
                    for( var i = 0; i < arr.length; i++){ 
                                   
                        if ( arr[i] == korisnicko_ime) { 
                            arr.splice(i, 1); 
                            i--; 
                        }
                    }
                }

                Workshop.findOneAndUpdate({'naziv': naziv}, {$set: {'prihvaceni': arr}, $inc: {'zauzeto': -1}}, (err, w) => {
                    res.json({ msg: 'OK' })
                })
            }
        })

    }

}