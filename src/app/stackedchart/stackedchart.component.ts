import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stackedchart',
  templateUrl: './stackedchart.component.html',
  styleUrls: ['./stackedchart.component.css']
})
export class StackedchartComponent implements OnInit {
  stackedOptions: { tooltips: { mode: string; intersect: boolean; }; responsive: boolean; scales: { xAxes: { stacked: boolean; }[]; yAxes: { stacked: boolean; }[]; }; };
  stackedData: { labels: string[]; datasets: { type: string; label: string; backgroundColor: string; data: number[]; }[]; };

  constructor() {this.stackedData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                type: 'bar',
                label: 'Dataset 1',
                backgroundColor: '#42A5F5',
                data: [
                    50,
                    25,
                    12,
                    48,
                    90,
                    76,
                    42
                ]
            }, {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: '#66BB6A',
                data: [
                    21,
                    84,
                    24,
                    75,
                    37,
                    65,
                    34
                ]
            }, {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: '#FFA726',
                data: [
                    41,
                    52,
                    24,
                    74,
                    23,
                    21,
                    32
                ]
            }]
        };

        this.stackedOptions = {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };
 }

  ngOnInit(): void {
  }

}
