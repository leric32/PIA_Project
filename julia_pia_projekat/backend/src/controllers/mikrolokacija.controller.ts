import express from 'express'
import mikrolokacija from '../models/mikrolokacija';
import Grad from '../models/grad';
import mikrolok_pripada from '../models/mikrolok_pripada';

export class MikrolokacijaController{
    getAll = (req: express.Request, res: express.Response)=>{
        mikrolokacija.find({}, (err, m)=>{
            if(err) console.log(err);
            else res.json(m)
        })
    }

    getAllPripadaMikro = (req: express.Request, res: express.Response)=>{
        mikrolok_pripada.find({"idM":req.body.idM}, (err, m)=>{
            if(err) console.log(err);
            else res.json(m)
        })
    }

    getAllPripada = (req: express.Request, res: express.Response)=>{
        mikrolok_pripada.find({}, (err, m)=>{
            if(err) console.log(err);
            else res.json(m)
        })
    }

    dodajMikrolokaciju = (req: express.Request, res: express.Response)=>{
        let m = new mikrolokacija({idM: req.body.idM, naziv: req.body.naziv})
        m.save().then(mikrolokacija=>{
            res.status(200).json({'message': 'uneta mikrolokacija'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    dodajMikrolokPripada = (req: express.Request, res: express.Response)=>{
        let m = new mikrolok_pripada({idM: req.body.idM, idO: req.body.idO})
        m.save().then(mikrolok_pripada=>{
            res.status(200).json({'message': 'uneta mikrolokpripada'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    delete = (req: express.Request, res: express.Response)=>{
        let idM = req.body.idM;

        mikrolokacija.collection.deleteOne({'idM': idM}, (err, m)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

 

   
    
}