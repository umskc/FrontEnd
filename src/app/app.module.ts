import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TokengeneratorComponent } from './tokengenerator/tokengenerator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { Routes, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ThanksComponent } from './thanks/thanks.component';
import {authInterceptorProviders} from './_helpers/auth.interceptor';


const routes: Routes = [
  { path: '', component: TokengeneratorComponent},
  { path: 'projects', component: ProjectslistComponent},
  { path: 'loader', component: LoaderComponent},
  { path: 'thanks', component: ThanksComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
];

@NgModule({
  declarations: [
    AppComponent,
    TokengeneratorComponent,
    TestComponent,
    ProjectslistComponent,
    LoaderComponent,
    ThanksComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
