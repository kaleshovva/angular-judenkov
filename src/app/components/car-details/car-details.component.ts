import {Component, OnInit} from '@angular/core';
import {TutorialService} from 'src/app/services/tutorial.service';
import {ActivatedRoute, Router} from '@angular/router';

interface ICar {
  id?: number;
  mark: string;
  model: string;
  year: number;
  price: number;
}

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class TutorialDetailsComponent implements OnInit {
  currentCar: ICar = {} as ICar;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.message = '';
    this.getCar(this.route.snapshot.paramMap.get('id'));
  }

  getCar(id: string | null): void {
    this.tutorialService.get(id)
      .subscribe(
        data => {
          this.currentCar = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCar(): void {
    this.tutorialService.update(this.currentCar.id, {
      mark: this.currentCar.mark,
      model: this.currentCar.model,
      year: this.currentCar.year,
      price: this.currentCar.price
    })
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The car was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteCar(): void {
    this.tutorialService.delete(this.currentCar.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/cars']);
        },
        error => {
          console.log(error);
        });
  }
}
