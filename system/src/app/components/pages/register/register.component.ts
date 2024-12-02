import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  @Input() type: string | null = null;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    
  ) {}
  ngOnInit() {
   
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', Validators.required],
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  get fc() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) return;

    this.userService
      .register({
        name: this.fc['name'].value,
        email: this.fc['email'].value,
        password: this.fc['password'].value,
        phone: this.fc['phone'].value,
      })
      .subscribe({
        next: () => {
          // this.messageService.success('Register Success');
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          // this.messageService.error(error);
        },
      });
  }
}
