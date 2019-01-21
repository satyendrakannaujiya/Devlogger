import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

	id:string;
	text:string;
	date:any;
	isNew: boolean = true;
  

  constructor(private logService : LogService) { }

  ngOnInit() {

  	//Subscribe to the selected log observalble]


  	this.logService.selectedLog.subscribe(log=>{
  		  // console.log(log);

  		  if(log.id != null){

  		  	    this.isNew = false;
  		  	   this.id = log.id;
  		  	   this.text = log.text;
  		  	   this.date = log.date;

  		  }

  	})


  }

  onSubmit(){
///cjeck if new log
  	if(this.isNew){

  		//Crate a new 
  		const newLog = {
  			  id : this.generateId(),
  			  text:this.text,
  			  date : new Date()
  		}

  		//Add Log
  		this.logService.addLog(newLog);

  	}else{

       //Create log to be updated

       const upLog ={

           id:this.id,
           text:this.text,
           date: new Date()
       }
       //Update log
    this.logService.updateLog(upLog);

  	}

    //Clear the state

    this.clearState();

  }


  generateId(){
  	 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  }

  clearState(){
       this.isNew = true;
       this.id = '';
       this.text = '';
       this.date = '';
       this.logService.clearState();
  }

}
