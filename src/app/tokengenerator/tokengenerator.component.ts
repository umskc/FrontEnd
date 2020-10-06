import {Component, OnInit} from '@angular/core';
import {Token, TokenService, User} from '../_services/token.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {VoteService} from '../_services/vote.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tokengenerator',
  templateUrl: './tokengenerator.component.html',
  styleUrls: ['./tokengenerator.component.css']
})
export class TokengeneratorComponent implements OnInit {

  myForm: FormGroup;
  token: Token;

  constructor(private tokenService: TokenService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {

    this.myForm = this.fb.group({
      imie: '',
      nazwisko: '',
      homeNumber: '',
      localNumber: '',
      street: '',
    });
    this.myForm.valueChanges.subscribe(console.log);
  }

  ngOnInit(): void {
  }

  generatetoken(): void {
    const user: User = {
      name: this.myForm.get('imie').value.toString(),
      surname: this.myForm.get('nazwisko').value.toString(),
      homeNumber: this.myForm.get('homeNumber').value.toString(),
      localNumber: this.myForm.get('localNumber').value.toString(),
      street: this.myForm.get('street').value.toString(),
    };
    this.tokenService.generateVerificationToken(user).subscribe(value => {
      this.token = value;
      if (value != null) {
        TokenService.tokenKey = value;
        this.router.navigateByUrl('/projects', { skipLocationChange: true });
      } else {
        this.toastr.error('Nie możesz oddać głosu.');
      }
    });
  }
}
