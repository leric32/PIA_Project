import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from '../models/like';
import { Comment } from '../models/comment';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-workshop-details',
  templateUrl: './workshop-details.component.html',
  styleUrls: ['./workshop-details.component.css']
})
export class WorkshopDetailsComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.radionica = JSON.parse(localStorage.getItem('radionica-detalji'));
    this.imgNum = 0;

    this.workshopService.alreadyPart(this.radionica.naziv, this.ulogovan.korisnicko_ime).subscribe((resp) => {
      if (resp['msg'] == "OK") {
        this.prijavljen = true;
      } else {
        this.prijavljen = false;
      }
    })

    this.workshopService.hastPastWorkshop(this.radionica.naziv, this.ulogovan.korisnicko_ime).subscribe((resp) => {
      if (resp['msg'] == "OK") {
        this.vecBio = true;
      } else {
        this.vecBio = false;
      }
      console.log(this.vecBio)
    })

    this.workshopService.getLikesForWorkshop(this.radionica.naziv).subscribe((l: Like[]) => {
      this.likNum = l;
      this.likNumLength = l.length;
    })

    this.workshopService.getCommentsForWorkshop(this.radionica.naziv).subscribe((l: Comment[]) => {
      this.comNum = l;
      this.comNumLength = l.length;
    })

    this.mapaP = true;
    this.chatP = false;
    this.likComP = false;

    //setInterval(this.nextImg2, 1500, this);
  }

  ulogovan: User;
  radionica: WorkShop;
  prijavljen: boolean;

  mapaP: boolean;
  chatP: boolean;
  likComP: boolean;
  vecBio: boolean;
  likNum: Like[];
  comNum: Comment[];
  likNumLength: number;
  comNumLength: number;

  komText: string;

  vrati_se() {
    this.router.navigate(["ucesnik"]);
  }

  imgNum: number;

  nextImg2(pok) {
    if (pok.radionica.slike[pok.imgNum + 1] == null) {
      pok.imgNum = 0
    } else {
      pok.imgNum += 1;
    }
  }

  nextImg() {
    if (this.radionica.slike[this.imgNum + 1] == null) {
      this.imgNum = 0
    } else {
      this.imgNum += 1;
    }
  }

  prijava() {
    this.workshopService.addPart(this.radionica.naziv, this.ulogovan.korisnicko_ime).subscribe((resp) => {
      if (resp['msg'] == "OK") {
        alert("Uspesno ste se prijavili na radionicu " + this.radionica.naziv);
        this.prijavljen = true;
      }
    })

  }

  obavesti() {
    this.workshopService.addPart(this.radionica.naziv, this.ulogovan.korisnicko_ime).subscribe((resp) => {
      if (resp['msg'] == "OK") {
        alert("Dobicete obaveste na email kada se oslobodi mesto na radionici " + this.radionica.naziv);
        this.prijavljen = true;
      }
    })
  }

  mapa() {
    this.mapaP = true;
    this.chatP = false;
    this.likComP = false;
  }

  chat() {
    this.mapaP = false;
    this.chatP = true;
    this.likComP = false;
  }

  likCom() {
    this.likComP = true;
    this.mapaP = false;
    this.chatP = false;
  }

  likeWS() {
    if (this.vecBio == false) {
      alert("Da biste lajkovali radionicu morate ucestavovati vec u njoj!!!")
    } else {
      let ind = false;

      this.likNum.forEach(l => {
        if (l.ucesnik == this.ulogovan.korisnicko_ime) {
          ind = true;
        }
      })

      if (ind) {
        alert("Vec ste lajkovali radionicu!")
      } else {
        this.workshopService.addLike(this.radionica.naziv, this.ulogovan.korisnicko_ime).subscribe((resp) => {
          this.workshopService.getLikesForWorkshop(this.radionica.naziv).subscribe((l: Like[]) => {
            this.likNum = l;
            this.likNumLength = l.length;
          })
        })
      }

    }
  }

  komPost() {
    let ind = false;

    this.comNum.forEach(l => {
      if (l.ucesnik == this.ulogovan.korisnicko_ime) {
        ind = true;
      }
    })

    if (ind) {
      alert("Vec ste komentarisali radionicu!")
    } else {
      this.workshopService.addComment(this.radionica.naziv, this.ulogovan.korisnicko_ime, this.komText).subscribe((resp) => {
        this.workshopService.getCommentsForWorkshop(this.radionica.naziv).subscribe((l: Comment[]) => {
          this.comNum = l;
          this.comNumLength = l.length;
        })
      })
    }
  }

  mapAdr() {

    //string to format which we want
    var str = this.radionica.mesto.replace(/[, ]+/g, " ").trim();

    let adr = this.radionica.mesto.split(' ').join('%20')

    return `https://maps.google.com/maps?q=${adr}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  }

}
