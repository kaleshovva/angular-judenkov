import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

interface ICar {
  id: number,
  model: string,
  year: number,
  price: number,
  mark: string
}

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class TutorialsListComponent implements OnInit {

  cars: [ICar];
  currentCar: ICar = this.setEmptyCar();
  currentIndex = -1;
  title = '';

  constructor(private carService: TutorialService) { 
    this.cars = [{} as ICar];
  }

  ngOnInit(): void {
    this.retrieveCars();
  }

  retrieveCars(): void {
    this.carService.getAll()
      .subscribe(
        data => {
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  private setEmptyCar(): ICar {
    return {} as ICar;
  }

  refreshList(): void {
    this.retrieveCars();
    this.currentCar = this.setEmptyCar();
    this.currentIndex = -1;
  }

  setActiveCar(car: any, index: any): void {
    this.currentCar = car;
    this.currentIndex = index;
  }

  searchCar(): void {
    this.carService.findByTitle(this.title)
      .subscribe(
        data => {
          this.cars = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}