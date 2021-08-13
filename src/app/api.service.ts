import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor( private http : HttpClient) { }

  getPost(){
    return this.http.get<any>('http://localhost:8080/articles/getArticleDetails')
     .pipe(map((res :any)=>{
          return res;
     }))
  }

  addPost(data :any){
    return this.http.post('http://localhost:8080/articles/createArticle',data)
    .pipe(map((res : any)=>{
        return res;
    }))
  }




}
