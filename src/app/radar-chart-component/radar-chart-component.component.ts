import { Component, Input, OnInit } from '@angular/core';
import { RadarChartData } from '../models/RadarChartData';

@Component({
  selector: 'app-radar-chart-component',
  templateUrl: './radar-chart-component.component.html',
  styleUrls: ['./radar-chart-component.component.css']
})
export class RadarChartComponentComponent implements OnInit {

  @Input() data: RadarChartData = {labels: [], datasets :[] };

  constructor() { }

  ngOnInit(): void {
  }

}
