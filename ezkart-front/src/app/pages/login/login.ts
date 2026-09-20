import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  cargando = signal(false);
  error = signal('');

  form = this._fb.nonNullable.group({
    nombreUsuario: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  ingresar() {
    if (this.form.invalid) return;

    this.cargando.set(true);
    this.error.set('');

    const { nombreUsuario, contrasena } = this.form.getRawValue();

    this._authService.login(nombreUsuario, contrasena).subscribe({
      next: () => this._router.navigate(['/products']),
      error: () => {
        this.error.set('Usuario o contraseña incorrectos');
        this.cargando.set(false);
      },
    });
  }
}
