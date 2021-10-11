import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConnectService } from '../Connections/connect.service';
import { productModel } from '../product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  formValue!: FormGroup;
  ProductModelObj: productModel = new productModel();
  ProductData !: any;





  constructor(private formbuilber: FormBuilder,
    public api: ConnectService) { }



  ngOnInit(): void {
    this.formValue = this.formbuilber.group({

      Order: [''],
      Model: [''],
      Date: [''],
      Country: [''],
      Status: [''],
    })
    this.getProductDetails();
  }
  /* Search() {                     -----ÇALIŞMADI
     if (this.Order == "") {
       this.ngOnInit();
     } else {
       this.ProductData = this.ProductData.filter(res => {
         return res.Order.toLocalLowerCase().match(this.Order.toLocalLowerCase());
       })
     }
   }*/


  postProductDetails() {
    this.ProductModelObj.Order = this.formValue.value.Order;
    this.ProductModelObj.Model = this.formValue.value.Model;
    this.ProductModelObj.Date = this.formValue.value.Date;
    this.ProductModelObj.Country = this.formValue.value.Country;
    this.ProductModelObj.Status = this.formValue.value.Status;

    this.api.postProduct(this.ProductModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Product added succesfully")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
        err => {
          alert("Wrong");
        })
  }

  getProductDetails() {

    this.api.getProduct()
      .subscribe(res => {
        this.ProductData = res;
      })

  }
  DeleteProductDetails(row: any) {
    this.api.deleteProduct(row.id)
      .subscribe(res => {
        alert("Product Deleted");
        this.getProductDetails();
      })
  }
  onEdit(row: any) {
    this.ProductModelObj.id = row.id;
    this.formValue.controls['Order'].setValue(row.Order);
    this.formValue.controls['Model'].setValue(row.Model);
    this.formValue.controls['Date'].setValue(row.Date);
    this.formValue.controls['Country'].setValue(row.Country);
    this.formValue.controls['Status'].setValue(row.Status);

  }
  UpdateProductDetails() {
    this.ProductModelObj.Order = this.formValue.value.Order;
    this.ProductModelObj.Model = this.formValue.value.Model;
    this.ProductModelObj.Date = this.formValue.value.Date;
    this.ProductModelObj.Country = this.formValue.value.Country;
    this.ProductModelObj.Status = this.formValue.value.Status;

    this.api.updateProduct(this.ProductModelObj, this.ProductModelObj.id)
      .subscribe(res => {
        alert("Updated succesfully");
      })

  }
  key: string = 'id';
  reverse: boolean = false;
  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;
  }

}
