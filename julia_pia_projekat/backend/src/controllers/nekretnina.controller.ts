import express from 'express'
import slika_sadrzi from '../models/slika_sadrzi';
import Nekretnina from '../models/nekretnina';
import slika from '../models/slika';
import tip_nekretnine from '../models/tip_nekretnine';
import linija from '../models/linija';
import agencija from '../models/agencija';
export class NekretninaController{
    getAll = (req: express.Request, res: express.Response)=>{
        Nekretnina.find({}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n)
        })
    }

    getAllLinije = (req: express.Request, res: express.Response)=>{
        linija.find({}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n)
        })
    }

    getAllTipNekretnine = (req: express.Request, res: express.Response)=>{
        tip_nekretnine.find({}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n)
        })
    }

    getAllSlike = (req: express.Request, res: express.Response)=>{
        slika.find({}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n)
        })
    }

    getAllSlikeSadrzi = (req: express.Request, res: express.Response)=>{
        slika_sadrzi.find({}, (err, n)=>{
            if(err) console.log(err);
            else res.json(n)
        })
    }


    dodajNekretninu = (req: express.Request, res: express.Response)=>{
        let n = new Nekretnina(req.body)
        n.save().then(Nekretnina=>{
            res.status(200).json({'message': 'uneta nekretnina'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    dodajSliku = (req: express.Request, res: express.Response)=>{
        let s = new slika(req.body)
        s.save().then(slika=>{
            res.status(200).json({'message': 'uneta slika'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    dodajSlikuSadrzi = (req: express.Request, res: express.Response)=>{
        let ss = new slika_sadrzi(req.body)
        ss.save().then(slika_sadrzi=>{
            res.status(200).json({'message': 'uneta slikasadrzi'});
        }).catch(err=>{
            res.status(400).json({'message': 'error'})
        })
    }

    promeniNesto=(req: express.Request, res: express.Response)=>{
        let sta = req.body.sta;
        let novo = req.body.novo;
        let idN = req.body.idN
        switch(sta){
            case "naziv": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"naziv": novo}});break;
            case "tip_nekretnine": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"tip_nekretnine": novo}});break;
            case "grad": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"grad": novo}});break;
            case "opstina": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"opstina": novo}});break;
            case "mikrolokacija": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"mikrolokacija": novo}});break;
            case "ulica": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"ulica": novo}});break;
            case "kvadratura": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"kvadratura": novo}});break;
            case "broj_soba": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"broj_soba": novo}});break;
            case "cena": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"cena": novo}});break;
            case "godina": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"godina": novo}});break;
            case "stanje": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"stanje": novo}});break;
            case "tip_grejanja": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"tip_grejanja": novo}});break;
            case "sprat": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"sprat": novo}});break;
            case "max_sprat": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"max_sprat": novo}});break;
            case "parking": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"parking": novo}});break;
            case "opis": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"opis": novo}});break;
            case "terasa": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"terasa": novo}});break;
            case "podrum": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"podrum": novo}});break;
            case "internet": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"internet": novo}});break;
            case "lodja": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"lodja": novo}});break;
            case "garaza": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"garaza": novo}});break;
            case "interfon": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"interfon": novo}});break;
            case "franc_balkon": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"franc_balkon": novo}});break;
            case "sa_bastom": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"sa_bastom": novo}});break;
            case "telefon": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"telefon": novo}});break;
            case "lift": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"lift": novo}});break;
            case "klima": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"klima": novo}});break;
            case "mesecne_rezije": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"mesecne_rezije": novo}});break;
            case "poslednja_izmena": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"poslednja_izmena": novo}});break;
            case "linije": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"linije": novo}});break;
            case "mesec_prodaje": Nekretnina.collection.updateOne({'idN': idN}, {$set: {"mesec_prodaje": novo}});break;
           
        }
        
        res.json({'message': 'Uspesno izmenjena nekretnina'});
    }

 

   
    
}