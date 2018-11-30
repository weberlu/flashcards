import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HintError, HintSuccess } from '../../models/hint.model';
import { AuthenticationService } from '../../services/authentication.service';
import { LoadingPageComponent } from '../loading-page/loading-page.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends LoadingPageComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginForm.valid) {
      super.register(this.authService
        .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
        .subscribe((response: HttpResponse<any>) => {
          window.console.log(`LoginComponent::onSubmit()__success --> `, response);
          // this.router.navigate(['cardbox-overview']);
          this.showHint(new HintSuccess('Yieha!'));
        }, (error: HttpErrorResponse) => {
          window.console.log(`LoginComponent::onSubmit()__error --> `, error);
          this.showHint(new HintError('Yieha!'));
        })
      );
    }
  }
}
