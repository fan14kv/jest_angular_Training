import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from "../../shared/services/user.service";
import { UserInterface } from 'src/app/shared/types/user.interface';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [FormsModule, NgIf, UserCardComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  submitted = signal<boolean>(false);
  private userService = inject(UserService);
  user = signal<UserInterface | null>(null);

  ngOnInit(): void {
    this.userService.getUser(10).subscribe({
      next: (result:UserInterface) => {
        this.user.set(result)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.submitted.set(true);
      console.log('Form Values:', form.value);
    }
  }
}
