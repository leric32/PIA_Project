import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routers/user.routes';
import gradRouter from './routers/grad.routes';
import agencijaRouter from './routers/agencija.routes';
import mikrolokacijaRouter from './routers/mikro.routes';
import ulica_pripada from './models/ulica_pripada';
import ulicaRouter from './routers/ulica.routes';
import nekretninaRouter from './routers/nekretnina.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/projekat');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok')
})

const router = express.Router();
router.use('/korisnici', userRouter)
router.use('/gradovi', gradRouter)
router.use('/agencije', agencijaRouter)
router.use('/mikrolokacije', mikrolokacijaRouter)
router.use('/ulice', ulicaRouter)
router.use('/nekretnine', nekretninaRouter)

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));