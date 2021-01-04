import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(private carService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) {
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

  setActiveCar(car: any, index: any): void {
    this.currentCar = car;
    this.currentIndex = index;
  }

  buyCar(): void {
    alert('You bought a car!');
  }

  deleteCar(): void {
    this.carService.delete(this.currentCar.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/cars']);
        },
        error => {
          console.log(error);
        });
  }

  searchCar(): void {
    this.carService.getAll().subscribe(cars => {
      this.cars = cars;
      this.cars = this.carService.findByTitle(this.searchModel, this.cars);
      this.currentCar = TutorialsListComponent.setEmptyCar();
      this.currentIndex = -1;
    }, err => console.log(err));
    if (this.cars.length === 0) {
      alert('No cars were found!');
      this.retrieveCars();
    }
  }
}