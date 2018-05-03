import { Component, OnInit } from '@angular/core';
// import 'chart.piecelabel.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  chartOptions = {
    responsive: true
  };
  public chartType: string = 'doughnut';
  public chartLabelsDough: Array<string> = ['January', 'February', 'March'];
  public chartDataDough: Array<number> = [1, 1, 1];

  public chartOptionsDough: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return label + ': ' + value;
      }
    }
  }
  chartData = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];
  title = 'Bar Chart Example in Angular 4';

  // ADD CHART OPTIONS. 
  chartOptionsBar = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  LabelsBar =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartDataBar = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
      // data: [],
    },
    { 
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
      // data: [],
    }
  ];

  // CHART COLOR.
  colorsBar = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]
  
  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }

  onChartClickBar(event) {
    console.log(event);
  }
  constructor() { }

  ngOnInit() {
    // this.httpService.get('./assets/sales.json', {responseType: 'json'}).subscribe(
    //   data => {
    //       this.chartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
    //   },
    //   (err: HttpErrorResponse) => {
    //       console.log (err.message);
    //   }
    //   );
  }

}
