import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: Highcharts.Options;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    Highcharts.chart(this.el.nativeElement, this.data);
  }
}
