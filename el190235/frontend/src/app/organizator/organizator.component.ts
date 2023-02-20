import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));

    this.rad = false;
    this.sveR = true;
    this.svePor = false;
    this.imgG = new Array(4);

    this.workshopService.getAll().subscribe((w: WorkShop[]) => {
      this.radionice = w;
      //console.log(this.radionice)
    })

    if (JSON.parse(localStorage.getItem('azurR')) != null) {
      this.azurR = JSON.parse(localStorage.getItem('azurR'))
    } else {
      this.azurR = null;
    }

    this.chatBox = new Array(3);
    this.chatBox[0] = null;
    this.chatBox[1] = null;
    this.chatBox[2] = null;
    this.ind = false;
    this.error = null;
    this.promLoz = false;
    this.workshopService.getAllMessagesForUser(this.ulogovan.korisnicko_ime).subscribe((m: Message[]) => {
      console.log(m);
      this.chatMes = m;
      this.chatRad = []
      m.forEach(mes => {

        this.workshopService.getOneWorkshop(mes.radionica).subscribe((radio: WorkShop) => {
          console.log(radio)
          if (this.chatRad.some(radi => radi._id == radio._id) == false) {
            this.chatRad.push(radio);
          }
        })
        console.log(this.chatMes)
      })


      
    })

  }

  ulogovan: User;
  rad: boolean;
  sveR: boolean;
  svePor: boolean;
  promLoz: boolean;

  naziv: string;
  datum: Date;
  mesto: string;
  organizator: string;
  kratak_opis: string;
  duzi_opis: string;
  mesta: number;
  zauzeto: number;
  slika: string;
  status: string;

  lozinka: string;
  lozinka2: string;
  error: string;

  radionice: WorkShop[];
  azurR: WorkShop;
  imgG: Array<string>;

  load($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];

    const observable = new Observable((subscriber: Subscriber<any>) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    });

    observable.subscribe((d) => {
      console.log(d)
      this.slika = d;
    })

  }

  izabrao(br) {
    if (br == 1) {
      this.rad = false;
      this.sveR = true;
      this.svePor = false;
      this.promLoz = false;
    } else if (br == 2) {
      this.rad = true;
      this.sveR = false;
      this.svePor = false;
      this.promLoz = false;
    }else if (br == 3) {
      this.rad = false;
      this.sveR = false;
      this.svePor = true;
      this.ind = false;
      this.promLoz = false;
    }else if (br == 10) {
      this.rad = false;
      this.sveR = false;
      this.svePor = false;
      this.ind = false;
      this.promLoz = true;
    }

  }

  insert() {
    this.workshopService.insert(this.naziv, this.ulogovan.korisnicko_ime, this.mesto, this.kratak_opis, this.duzi_opis, this.datum, this.mesta, this.slika, this.imgG, "pending").subscribe((resp) => {
      if (resp['msg'] == "OK") {
        alert("Radionica kreirana!!!")
      } else {
        alert("Radionica nije kreirana!!!")
      }
      this.router.navigate(["organizator"]);
    })
  }

  azuriraj(r) {

    if (JSON.parse(localStorage.getItem('azurR')) == null) {
      localStorage.setItem('azurR', JSON.stringify(r));
      this.azurR = r;
      this.router.navigate(["organizator"]);
    } else {
      this.azurR = null;
      localStorage.setItem('azurR', null);
      this.router.navigate(["organizator"]);

    }

  }

  prihvati(r: WorkShop){
    this.workshopService.prihvatiSve(r._id).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Prihvatili ste sve koje cekaju na radionicu")
      }
      this.workshopService.getAll().subscribe((w: WorkShop[]) => {
        this.radionice = w;
        //console.log(this.radionice)
      })
    })
  }

  otkazi(r: WorkShop){

    let uces = r.prihvaceni;

    this.workshopService.deleteAllCommentsAndLikes(r.naziv).subscribe((resp)=>{
      if(resp['msg'] == "OK"){
        alert("Uspesno ste otkazali radionicu - " + r.naziv);

        if(uces != null){
            uces.forEach(u => {
            
            this.userService.getOneByName(u).subscribe((user: User) =>{
              this.userService.sendCancelationEmail(r.naziv, user.email).subscribe(()=>{
                //posalo email
              })
            })
          
          })
        }
        this.workshopService.getAll().subscribe((w: WorkShop[]) => {
          this.radionice = w;
          console.log(this.radionice)
        })
       
      }
    })

  }

  sacuvaj(r){

    const js = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(r)
    )}`;

    const link = document.createElement("a");

    link.href = js;

    link.download = "radionica.json";

    link.click()

  }

  getJSON($event){
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)
    const observable = new Observable((subscriber: Subscriber<any>) => {
      const filereader = new FileReader();
      filereader.readAsText(file)
      filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    });

    observable.subscribe((d) => {
      console.log(JSON.parse(d))
      //uvezen sablon
      let dp = JSON.parse(d);
      this.naziv = dp['naziv']
      this.datum = dp['datum']
      this.mesto = dp['mesto']
      this.kratak_opis = dp['kratak_opis']
      this.duzi_opis = dp['duzi_opis']
      this.mesta = dp['mesta']
      this.slika = dp['slika0']
    })
  }

  loadMultiple($event){

    let numOfImgs = ($event.target as HTMLInputElement).files.length;

    for(let i = 0; i  < numOfImgs; i++){
      const file = ($event.target as HTMLInputElement).files[i];

      const observable = new Observable((subscriber: Subscriber<any>) => {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload = () => {
        subscriber.next(filereader.result);
        subscriber.complete();
      }
      });
  
      observable.subscribe((d) => {
        console.log(d)
        this.imgG[i] = d;
      })
    }
  }


  chatBox: Array<Array<Message>>;
  textBox: string;
  chatRad: WorkShop[];
  chatMes: Message[];
  ucesniciBox : User[];
  ind: boolean;

  odabraoRad(r: WorkShop){

    let i;

    if(this.chatBox[0] == null){
      i = 0;
    }else if(this.chatBox[1] == null){
      i = 1;
    }else if(this.chatBox[2] == null){
      i = 2;
    }else {
      i = 0;
    }

    let useri = [];

    this.chatMes.forEach(cm =>{
      if(cm.to != this.ulogovan.korisnicko_ime && !useri.includes(cm.to)){
        useri.push(cm.to)
      }
      if(cm.from != this.ulogovan.korisnicko_ime && !useri.includes(cm.from)){
        useri.push(cm.from)
      }
    })

    console.log(useri)
    this.ind = true;
    this.ucesniciBox = useri;
    // cet.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

    // this.chatBox[i] = cet;

    //console.log(this.chatBox)

  }
  
  zatvoriBox(br){
    this.chatBox[br] = null;
  }

  

  posaljiMes(i){

    let from = this.ulogovan.korisnicko_ime;
    console.log(this.chatBox[i])
    let _idR = this.chatBox[i][0]._idR;

    this.workshopService.getWorkshopById(_idR).subscribe((w: WorkShop)=>{
      console.log(2)
      let to = w.organizator;
      let datum = new Date();
      let tekst = this.textBox;
      let fromImg = this.ulogovan.slika;
      let radImg = w.slika0;
      let radionica = w.naziv;
      this.userService.getOneByName(to).subscribe((us: User)=>{
        let toImg = us.slika;
        console.log(3)
        this.workshopService.sendMsg(to, from, tekst, datum, toImg, fromImg, radionica, radImg, _idR).subscribe((resp)=>{
          if(resp['msg'] == "OK"){
            console.log(4)
            this.chatBox[i].push(resp['mes']);
            this.textBox = "";
          }
        })

      })

    })

  }

  odabraoUces(u){
    let i;

    if(this.chatBox[0] == null){
      i = 0;
    }else if(this.chatBox[1] == null){
      i = 1;
    }else if(this.chatBox[2] == null){
      i = 2;
    }else {
      i = 0;
    }

    let cet = [];

    this.chatMes.forEach(cm =>{
      if((cm.from == u && cm.to == this.ulogovan.korisnicko_ime)
          || (cm.to == u && cm.from == this.ulogovan.korisnicko_ime)){
        cet.push(cm);
      }
    })

    //this.ind = true;
    cet.sort((a, b) => new Date(a.datum).getTime() - new Date(b.datum).getTime());

    this.chatBox[i] = cet;

    //console.log(this.chatBox)
  }


  stara: string;

  promeni() {
    if (this.stara == this.ulogovan.lozinka) {
      if (this.lozinka == this.lozinka2) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {

          this.userService.update(this.ulogovan.ime, this.ulogovan.prezime, this.ulogovan.korisnicko_ime, this.ulogovan.tip, this.lozinka, this.ulogovan.tel, this.ulogovan.email, this.ulogovan.organizacija,
            this.ulogovan.adresa_org, this.ulogovan.broj_org, this.ulogovan.korisnicko_ime, this.ulogovan.slika).subscribe((resp) => {
              if (resp['msg'] == "OK") {
                alert("Korisniku je promenjena lozinka!!!")
                this.router.navigate([""]);
              } else {
                alert("Korisniku nije promenjena lozinka!!!")
              }
            })

        } else {
          this.error = "Lozinka ne zadovoljava uslove da ime bar jedno veliko slovo, jedan broj, jedan specijalan znak, pocinje slovom i duzine od 8 do 16 karaktera!!!";
        }
      } else {
        this.error = "Pogresno ponovljena lozinka!!!";
      }
    } else {
      this.error = "Pogresna stara lozinka!!!";

    }
  }

}
