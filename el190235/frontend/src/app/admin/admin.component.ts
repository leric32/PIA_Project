import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../models/user';
import { WorkShop } from '../models/workshop';
import { UserService } from '../services/user.service';
import { WorkshopService } from '../services/workshop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private workshopService: WorkshopService) { }

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem("ulogovan"));
    this.kor = false;
    this.rad = false;
    this.radDodaj = false;
    this.predlogRad = false;

    if (JSON.parse(localStorage.getItem('azurK')) != null) {
      this.azurK = JSON.parse(localStorage.getItem('azurK'))
    } else {
      this.azurK = null;
    }

    if (JSON.parse(localStorage.getItem('azurR')) != null) {
      this.azurR = JSON.parse(localStorage.getItem('azurR'))
    } else {
      this.azurR = null;
    }

    //console.log(this.azurK)
    this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
      this.korisnici = u;
    });
    this.workshopService.getAll().subscribe((w: WorkShop[]) => {
      this.radionice = w;
    })
    this.workshopService.getAllForUser4().subscribe((w: WorkShop[]) => {

      this.predlozi = w;

      this.predlozi.forEach(p => {
        this.userService.getOneByName(p.organizator).subscribe((us: User) => {

          p.tip = us.tip;

        })
      })
    })

    this.ime = null;
    this.prezime = null;
    this.korisnicko_ime = null;
    this.lozinka = null;
    this.email = null;
    this.tip = null;
    this.tel = null;
    this.organizacija = null;
    this.adresa_org = null;
    this.broj_org = null;
    this.error = null;
    this.slika = null;
    this.imgG = new Array(4);

    this.naziv = null;
    this.mesto = null;
    this.kratak_opis = null;
    this.duzi_opis = null;
    this.slika0 = null;
    this.slika1 = null;
    this.slika2 = null;
    this.slika3 = null;
    this.slika4 = null;
    this.datum = null;
    this.mesta = null;
    this.zauzeto = null;
  }

  ulogovan: User;
  korisnici: User[];
  radionice: WorkShop[];
  predlozi: WorkShop[];
  kor: boolean;
  rad: boolean;
  radDodaj: boolean;
  predlogRad: boolean;
  dod: boolean;
  azurK: User;
  azurR: WorkShop;

  ime: string;
  prezime: string;
  korisnicko_ime: string;
  lozinka: string;
  email: string;
  tip: string;
  tel: string;
  organizacija: string;
  adresa_org: string;
  broj_org: number;
  slika: string;

  naziv: string;
  mesto: string;
  kratak_opis: string;
  duzi_opis: string;
  slika0: string;
  slika1: string;
  slika2: string;
  slika3: string;
  slika4: string;
  datum: Date;
  mesta: number;
  zauzeto: number;


  izabrao(br) {
    if (br == 1) {
      this.rad = false;
      this.kor = true;
      this.dod = false;
      this.radDodaj = false;
      this.predlogRad = false;
      //console.log(this.azurK)
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    } else if (br == 2) {
      this.kor = false;
      this.rad = true;
      this.dod = false;
      this.radDodaj = false;
      this.predlogRad = false;
    } else if (br == 3) {
      this.rad = false;
      this.kor = false;
      this.dod = true;
      this.radDodaj = false;
      this.predlogRad = false;
    } else if (br == 4) {
      this.rad = false;
      this.kor = false;
      this.dod = false;
      this.radDodaj = true;
      this.predlogRad = false;
    } else if (br == 5) {
      this.rad = false;
      this.kor = false;
      this.dod = false;
      this.radDodaj = false;
      this.predlogRad = true;
    }
  }
  kor_ime: string;
  lozinka2: string;
  org: boolean;
  naz_org: string;
  adr_org: string;
  error: string;
  image: string;

  obrisi(k) {

    this.userService.delete(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
        console.log(this.korisnici)
      });
    })
  }

  obrisi2(r) {
    this.workshopService.deleteAllCommentsAndLikes(r.naziv).subscribe((resp) => {
      this.workshopService.getAll().subscribe((w: WorkShop[]) => {
        this.radionice = w;
      })
    })
  }

  azuriraj(k) {

    if (JSON.parse(localStorage.getItem('azurK')) == null) {
      console.log("usao")
      localStorage.setItem('azurK', JSON.stringify(k));
      this.azurK = k;
      this.router.navigate(["admin"]);
    } else {

      let o, a, b;

      if (this.tip == 'ucesnik' || this.azurK.tip == 'ucesnik') {
        o = null;
        a = null;
        b = null;
      } else {
        o = this.organizacija == null ? this.azurK.organizacija : this.organizacija;
        a = this.adresa_org == null ? this.azurK.adresa_org : this.adresa_org;
        b = this.broj_org == null ? this.azurK.broj_org : this.broj_org;
      }

      let rki = this.azurK.korisnicko_ime;

      this.userService.update(this.ime == null ? this.azurK.ime : this.ime,
        this.prezime == null ? this.azurK.prezime : this.prezime,
        this.korisnicko_ime == null ? this.azurK.korisnicko_ime : this.korisnicko_ime,
        this.tip == null ? this.azurK.tip : this.tip,
        this.lozinka == null ? this.azurK.lozinka : this.lozinka,
        this.tel == null ? this.azurK.tel : this.tel,
        this.email == null ? this.azurK.email : this.email,
        o, a, b, rki, this.slika == null ? this.azurK.slika : this.slika).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Azuriran korisnik");
          } else if (resp['msg'] == "ki") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          } else if (resp['msg'] == "em") {
            alert("Nije azuriran, jer vec postoji korisnik sa datim mail-om!!!");
          } else {
            alert("Nije azuriran korisnik!!!");
          }
          this.azurK = null;
          localStorage.setItem('azurK', null);
          this.ime = null;
          this.prezime = null;
          this.korisnicko_ime = null;
          this.lozinka = null;
          this.email = null;
          this.tip = null;
          this.tel = null;
          this.organizacija = null;
          this.adresa_org = null;
          this.broj_org = null;
          this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
            this.korisnici = u;
          });
          this.router.navigate(["admin"]);
        })
    }

  }

  azuriraj2(r) {
    if (JSON.parse(localStorage.getItem('azurR')) == null) {
      localStorage.setItem('azurR', JSON.stringify(r));
      this.azurR = r;
      this.router.navigate(["admin"]);
    } else {

      let galerija = new Array(4);
      let slikaTmp = this.slika1 == null ? this.azurR.slike[0] : this.slika1;
      galerija[0] = slikaTmp;
      slikaTmp = this.slika2 == null ? this.azurR.slike[1] : this.slika2;
      galerija[1] = slikaTmp;
      slikaTmp = this.slika3 == null ? this.azurR.slike[2] : this.slika3;
      galerija[2] = slikaTmp;
      slikaTmp = this.slika4 == null ? this.azurR.slike[3] : this.slika4;
      galerija[3] = slikaTmp;

      this.workshopService.update(this.azurR._id,
        this.naziv == null ? this.azurR.naziv : this.naziv,
        this.azurR.organizator,
        this.mesto == null ? this.azurR.mesto : this.mesto,
        this.kratak_opis == null ? this.azurR.kratak_opis : this.kratak_opis,
        this.duzi_opis == null ? this.azurR.duzi_opis : this.duzi_opis,
        this.datum == null ? this.azurR.datum : this.datum,
        this.mesta == null ? this.azurR.mesta : this.mesta,
        this.zauzeto == null ? this.azurR.zauzeto : this.zauzeto,
        this.slika0 == null ? this.azurR.slika0 : this.slika0,
        galerija, this.azurR.prihvaceni, this.azurR.cekaju, this.azurR.status).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Azurirana radionica");
          } else {
            alert("Nije azurirana radionica!!!");
          }
          this.naziv = null;
          this.mesto = null;
          this.kratak_opis = null;
          this.duzi_opis = null;
          this.slika0 = null;
          this.slika1 = null;
          this.slika2 = null;
          this.slika3 = null;
          this.slika4 = null;
          this.datum = null;
          this.mesta = null;
          this.zauzeto = null;

          this.azurR = null;
          localStorage.setItem('azurR', null);
          this.router.navigate(["admin"]);


          this.workshopService.getAll().subscribe((w: WorkShop[]) => {
            this.radionice = w;
          })
        })
    }
  }

  prihvati(k) {
    this.userService.approve(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })

  }

  odbij(k) {
    this.userService.decline(k.korisnicko_ime).subscribe((ok) => {
      this.userService.getAllExceptAdmins().subscribe((u: User[]) => {
        this.korisnici = u;
      });
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    }
  }

  load($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      if (this.kor == true) {
        this.slika = d;
      } else {
        this.image = d;
      }
    })

  }

  load1($event: Event, num) {
    const file = ($event.target as HTMLInputElement).files[0];
    console.log(file)

    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((d) => {
      console.log(d)
      switch (num) {
        case 0:
          this.slika0 = d;
          break;
        case 1:
          this.slika2 = d;
          break;
        case 2:
          this.slika2 = d;
          break;
        case 3:
          this.slika3 = d;
          break;
        case 4:
          this.slika4 = d;
          break;
      }
    })

  }

  register() {

    let tip = (this.org == true) ? "organizator" : "ucesnik";

    if (this.lozinka == this.lozinka2) {
      this.error = null;
      if (/^(?=.*[A-Za-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()~¥=_+}{":;'?/>.<,`\-\|\[\]]{8,16}$/.test(this.lozinka) && this.lozinka.charAt(0).toLowerCase() != this.lozinka.charAt(0).toUpperCase()) {
        console.log(1)
        this.userService.register(this.ime, this.prezime, this.kor_ime, tip, this.lozinka, this.tel, this.email, this.naz_org, this.adr_org, this.broj_org, "aktivan", this.image).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Dodat korisnik");
          } else if (resp['msg'] == "ki") {
            alert("Nije dodat, jer vec postoji korisnik sa datim korisnickim imenom!!!");
          } else if (resp['msg'] == "em") {
            alert("Nije dodat, jer vec postoji korisnik sa datim mail-om!!!");
          } else {
            alert("Nije dodat korisnik!!!");
          }
        })
      } else {
        this.error = "Lozinka ne zadovoljava uslove da ime bar jedno veliko slovo, jedan broj, jedan specijalan znak, pocinje slovom i duzine od 8 do 16 karaktera!!!";
      }
    } else {
      this.error = "Pogresno ste ponovili lozinku!!!"
    }
  }

  duzi_opisShow(opis) {
    alert(opis);
  }

  imgG: Array<string>;

  loadMultiple($event) {

    let numOfImgs = ($event.target as HTMLInputElement).files.length;

    for (let i = 0; i < numOfImgs; i++) {
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

  getJSON($event) {
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

  insert() {
    this.workshopService.insert(this.naziv, this.ulogovan.korisnicko_ime, this.mesto, this.kratak_opis, this.duzi_opis, this.datum, this.mesta, this.slika, this.imgG, "aktivan").subscribe((resp) => {
      if (resp['msg'] == "OK") {
        alert("Radionica kreirana!!!")
      } else {
        alert("Radionica nije kreirana!!!")
      }
      this.router.navigate(["admin"]);
    })
  }

  odobri2(r: WorkShop) {

    this.userService.getOneByName(r.organizator).subscribe((us: User) => {

      if (r.tip == 'organizator') {

        this.workshopService.changeStatus(r._id).subscribe((resp) => {
          if (resp['msg'] == "OK") {
            alert("Uspesno ste odobrili radionicu")
          }
          this.workshopService.getAllForUser4().subscribe((w: WorkShop[]) => {

            this.predlozi = w;

            this.predlozi.forEach(p => {
              this.userService.getOneByName(p.organizator).subscribe((us: User) => {

                p.tip = us.tip;

              })
            })
            this.workshopService.getAll().subscribe((w: WorkShop[]) => {
              this.radionice = w;
            })
          })
        })

      } else {

        let ind = false;
        var BreakExcetion = {};

        try {
          this.radionice.forEach(radi => {
            if (new Date(radi.datum) > new Date()
              && (radi.prihvaceni.includes(us.korisnicko_ime)
                || radi.cekaju.includes(us.korisnicko_ime))) {

              alert("Ucesnik " + us.korisnicko_ime + " je prijavljen na tekucoj radionici " + radi.naziv + ", pa ne sme da se prihvati zelja ucesnika da posatne organizator!!!");
              ind = true;
              throw BreakExcetion;
            }
          })
        } catch (e) {

        }
        if (ind == false) {

          this.userService.update(us.ime, us.prezime, us.korisnicko_ime, "organizator", us.lozinka, us.tel
            , us.email, us.organizacija, us.adresa_org, us.broj_org, us.korisnicko_ime, us.slika).subscribe((resp) => {
              this.workshopService.changeStatus(r._id).subscribe((resp) => {
                if (resp['msg'] == "OK") {
                  alert("Uspesno ste odobrili radionicu")
                }
                this.workshopService.getAllForUser4().subscribe((w: WorkShop[]) => {

                  this.predlozi = w;

                  this.predlozi.forEach(p => {
                    this.userService.getOneByName(p.organizator).subscribe((us: User) => {

                      p.tip = us.tip;

                    })
                  })
                  this.workshopService.getAll().subscribe((w: WorkShop[]) => {
                    this.radionice = w;
                  })
                })
              })
            })
        }

      }

    })

  }

  odbij2(r) {

  }

}
