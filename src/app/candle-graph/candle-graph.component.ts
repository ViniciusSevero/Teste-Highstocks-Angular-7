import { Component } from '@angular/core';

import { StockChart } from 'angular-highcharts';
import * as $ from 'jquery'
import * as mock from './mock.json';
import {Subscriber} from 'rxjs'

@Component({
  selector: 'candle-graph',
  templateUrl: './candle-graph.component.html',
  styleUrls: ['./candle-graph.component.scss']
})
export class CandleGraphComponent {
  title = 'candles';
  stockChart: any
  ohlc = []
  volume = []
  chartSubscribe: any
  chartElement: any

  ngOnInit(){

    let self = this;

    this.stockChart =  new StockChart({ 
        rangeSelector: {
            enabled: false
        },
        exporting: { 
            enabled: false 
        },
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        title: {
            text: 'PETR4'
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '60%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },
        series: []
    });

    this.chartSubscribe = this.stockChart.ref$.subscribe((params) => {
      this.chartElement = params
      this.getData()
    })
  }

  ngOnDestroy(): void {
    this.chartSubscribe.unsubscribe()
  }

  getData(){

        let data = mock.default
   
        // split the data set into ohlc and volume
      
        let dataLength = data.length
        let i = 0;

        for (i; i < dataLength; i += 1) {
            this.ohlc.push([
                data[i][0], // the date
                data[i][1], // open
                data[i][2], // high
                data[i][3], // low
                data[i][4] // close
            ]);

            this.volume.push([
                data[i][0], // the date
                data[i][5] // the volume
            ]);
        }

        this.chartElement.addSeries(
          {
            type: 'candlestick',
            name: 'AAPL',
            data: this.ohlc,
            
          }
        )

        this.chartElement.addSeries(
          {
            type: 'column',
            name: 'Volume',
            data: this.volume,
            yAxis: 1,
            
          }
        )
  }

}
