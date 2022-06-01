import { Component, Input, OnInit } from '@angular/core';
import { PieChartData } from '../models/PieChartData';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {
  
  @Input() data: PieChartData = {labels: [], datasets :[] };

  constructor() {}

  ngOnInit(): void {
  }
  



}
