import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  constructor() { }
  // lineChart
    // Doughnut
    public doughnutChartLabels:string[] = ['Ciudad Activa', 'Ciudad Mar ', 'Ciudad Inclusiva','Ciudad Sustentable','Ciudad Barrios'];
    public doughnutChartData:number[] = [350, 450, 100, 150, 80];
    public doughnutChartType:string = 'doughnut';
    public doughnutcolors:string[] = ['#D25A2B','#5bc0de','#D19C15','#449C44','#4D4D4D'];
   
    public pieChartLabels:string[] = ['Ciudad Activa', 'Ciudad Mar ', 'Ciudad Inclusiva','Ciudad Sustentable','Ciudad Barrios'];
    public pieChartData:number[] = [350, 450, 100, 150, 80];
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  ngOnInit() {
  }

}
