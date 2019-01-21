import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LogService {
 
 logs:Log[];
 private logSource = new BehaviorSubject<Log>({id:null,text:null,date:null});
 selectedLog = this.logSource.asObservable();

 private stateSource = new BehaviorSubject<boolean>(true);
 stateClear = this.stateSource.asObservable();
  constructor() { 

   // this.logs = [
  	//     {id:'1',text:'Generated Component',date:new Date('12/26/2017 12:54:23')},
  	//     {id:'2',text:'Added Bootstrap',date:new Date('12/27/2017 09:54:23')},
  	//     {id:'3',text:'Added logs components',date:new Date('12/27/2017 12:54:23')}
  	//   ]

      this.logs = [];
  }

  getLogs():Observable<Log[]>{

    if(localStorage.getItem('logs') === null){
        this.logs = [];

    }
    else{
        this.logs = JSON.parse(localStorage.getItem('logs'));
    }
  	return of(this.logs.sort((a,b)=>{
         return b.date-a.date;
    }));
  }

  setFormLog(log:Log){
  	 this.logSource.next(log);

  }

  addLog(log:Log){



  	this.logs.unshift(log);

    //Add to local storage 
    localStorage.setItem('logs',JSON.stringify(this.logs));

  }

  updateLog(log:Log){
  	  this.logs.forEach((curr,index)=>{

  	  	   if(log.id == curr.id){
  	  	   	   this.logs.splice(index,1);
  	  	   }

  	  })
      this.logs.unshift(log);

  	  localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  deleteLog(log:Log){

  	this.logs.forEach((curr,index)=>{

  	  	   if(log.id == curr.id){
  	  	   	   this.logs.splice(index,1);
  	  	   }

  	  })
    localStorage.setItem('logs',JSON.stringify(this.logs));

  	  // this.logs.unshift(log);

  }

  clearState(){

    this.stateSource.next(true);

  }

}
