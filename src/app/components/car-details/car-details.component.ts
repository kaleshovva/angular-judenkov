import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';

interface ITutorial {
  id: number,
  data: {
    title: string,
    description: string
  },
  published?: any
}

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})

export class TutorialDetailsComponent implements OnInit {
  currentCar: ITutorial = {} as ITutorial;
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

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

  updatePublished(status: any): void {
    const data = {
      title: this.currentCar.data.title,
      description: this.currentCar.data.description,
      published: status
    };

    this.tutorialService.update(this.currentCar.id, data)
      .subscribe(
        response => {
          this.currentCar.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateCar(): void {
    this.tutorialService.update(this.currentCar.id, { 
      title: this.currentCar.data.title, 
      description: this.currentCar.data.description, 
      published: this.currentCar.published 
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
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
        });
  }
}