import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user: any
  lDate: any
  acno: any
  myName: any
  depositeForm = this.fb.group({
    // form array create
    acno: [``, [Validators.required, Validators.pattern(`[0-9]*`)]],
    pass: [``, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]],
    amount: [``, [Validators.required, Validators.pattern(`[0-9]*`)]]
  })



  withdrawForm = this.fb.group({
    // form array create
    acno1: [``, [Validators.required, Validators.pattern(`[0-9]*`)]],
    pass1: [``, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]],
    amount1: [``, [Validators.required, Validators.pattern(`[0-9]*`)]]
  })

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if (localStorage.getItem('currentUname')) {

      this.user = JSON.parse(localStorage.getItem('currentUname') || '')
    }

    this.lDate = new Date
  }

  ngOnInit(): void {
    // if (!localStorage.getItem("currentAcno")) {
    //   alert("please login again")
    //   this.router.navigateByUrl("")
    // }
    // this.getName()
  }
  // getName()
  // {
  //   this.ds.getMyName().subscribe((resp)=>{
  //     this.myName=resp[0].name
  //   })
  // }

  deposite() {


    var acno = this.depositeForm.value.acno
    var pass = this.depositeForm.value.pass
    var amount = this.depositeForm.value.amount
    if (this.depositeForm.valid) {
      // calling deposite function of dataservice-asynchronous

      this.ds.deposite(acno, pass, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }

        )

    }
    else {
      alert("invalid form")

    }

  }
  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pass = this.withdrawForm.value.pass1
    var amount = this.withdrawForm.value.amount1
    if (this.withdrawForm.valid) {

      this.ds.withdraw(acno, pass, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }

        )

    }
    else {
      alert("invalidform")
    }
  }
  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }
  deleteMyAccount() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')
  }
  cancel() {
    this.acno = ""
  }
  delete(event: any) {
    // alert("delete account " + event + " from parent")
    this.ds.delete(event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          localStorage.removeItem("currentAcno")
          localStorage.removeItem("currentUname")
          localStorage.removeItem("token")
          this.router.navigateByUrl("")
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )
  }

}
