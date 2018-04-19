import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-onempty',
  templateUrl: './onempty.component.html',
  styleUrls: ['./onempty.component.css']
})
export class OnemptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onNoClick(): void {
    
    // console.log(this.dataService);
    // this.pItems = this.dataService.pItems;
  }

  
}
