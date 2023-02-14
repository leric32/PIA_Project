import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000/workshops';

  hi(){
    console.log("hi usao")
    return this.http.get(`${this.uri}/hi`);
  }

  insert(naziv, organizator, mesto, ko, duzi_opis, datum, mesta, slika0){
    const data={
      naziv: naziv,
      organizator: organizator,
      mesto: mesto,
      kratak_opis: ko,
      duzi_opis: duzi_opis,
      datum: datum,
      mesta: mesta,
      zauzeto: 0,
      slika0: slika0,
      slike: null,
      prihvaceni: null,
      cekaju: null,
      status: "pending"
    }

    return this.http.post(`${this.uri}/insert`, data);
  }

  getAll(){
    return this.http.get(`${this.uri}/getAll`);
  }

  deleteAllCommentsAndLikes(naziv){
    const data={
      naziv: naziv
    }

    return this.http.post(`${this.uri}/deleteAllCommentsAndLikes`, data);
  }

  getAllForUser(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser`, data);
  }

  getAllForUser2(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser2`, data);
  }

  getAllForUser3(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getAllForUser3`, data);
  }

  getLikes(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getLikes`, data);
  }

  getComments(k){
    const data={
      korisnicko_ime: k
    }

    return this.http.post(`${this.uri}/getComments`, data);
  }

  deleteLike(ucesnik, radionica){
    const data={
      ucesnik: ucesnik,
      radionica: radionica
    }

    return this.http.post(`${this.uri}/deleteLike`, data);
  }

  deleteComment(ucesnik, radionica){
    const data={
      ucesnik: ucesnik,
      radionica: radionica
    }

    return this.http.post(`${this.uri}/deleteComment`, data);
  }

  updateComment(ucesnik, radionica, komentar){
    const data={
      ucesnik: ucesnik,
      radionica: radionica,
      komentar: komentar
    }

    return this.http.post(`${this.uri}/updateComment`, data);
  }

  povuciPrijavu(naziv, korisnicko_ime){
    const data={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/povuciPrijavu`, data);
  }

}
