import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { TagInterface } from '../types/tag.interface';

@Injectable()

export class ApiService {

    httpClient = inject(HttpClient);

    apiUrl = 'http://localhost:3004';

    getTags(): Observable<TagInterface[]> {
        return this.httpClient.get<TagInterface[]>(`${this.apiUrl}/tags`);
    }

    createTag(name: string): Observable<TagInterface> {
        return this.httpClient.post<TagInterface>(`${this.apiUrl}/tags`, { name });
    }
    getTagsWithRetryOnly(): Observable<TagInterface[]> {
        return this.httpClient.get<TagInterface[]>(`${this.apiUrl}/tags`).pipe(
        retry(2) // Retry up to 2 times before failing
        );
    }
    
}