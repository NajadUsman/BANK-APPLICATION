import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim="your perfect banking partner"
  accno="Account Number Please"
  acno=""
  pass=""


  // database:any={
  //   1000:{acno:1000,uname:"najad",password:1234,balance:50000},
  //   1001:{acno:1001,uname:"favas",password:2345,balance:30000},
  //   1002:{acno:1002,uname:"akash",password:3456,balance:20000},

      
  
    // login group model creation
    loginForm=this.fb.group({
      // form array create
      acno: [``, [Validators.required, Validators.pattern(`[0-9]*`)]],
      pass: [``, [Validators.required, Validators.pattern(`[a-zA-Z0-9 ]*`)]]
    })
  routerLogin: any;


  
  
  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  accnoChange(event:any)
  {
    this.acno=event.target.value



    console.log(this.acno)
  }
  passwordChange(event:any)
  {
    this.pass=event.target.value
    console.log(this.pass);
    
  }

//   login()
//   {
//    var acno=this.acno
//    var pass=this.pass
  

//    if(acno in  this.database)
//    {
//       if(pass==this.database[acno]["password"])
//       {
//         alert("login successfull!!!")
//       }
//       else
//       {
//         alert("incorect password")
//       }
//     }
//       else
//       {
//         alert("user does not exit")
//       }
   

// }

// login-using template reference
// login(a:any,p:any)
// {
//  var acno=a.value
//  var pass=p.value


//  if(acno in  this.database)
//  {
//     if(pass==this.database[acno]["password"])
//     {
//       alert("login successfull!!!")
//     }
//     else
//     {
//       alert("incorect password")
//     }
//   }
//     else
//     {
//       alert("user does not exit")
//     }
 

// }

// 3.login using two way binding

  login()
  {
    var acno=this.loginForm.value.acno
    var pass=this.loginForm.value.pass

    if(this.loginForm.valid)
    {
      // asynchronous call-login
      this.ds.login(acno,pass)
      .subscribe((result:any)=>{
        if(result){
          localStorage.setItem('currentAcno',JSON.stringify(result.currentAcno))
          localStorage.setItem('currentUname',JSON.stringify(result.currentUname))
          localStorage.setItem('token',JSON.stringify(result.token))
          alert(result.message)
          this.router.navigateByUrl("homepage")

        }
      },
      (result)=>{
        alert(result.error.message)
      }
      )


  
    }
    else{
      alert("invalidform")
    }
}

}