import { Component, Input, OnInit } from '@angular/core';
import { RadarChartData } from '../models/RadarChartData';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {

  @Input() data: RadarChartData = {labels: [], datasets :[] };

  constructor() { }

  ngOnInit(): void {
  }

}
