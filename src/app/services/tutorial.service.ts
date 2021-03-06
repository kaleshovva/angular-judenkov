import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const baseUrl = 'http://localhost:8000/api/bmw_site';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: string | null): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: { mark: string; model: string; year: number; price: number }): Observable<any> {
    console.log(data);
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(model: string, cars: any): any {
    return cars.filter((car: any) => car.model.toLowerCase().includes(model.toLocaleLowerCase()));
  }
}
