import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userId= signal<string>('');
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.userId.set(this.route.snapshot.paramMap.get('id') || '');
  }


  save(): void {
    this.router.navigate(['/users']);
  }
}
