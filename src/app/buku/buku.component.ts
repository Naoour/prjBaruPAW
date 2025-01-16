import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BukuService } from '../services/buku.service';
import { Buku } from '../models/buku.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-buku',
  templateUrl: './buku.component.html',
  styleUrl: './buku.component.css',
  
})
export class BukuComponent implements OnInit,OnDestroy {
  bukuList: Buku[] =[];
  private getBukuSub : Subscription = new Subscription();
  private messageSub : Subscription = new Subscription();
  messageExecute : string="";

  mode : string = "Simpan";

  //pagination
  p: number = 1;

  constructor(public bukuService : BukuService){
  }

  ngOnInit(): void {
    this.getBukuSub = this.bukuService.getBukuListener()
    .subscribe((value : Buku[])=>{
      this.bukuList= value;
    });

    this.messageSub = this.bukuService.exexuteBukuListener()
    .subscribe((value)=>{
      this.messageExecute=value;
    });

    this.bukuService.getBuku();
  }

  ngOnDestroy(): void {
    this.getBukuSub.unsubscribe();
    this.messageSub.unsubscribe();
  }
  
  tampilData(buku : Buku, form : NgForm){
    var gen1 : boolean=false;
    var gen2 : boolean =false;
    var gen3 : boolean = false;

    buku.genre.forEach((val)=>{
      if(val.toUpperCase().trim()==="BIOGRAFI"){
        gen1 =true;
      }else if(val.toUpperCase().trim()==="PENDIDIKAN"){
        gen2= true;
      }else if(val.toUpperCase().trim()==="LAINNYA"){
        gen3 =true;
      }
    });
    
    form.setValue({
      id : buku._id,
      judul : buku.judul,
      penulis : buku.penulis,
      genre1 : gen1,
      genre2 : gen2,
      genre3 : gen3
    })
    
    this.mode="Perbaiki"
  }

  onReset(){
    this.mode="Simpan"
    this.messageExecute=""
  }

  simpanBuku(form : NgForm){

    if(form.invalid){
      //console.log("Tidak Valid");
      //alert("Data tidak valid");
      return;
    }

    let genres: string[] =[];

    if (form.value.genre1==true){
      genres.push("Biografi")
    }

    if(form.value.genre2==true){
      genres.push("Pendidikan")
    }

    if(form.value.genre3==true){
      genres.push("Lainnya")
    }
    // console.log("Pengujian Klik")
    // console.log(form.value.judul);
    // console.log(form.value.penulis);
    // console.log(genres);

    if(this.mode.toUpperCase() === "SIMPAN"){
      this.bukuService.addBuku(form.value.judul, form.value.penulis,genres);
    }else{
      this.bukuService.updateBuku(form.value.judul, form.value.penulis,
        genres, form.value.id);
    }
  
    form.resetForm();
    this.mode="Simpan";
  }

  hapusBuku(buku : Buku){
    if (confirm("Hapus Data buku : " + buku.judul)){
          this.bukuService.deleteBuku(buku);
    }

  }

}
