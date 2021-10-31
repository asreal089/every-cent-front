import { Component, Input, OnInit } from '@angular/core';
import { RadarChartData } from '../models/RadarChartData';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data: RadarChartData = {labels: [], datasets :[] };

  constructor() { }

  ngOnInit(): void {
  }

}
