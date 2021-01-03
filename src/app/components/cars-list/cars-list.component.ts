import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

interface ICar {
  id: number;
  model: string;
  year: number;
  price: number;
  mark: string;
}

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class TutorialsListComponent implements OnInit {

  constructor(private carService: TutorialService) {
    this.cars = [TutorialsListComponent.setEmptyCar()];
  }

  cars: Array<ICar>;
  currentCar: ICar = TutorialsListComponent.setEmptyCar();
  currentIndex = -1;
  searchModel = '';

  private static setEmptyCar(): ICar {
    return {} as ICar;
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

  refreshList(): void {
    this.retrieveCars();
    this.currentCar = TutorialsListComponent.setEmptyCar();
    this.currentIndex = -1;
  }

  setActiveCar(car: any, index: any): void {
    this.currentCar = car;
    this.currentIndex = index;
  }

  searchCar(): void {
    this.carService.getAll().subscribe(cars => {
      this.cars = cars;
      this.cars = this.carService.findByTitle(this.searchModel, this.cars);
      this.currentCar = TutorialsListComponent.setEmptyCar();
      this.currentIndex = -1;
    }, err => console.log(err));
  }
}
