import * as express from 'express';
import omiljene from '../models/omiljene';
import User from '../models/user'

export class UserController{
    login = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        User.findOne({'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }


    promeniNesto=(req: express.Request, res: express.Response)=>{
        let sta = req.body.sta;
        let novo = req.body.novo;
        let korisnicko_ime = req.body.korisnicko_ime
        console.log(req.body)
        switch(sta){
            case "odobren": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"odobren": novo}});break;
            case "lozinka": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"lozinka": novo}});break;
            case "korisnicko_ime": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"korisnicko_ime": novo}});break;
            case "ime": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"ime": novo}});break;
            case "prezime": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"prezime": novo}});break;
            case "tip": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"tip": novo}});break;
            case "telefon": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"telefon": novo}});break;
            case "agencija": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"agencija": novo}});break;
            case "grad": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"grad": novo}});break;
            case "datum_rodjenja": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"datum_rodjenja": novo}});break;
            case "email": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"email": novo}});break;
            case "br": User.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"br": novo}});break;
        }
        
        res.json({'message': 'Uspesno izmenjen korisnik'});
    }



    getAll = (req: express.Request, res: express.Response)=>{
        User.find({}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k)
        })
    }

    getAllOmiljene = (req: express.Request, res: express.Response)=>{
        omiljene.find({}, (err, o)=>{
            if(err) console.log(err);
            else res.json(o)
        })
    }

    getAllOmiljeneZa = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;

        omiljene.findOne({'korisnicko_ime': korisnicko_ime}, (err, o)=>{
            if(err) console.log(err);
            else res.json(o);
            console.log(o)
        })
    }

    dodajOmiljenuZa=(req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let nekretnine=req.body.nekretnine;
        omiljene.collection.updateOne({'korisnicko_ime': korisnicko_ime}, {$set: {"nekretnine": nekretnine}})
        
        res.json({'message': 'Uspesno izmenjen omiljen'});
    }

    dodajOmiljenu=(req: express.Request, res: express.Response)=>{
        let omiljena=new omiljene({korisnicko_ime:req.body.korisnicko_ime, nekretnine:req.body.nekretnine})
        omiljena.save().then(omiljene=>{
            res.status(200).json({'message': 'unet omiljen reg'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }



    register = (req: express.Request, res: express.Response)=>{
        let user = new User({ime: req.body.ime, prezime: req.body.prezime,
                korisnicko_ime: req.body.korisnicko_ime, lozinka: req.body.lozinka, grad: req.body.grad, datum_rodjenja: req.body.datum_rodjenja, telefon: req.body.telefon,
                email: req.body.email, tip: req.body.tip, agencija: req.body.agencija, br: req.body.br, slika: req.body.slika, odobren: req.body.odobren })
        user.save().then(user=>{
            res.status(200).json({'message': 'unet korisnik reg'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }
}