import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { isObservable } from 'rxjs';
import { Product } from 'src/model/classes/product';
import { ProductService } from 'src/services/product.service';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-productform',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.css']
})
export class ProductformComponent implements OnInit {

  prodcutFrom:FormGroup;
  isError=false;
  isLoading=false;
  isSuccess=false;
  constructor(public formBuilder:FormBuilder, public dialog: MatDialog,private dialogRef: MatDialogRef<ProductformComponent>,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any ,private _service:ProductService) { 
    console.log(data);
    
  }

  ngOnInit(): void {


    this.prodcutFrom= this.formBuilder.group({
      Name:['',[
        Validators.required
      ]],
      ProductCode:['',[
        Validators.required
      ]],
      Description:[''],
      CategoryId:['',[
        Validators.required,
      ]],
      SubCategoryId:['',[
        Validators.required,
      ]],
      UnitId:['',[
        Validators.required,
      ]],
      UnitType:['',[
        Validators.required,
      ]],
     });

     if(this.data!=null){
      this.prodcutFrom.patchValue(this.data);
     }
    console.log(this.isSuccess)
    console.log(this.prodcutFrom.invalid)
  }

  onSubmit(){

    
    if (this.prodcutFrom.valid)
    {

      this.isLoading=true;
      this._service.insertProduct(this.prodcutFrom.value).subscribe({
        next: (v) => {
          this.openSnackBar("Successfully Inserted");
          this.isSuccess=true;

        },
        error: (e) => {
          this.openSnackBar(e.error.responseMessage);
         
        },
        complete: () => {
          console.log('in compleate')
          this.isLoading=false;
        }
      })
      .add(() => {
          this.isLoading=false;
       });
    }
    
    
    //console.log(this.prodcutFrom.value);
    //
    //this.isError=true
    // if(!this.isError){
    //   this.dialogRef.close(this.prodcutFrom.value);
    // }
  }

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 5000;
    this._snackBar.open(message, 'close',config);
  }

}
