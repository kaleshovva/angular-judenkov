import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

interface ICar {
  id?: number,
  model: string,
  year: number,
  price: number,
  mark: string
}

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
  
export class AddTutorialComponent implements OnInit {
  car: ICar = this.setEmptyCar();
  submitted = false;

  constructor(private carService: TutorialService) { }

  ngOnInit(): void {
  }

  saveCar(): void {
    this.carService.create(this.car)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newCar(): void {
    this.submitted = false;
    this.car = this.setEmptyCar();
  }

  setEmptyCar(): ICar {
    return {
      mark: '',
      model: '',
      year: 0,
      price: 0
    };
  }
}