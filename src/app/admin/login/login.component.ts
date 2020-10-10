import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminUser, TokenService} from '../../_services/token.service';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
    this.loginForm.valueChanges.subscribe(console.log);
  }

  loginRequest() {
    const adminUser: AdminUser = {
      username: this.loginForm.get('username').value.toString(),
      password: this.loginForm.get('password').value.toString()
    };
    this.authService.login(adminUser).subscribe(value => {
      console.log(value.token);
      this.tokenService.saveToken(value.token);
    }
    );
  }
}
