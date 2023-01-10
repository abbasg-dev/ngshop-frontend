import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppAuthService } from '@blackbits/users';
import { HttpError } from '@blackbits/users';
import { LocalstorageService } from '@blackbits/users';
import { Subject, takeUntil } from 'rxjs';
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SocialUser } from '@blackbits/users';
@Component({
  selector: 'users-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = '';
  endsubs$: Subject<any> = new Subject();

  socialUser!: SocialUser;
  isLoggedin?: boolean = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AppAuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private socialAuthService: SocialAuthService,
  ) {}

  ngOnInit(): void {
    this._initLoginForm();

    this.socialAuthService.authState.pipe(takeUntil(this.endsubs$)).subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
    });

    if (this._isLoggedIn || this.isLoggedin) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.endsubs$.next;
    this.endsubs$.complete();
  }

  private _isLoggedIn() {
    if (!this.localstorageService.getToken()) {
      return false;
    }
    return true;
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm['email'].value, this.loginForm['password'].value)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.localstorageService.setUser(user.user);
        this.router.navigate(['/']);
      }, (error) => {
        this.authError = true;
        if (error.status == HttpError.NotFound) {
          if (!error.error.error) {
            this.authMessage = 'User with that email does not exist. Please signup';
          } else {
            this.authMessage = error.error.error;
          }
        } else if (error.status == HttpError.BadRequest) {
          this.authMessage = error.error.error;
        } else if (error.status == HttpError.InternalServerError) {
          this.authMessage = 'Please try again later!';
        }
      }
    )
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this.auth.loginWithFacebook(user.id, user.authToken).pipe(takeUntil(this.endsubs$)).subscribe((response: SocialUser) => {  
        this.socialUser = response;
        this.isLoggedin = (response != null);
        this.localstorageService.setToken(response.token);
        this.localstorageService.setUser(response.user);
        this.router.navigate(['/']);
      }, () => {
        this.isLoggedin = (this.socialUser == null)
      })
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      this.auth.loginWithGoogle(user.idToken).pipe(takeUntil(this.endsubs$)).subscribe((response: SocialUser) => {  
        this.socialUser = response;
        this.isLoggedin = (response != null);
        this.localstorageService.setToken(response.token);
        this.localstorageService.setUser(response.user);
        this.router.navigate(['/']);
      }, () => {
        this.isLoggedin = (this.socialUser == null)
      })
    })
  }
}