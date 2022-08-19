import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/model/interface/iproduct';
import { ProductService } from 'src/services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns: string[] = ['productID', 'productName', 'productCode', 'categoryName','subCategoryName'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  productList:IProduct[];
  dataSources:IProduct[] =[];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private _prodctservice:ProductService) { }

  ngOnInit(): void {
    
    this.loadData();

  }

  loadData(){
    this.isLoading=true;
    this._prodctservice.getProducts(this.currentPage,this.pageSize).subscribe(response=>{
      this.dataSources=response.data;
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = response.dataCount;
      this.isLoading=false;
    })
  }
 
  edit(element:IProduct){
    console.log(element)
  }

  delete(element:IProduct){
    console.log(element)
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

}
