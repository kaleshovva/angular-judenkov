import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

interface ITutorial {
  id: number,
  data: {
    title: string,
    description: string
  },
  published?: any
}

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.scss']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial: ITutorial = this.setEmptyTutorial();
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  private setEmptyTutorial(): ITutorial {
    return {
      id: -1,
      data: {
        title: '',
        description: '',
      }
    };
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = this.setEmptyTutorial();
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: any, index: any): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}