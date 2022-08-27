import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/model/classes/product';

const _url:string="https://localhost:44363/api/product/";
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private httpclient:HttpClient) { }

  getProducts(currentPage:number,pageSize:number):Observable<any>{
    return this.httpclient.get(_url+"getall?currentPage="+currentPage*pageSize+"&pageSize="+pageSize);
  }

  insertProduct(product:Product){
    const body = JSON.stringify(product);
    console.log(body);
   return this.httpclient.post(_url+"InsertProduct",body,httpOptions)
  }
  
}
