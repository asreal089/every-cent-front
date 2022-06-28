import { Component, Input, OnInit } from '@angular/core';
import { BarchartConfig } from '../models/BarchartConfig';
import { BarchartData } from '../models/BarchartData';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data: BarchartConfig = {labels: [], datasets: [] };
  @Input() options: any = {chartOptions: []};

  constructor() { }

  ngOnInit(): void {
  }

}
