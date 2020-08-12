import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MapComponent } from './pages/map/map.component';
import { PagesComponent } from './pages/pages.component';
import { PanneauService } from './controller/service/panneau.service';
import { LocationService } from './controller/service/location.service';
import { EntrepriseService } from './controller/service/entreprise.service';
import {HttpClientModule} from '@angular/common/http';
import { EditPanneauComponent } from './pages/edit-panneau/edit-panneau.component';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {DatePipe} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule, Routes} from '@angular/router';
import { AddEntrepriseComponent } from './pages/add-entreprise/add-entreprise.component';
import { HomeComponent } from './pages/home/home.component';
import { EntreprisesComponent } from './pages/entreprises/entreprises.component';
import {MatTableModule} from '@angular/material/table';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: 'editPanneau',
    component: EditPanneauComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'entreprise',
    component: EntreprisesComponent,
  },
  {
    path: '',
    component: HomeComponent,
  }
];
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PagesComponent,
    EditPanneauComponent,
    AddEntrepriseComponent,
    HomeComponent,
    EntreprisesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMomentDateModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes),
    MatTableModule,
    WavesModule,
    TableModule,
    MatIconModule
  ],
  providers: [PanneauService, LocationService, EntrepriseService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
