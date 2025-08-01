import { inject, Injectable } from '@angular/core';
import { UserInterface } from '../types/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    users$ = new BehaviorSubject<UserInterface[]>([]);
    httpClient = inject(HttpClient);
    apiUrl = 'http://localhost:3004';

    addUser(user: UserInterface): void {
        this.users$.next([...this.users$.getValue(), user]);
    }

    removeUser(userId: string): void {
        const updatedUsers = this.users$.getValue().filter((user) => user.id != userId);
        this.users$.next(updatedUsers);
    }

    getUser(userId:number): Observable<UserInterface> {
        return this.httpClient.get<UserInterface>(`${this.apiUrl}/users/${userId}`);
    }

    getUsers(): Observable<UserInterface[]> {
        return this.httpClient.get<UserInterface[]>(`${this.apiUrl}/allUsers`);
    }
}