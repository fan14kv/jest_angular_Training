import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class SearchService {
  http = inject(HttpClient);

  search(term$: Observable<string>): Observable<UserInterface[]> {
    return term$.pipe(
      debounceTime(300),
      switchMap(q =>
        this.http.get<UserInterface[]>(`/api/users?q=${q}`).pipe(
          retry({ count: 3, delay: 1000 })
        )
      )
    );
  }
}
