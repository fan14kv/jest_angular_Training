import { Injectable, computed, inject, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserInterface } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class UserSignalStore {
  private userService = inject(UserService);

  users = signal<UserInterface[]>([]);
  filter = signal<'all' | 'active'>('all');

  visibleUsers = computed(() => {
    return this.filter() === 'all'
      ? this.users()
      : this.users().filter(u => u.isActive);
  });

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users: UserInterface[]) => {
      this.users.set(users);
    });
  }
}
