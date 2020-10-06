import {Component, OnInit} from '@angular/core';
import {GlobalProject, LocalProject, ProjectService} from '../_services/project.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {VoteRequest, VoteService} from '../_services/vote.service';
import {TokenService} from '../_services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: ['./projectslist.component.css']
})
export class ProjectslistComponent implements OnInit {

  projectsIds: FormGroup;
  globalProjects: GlobalProject[];
  localProjects: LocalProject[];
  disabledWhenTwo: boolean;
  countLocalProject = 0;
  countGlobalProject = 0;

  constructor(private projectService: ProjectService, private fb: FormBuilder, private voteService: VoteService, private router: Router) {
    this.disabledWhenTwo = false;
    this.projectsIds = this.fb.group({
      localProject: new FormArray([]),
      globalProject: new FormArray([]),
    });
  }

  ngOnInit(): void {

    if (TokenService.tokenKey == null) {
      this.router.navigateByUrl('/');
    } else {
      this.projectService.getGlobalProject().subscribe(value => {
        this.globalProjects = value;
      });
      this.projectService.getLocalProject().subscribe(value => {
        this.localProjects = value;
      });
    }
  }


  onCheckChange(event) {
    const formArray: FormArray = this.projectsIds.get('localProject') as FormArray;
    if (event.target.checked) {
      this.countLocalProject++;
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
      this.localProjects.forEach(value2 => {
        if (value2.id == event.target.value) {
          value2.ischecked = true;
        }
      });
      //console.log(this.projectsIds.get('localProject').value);
    }
    /* unselected */
    else {
      this.countLocalProject--;
      // find the unselected element
      let i: number = 0;
      this.localProjects.forEach(value2 => {
        if (value2.id == event.target.value) {
          value2.ischecked = false;
          console.log(value2.id);
        }
      });
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          console.log(this.projectsIds.get('localProject').value);
          return;
        }
        i++;
      });
    }
    if (formArray.length == 2) {
      this.disabledWhenTwo = true;
    }
  }

  onCheckChangeLocalProject(event) {
    const globalFormArray: FormArray = this.projectsIds.get('globalProject') as FormArray;
    if (event.target.checked) {
      // Add a new control in the arrayForm
      globalFormArray.push(new FormControl(event.target.value));
      this.globalProjects.forEach(value => {
        if (value.id == event.target.value) {
          value.isChecked = true;
          this.countGlobalProject++;
        }
      });
      console.log(this.projectsIds.get('globalProject').value);
    }
    /* unselected */
    else {
      this.globalProjects.forEach(value => {
        if (value.id == event.target.value) {
          value.isChecked = false;
          this.countGlobalProject--;
        }
      });
      let i: number = 0;
      globalFormArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          globalFormArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  oddajGlos() {
    const voteRequest: VoteRequest = {
      idsOfGlobalprojects: this.projectsIds.get('globalProject').value,
      idsOfLocalprojects: this.projectsIds.get('localProject').value,
      token: TokenService.tokenKey.value
    };
    this.voteService.sendVoteRequest(voteRequest);
    this.router.navigateByUrl('/thanks', {skipLocationChange: true});
  }
}
