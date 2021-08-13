import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup}from '@angular/forms';

import { ApiCallService } from '../api.service';

import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ArticleModel } from './article-dashboard.model';

@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit {

  closeModal: any;
  formValue !: FormGroup;
  articleModelObj: ArticleModel = new ArticleModel();
  articleData !:any;

  constructor(private modalService: NgbModal,
              private formbuilder :FormBuilder,
              private getApi:ApiCallService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      title:[''],
      author:[''],
      description:[''],
      content:['']
    })

    this.getAllArticle();

  }


//Code for Modal   
  triggerModal(content :any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  //Code for Modal  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


postArticleDetails(){
  this.articleModelObj.title = this.formValue.value.title;
  this.articleModelObj.author = this.formValue.value.author;
  this.articleModelObj.description = this.formValue.value.description;
  this.articleModelObj.content = this.formValue.value.content;
  this.getApi.addPost(this.articleModelObj)
  .subscribe(res => {
      console.log(res);
      alert("Article Added Successfully..");
      this.formValue.reset();
      this.getAllArticle();
   },    
  err=>{
    alert("Something Went Wrong..")
       }      
            ); 
}

  
getAllArticle(){
  this.getApi.getPost()
  .subscribe(res=>{
    this.articleData = res.result;       
    console.log(this.articleData);
  });


}





}








