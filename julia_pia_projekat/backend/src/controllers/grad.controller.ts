import express from 'express'
import opstina from '../models/opstina';
import Grad from '../models/grad';

export class GradController{
    getAll = (req: express.Request, res: express.Response)=>{
        Grad.find({}, (err, g)=>{
            if(err) console.log(err);
            else res.json(g)
        })
    }

    getAllOpstine = (req: express.Request, res: express.Response)=>{
        opstina.find({}, (err, g)=>{
            if(err) console.log(err);
            else res.json(g)
        })
    }

    getAllOpstineGrad = (req: express.Request, res: express.Response)=>{
        opstina.find({"idG":req.body.idG}, (err, g)=>{
            if(err) console.log(err);
            else res.json(g)
            console.log(g)
        })
    }

 

   
    
}