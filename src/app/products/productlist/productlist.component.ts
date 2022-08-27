import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/model/interface/iproduct';
import { ProductService } from 'src/services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { ProductformComponent } from '../productform/productform.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('prodTbSort') prodTbSort = new MatSort();
  
  displayedColumns: string[] = ['productID', 'productName', 'productCode', 'categoryName','subCategoryName'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];
  dataSources;
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private _prodctservice:ProductService,public dialog: MatDialog) { }
  
  ngOnInit(): void {
    
    this.loadData();

  }

  loadData(){
    this.isLoading=true;
    this._prodctservice.getProducts(this.currentPage,this.pageSize).subscribe(response=>{
      this.dataSources= new MatTableDataSource(response.data);
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = response.dataCount;
      this.isLoading=false;
      this.dataSources.sort=this.prodTbSort;
    })
  }
 
  edit(element:IProduct){
    this.openDialog(element);
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

  openDialog(data){

      const dialogRef = this.dialog.open(ProductformComponent, { disableClose: true, height: '90%',
      width: '90%', data: data
     });
  
      dialogRef.afterClosed().subscribe(
          data => {
            this.loadData();
          }
      );    
    
    
  }

}
