import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
  
export class AddTutorialComponent implements OnInit {
  car = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private carService: TutorialService) { }

  ngOnInit(): void {
  }

  saveCar(): void {
    const data = {
      title: this.car.title,
      description: this.car.description
    };

    this.carService.create(data)
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
    this.car = {
      title: '',
      description: '',
      published: false
    };
  }

}