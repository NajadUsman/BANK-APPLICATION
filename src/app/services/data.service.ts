import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, observable, of } from 'rxjs';

// interface person{
//   name:string;
//   age:number;
//   phone:number;
//   qualification:string
// }
const options={
  headers:new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})
export class DataService {


  currentAcno:any
  currentUname:any

  // database:any={
  //   1000:{acno:1000,uname:"NAJAD",password:1234,balance:50000,transaction:[]},
  //   1001:{acno:1001,uname:"FAVAS",password:2345,balance:30000,transaction:[]},
  //   1002:{acno:1002,uname:"AKASH",password:3456,balance:20000,transaction:[]}


  // }

  constructor(private http:HttpClient) { 
    // this.getData()
  }

  // to store data in localstorage

//   storeData()
//   {
//     localStorage.setItem("database",JSON.stringify(this.database))
//     if(this.currentAcno)
//     {
//       localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
//     }
//     if(this.currentUname)
//     {
//       localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
//     }
//   getData()
// }


  // to get data from localstorage
  // getData()
  // {
  //   if(localStorage.getItem("database"))
  //   {
  //     this.database=JSON.parse(localStorage.getItem("database") || '')
  //   }
  //   if(localStorage.getItem("currentAcno"))
  //   {
  //     this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '')
  //   }
  //   if(localStorage.getItem("currentUname"))
  //   {
  //     this.currentUname=JSON.parse(localStorage.getItem("currentUname") || '')
  //   }
    
  // }


  register(acno:any,password:any,uname:any)
  {

    // json data
    const data={
      acno,password,uname
    }
    // register API
    return this.http.post('http://localhost:3000/register',data)
//     let database=this.database
//     if(acno in database)
//     {
//       return false
//     }
//     else
//     {
//       database[acno]={
//         acno,
//         uname,
//         password,
//         balance:0,
//         transaction:[]
        

//       }
//       this.storeData()
//       return true
//     }
  }
  login(acno:any,password:any)
{

  const data={
    acno,password
  }
  // login API
  return this.http.post('http://localhost:3000/login',data)
//   let database=this.database
// if(acno in database)
//    {
//       if(password==database[acno]["password"])
//       {
//         this.currentAcno=acno
//         this.currentUname=database[acno]["uname"]
//         this.storeData()
//         return true
//       }  
//       else
//       {
//         alert("incorect password")
//         return false
//       }
//     }
//       else
//       {
//         alert("user does not exit")
//         return false

//       }
      
    }
// DEPOSITE FUNCTION
deposite(acno:any,password:any,amt:any)
{
  // rqst body
  const data={
    acno,
    password,
    amt
  }



// deposite API
return this.http.post('http://localhost:3000/deposite',data,this.getOptions())

  // var amount=parseInt(amt)
  // let database=this.database

  // if(acno in database)
  // {
  //   if(password==database[acno]["password"])
  //   {

  //     database[acno]["balance"]=database[acno]["balance"]+amount
  //     database[acno]["transaction"].push({
  //       amount:amount,
  //       type:"CREDIT"
  //     })
  //     // console.log(database);

  //     this.storeData()
  //     return database[acno]["balance"]

  //   }
  //   else
  //   {

  //     alert("incorrect password")
  //     return false

  //   }
  // }
  // else
  // {
  //   alert("user does not exist")
  //   return false
  // }
  

  }
  // to add in rqst header
  getOptions(){
    // token fetch
const token=JSON.parse(localStorage.getItem('token') || '')
// to create rqst header
let headers=new HttpHeaders()
if(token){
  headers=headers.append('x-access-token',token)
  options.headers=headers
}
return options
  }
// WITHDRAW FUNCTION
  withdraw(acno:any,password:any,amt:any)
  {
   // rqst body
   const data={
    acno,
    password,
    amt
  }



// deposite API
return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())

    // var amount=parseInt(amt)
    // let database=this.database
  
    // if(acno in database)
    // {
    //   if(password==database[acno]["password"])
    //   {
    //     if(database[acno]["balance"]>amount)
    //     {
  
    //     database[acno]["balance"]=database[acno]["balance"]-amount
    //     database[acno]["transaction"].push({
    //       amount:amount,
    //       type:"DEBIT"
    //     })
    //     // console.log(database);
    //     this.storeData()
    //     return database[acno]["balance"]
    //     }
    //     else{
    //       alert("insufficient balance")
    //       return false

    //     }
  
    //   }
    //   else
    //   {
  
    //     alert("incorrect password")
    //     return false
  
    //   }
    // }
    // else
    // {
    //   alert("user does not exist")
    //   return false
    // }
    
  
    }
// TRANSACTION
getTransction(acno:any)
{
  // rqst body
  const data={
    acno
  }
  return this.http.post('http://localhost:3000/transaction',data,this.getOptions())

  // return this.database[acno]["transaction"]
}

// getMyName():Observable<string>
// {
//   return of("najad")
// }
// getMyName():Observable<person[]>
// {
// return of ([{name:'najad',age:25,phone:12345,qualification:'MCA'}])
// }

// delete account
delete(acno:any)
{
  // delete API
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
}

}



