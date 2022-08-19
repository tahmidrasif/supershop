import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/model/interface/iproduct';
import { map } from 'rxjs/operators';

const _url:string="https://localhost:44363/api/product/";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private httpclient:HttpClient) { }

  getProducts(currentPage:number,pageSize:number):Observable<any>{
    return this.httpclient.get(_url+"getall?currentPage="+currentPage*pageSize+"&pageSize="+pageSize);
  }
}
