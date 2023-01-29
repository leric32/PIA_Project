import express from 'express'
import agencija from '../models/agencija';
import Agencija from '../models/agencija';

export class AgencijaController{
    getAll = (req: express.Request, res: express.Response)=>{
        Agencija.find({}, (err, a)=>{
            if(err) console.log(err);
            else res.json(a)
        })
    }

    dodajAgenciju = (req: express.Request, res: express.Response)=>{
        let a = new Agencija({idA: req.body.idA, naziv: req.body.naziv,
                adresa: req.body.adresa, grad: req.body.grad, telefon: req.body.telefon, PIB: req.body.PIB})
                console.log(a);
        a.save().then(agencija=>{
            res.status(200).json({'message': 'uneta agencija'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

 

   
    
}