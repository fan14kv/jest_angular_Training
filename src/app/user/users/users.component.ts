import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DisableOnClickDirective } from '../../shared/directives/disable-on-click.directive';
import { TruncatePipe } from "../../shared/pipes/truncate.pipe";

@Component({
  selector: 'app-users',
    standalone: true,
    imports: [ReactiveFormsModule,
    CommonModule, DisableOnClickDirective, TruncatePipe],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  dndStatusForm!: FormGroup;
  submitted = signal<boolean>(false);
  successMessage = signal<string>('Form submitted successfully!');
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    this.submitted.set(true);
    console.log(this.userForm.value);
  }

  ///Form ...
}
