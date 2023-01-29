import express from 'express'
import ulica from '../models/ulica';
import ulica_pripada from '../models/ulica_pripada';

export class UlicaController{
    getAll = (req: express.Request, res: express.Response)=>{
        ulica.find({}, (err, u)=>{
            if(err) console.log(err);
            else res.json(u)
        })
    }

    getAllPripadaUlica = (req: express.Request, res: express.Response)=>{
        ulica_pripada.find({"idU":req.body.idM}, (err, u)=>{
            if(err) console.log(err);
            else res.json(u)
        })
    }

    getAllPripada = (req: express.Request, res: express.Response)=>{
        ulica_pripada.find({}, (err, u)=>{
            if(err) console.log(err);
            else res.json(u)
        })
    }

    dodajUlicu = (req: express.Request, res: express.Response)=>{
        let u = new ulica({idU: req.body.idU, naziv: req.body.naziv})
        u.save().then(ulica=>{
            res.status(200).json({'message': 'uneta ulica'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    dodajUlicaPripada = (req: express.Request, res: express.Response)=>{
        let u= new ulica_pripada({idU: req.body.idU, idM: req.body.idM})
        u.save().then(ulica_pripada=>{
            res.status(200).json({'message': 'uneta ulicapripada'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

 

   
    
}