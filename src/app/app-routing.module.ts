import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialsListComponent } from './components/cars-list/cars-list.component';
import { TutorialDetailsComponent } from './components/car-details/car-details.component';
import { AddTutorialComponent } from './components/add-car/add-car.component';

const routes: Routes = [
  { path: '', redirectTo: 'cars', pathMatch: 'full' },
  { path: 'cars', component: TutorialsListComponent },
  { path: 'cars/:id', component: TutorialDetailsComponent },
  { path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
