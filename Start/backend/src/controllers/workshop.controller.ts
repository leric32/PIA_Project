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

        Workshop.find({'prihvaceni': korisnicko_ime}, (err, workshops) => {
            if (err) console.log(err);
            else res.json(workshops)
        })

    }

}