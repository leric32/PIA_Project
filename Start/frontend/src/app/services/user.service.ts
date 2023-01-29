import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000/users';

  login(korisnicko_ime, lozinka){
    const data={
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  mail(korisnicko_ime, lozinka){
    const data={
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }
    console.log(1)
    return this.http.post(`${this.uri}/mail`, data);
  }

  register(ime, prezime, korisnicko_ime, tip, lozinka, tel, email, no, ao, mbo, status){
    const data={
      ime: ime,
      prezime: prezime,
      korisnicko_ime: korisnicko_ime,
      tip: tip,
      lozinka: lozinka,
      tel: tel,
      email: email,
      organizacija: no,
      adresa_org: ao,
      broj_org: mbo,
      status: status
    }
    console.log(data)
    return this.http.post(`${this.uri}/register`, data);
  }

  register_admin(ime, prezime, korisnicko_ime, lozinka, tel, email){
    const data={
      ime: ime,
      prezime: prezime,
      korisnicko_ime: korisnicko_ime,
      tip: 'admin',
      lozinka: lozinka,
      tel: tel,
      email: email,
      organizacija: null,
      adresa_org: null,
      broj_org: null,
      status: "aktivan"
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  getAllExceptAdmins(){
    return this.http.get(`${this.uri}/getAllExceptAdmins`);
  }

  delete(korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post(`${this.uri}/delete`, data);
  }

  update(ime, prezime, korisnicko_ime, tip, lozinka, tel, email, org, adr, br, rki){
    const data={
      ime: ime,
      prezime: prezime,
      korisnicko_ime: korisnicko_ime,
      tip: tip,
      lozinka: lozinka,
      tel: tel,
      email: email,
      organizacija: org,
      adresa_org: adr,
      broj_org: br,
      rki: rki
    }

    return this.http.post(`${this.uri}/update`, data);
  }

  approve(korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post(`${this.uri}/approve`, data);
  }

  decline(korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime
    }

    return this.http.post(`${this.uri}/decline`, data);
  }

}
