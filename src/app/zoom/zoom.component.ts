import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  constructor() { 
    window.location.href = 'https://us04web.zoom.us/j/5983981123?pwd=VDlsTy9UQmRhcG5yYU04WWtsM0hLUT09';
  }

  ngOnInit(): void {
  }

}
