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
    /*this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      };
      */
  }
  



}
