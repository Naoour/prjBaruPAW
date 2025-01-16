import { Injectable } from '@angular/core';
import { Buku } from '../models/buku.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResponseAPI } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root',
})
export class BukuService {
  //private url: string = 'http://localhost:3000/buku/';
  private url: string = environment.api + 'buku/';

  private subjectBuku = new Subject<Buku[]>();
  private subjectExexute = new Subject<string>();

  constructor(private http: HttpClient) {}

  exexuteBukuListener() {
    return this.subjectExexute.asObservable();
  }

  getBukuListener() {
    return this.subjectBuku.asObservable();
  }

  getBuku() {
    this.http
      .get<{ message: string; bukus: Buku[] }>(this.url)
      .subscribe((value) => {
        console.log(value);
        this.subjectBuku.next(value.bukus);
      });
  }

  addBuku(judul: string, penulis: string, genres: string[]) {
    const buku: Buku = {
      _id: null,
      judul: judul,
      penulis: penulis,
      genre: genres,
    };

    //console.log(buku);

    this.http.post<ResponseAPI>(this.url, buku).subscribe((response) => {
      this.getBuku();
      this.subjectExexute.next(response.message);
      //console.log(response.message)
    });
  }

  deleteBuku(buku: Buku) {
    this.http
      .delete<{ message: string }>(this.url + buku._id)
      .subscribe((response) => {
        //console.log(response.message);
        this.getBuku();
        this.subjectExexute.next(response.message);
      });
  }

  updateBuku(judul: string, penulis: string, genres: string[], id: string) {
    const buku: Buku = {
      _id: id,
      judul: judul,
      penulis: penulis,
      genre: genres,
    };

    //console.log(buku);

    this.http
      .put<{ message: string }>(this.url + id, buku)
      .subscribe((response) => {
        this.getBuku();
        this.subjectExexute.next(response.message);
        //console.log(response.message)
      });
  }
}
