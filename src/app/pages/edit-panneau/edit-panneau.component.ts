import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Entreprise} from '../../controller/model/entreprise.model';
import {EntrepriseService} from '../../controller/service/entreprise.service';
import {PanneauService} from '../../controller/service/panneau.service';
import {LocationService} from '../../controller/service/location.service';
import {Location} from '../../controller/model/location.model';
import {ToastrService} from 'ngx-toastr';
import {Panneau} from '../../controller/model/panneau.model';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-panneau',
  templateUrl: './edit-panneau.component.html',
  styleUrls: ['./edit-panneau.component.css']
})
export class EditPanneauComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  dateForm: FormGroup;
  entreprises: Entreprise[];
  location: Location;
  panneau: Panneau;

  constructor(private _formBuilder: FormBuilder, public entrepriseService: EntrepriseService, public panneauService: PanneauService, public locationService: LocationService, public toastr: ToastrService, public dialogRef: MatDialogRef<EditPanneauComponent>, private route: Router) {}

  ngOnInit() {
    this.getEntreprise();
    this.dateForm = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }
  getEntreprise(): void{
    this.entrepriseService.getAll().subscribe(
      response => {
        this.entreprises = response;
      }
    );
  }
  get Location(): Location{
    return this.location;
  }
  set Location(location: Location){
     this.location = location;
  }
  get Panneau(): Panneau{
    return this.panneau;
  }
  set Panneau(panneau: Panneau){
    this.panneau = panneau;
  }
  onSubmit(): void {
    // update location
    console.log(this.range.controls.start.value);
    this.locationService.getByPanneau(+localStorage.getItem('panneauId')).subscribe(
      data => {
        this.Location = data;
        this.Location.date_debut = this.locationService.transformDate(this.range.controls.start.value);
        this.Location.date_fin = this.locationService.transformDate(this.range.controls.end.value);
        console.log(this.Location);
        if (this.Location.date_debut == null || this.Location.date_fin == null){
          this.toastr.warning('intervalle de date invalide');
        }
        else {
          this.locationService.updatedata(this.Location.id , this.Location).subscribe(
            response => {
            }
          );
          this.panneauService.getById(+localStorage.getItem('panneauId')).subscribe(
            result => {
              this.Panneau = result;
              console.log(this.Panneau);
              this.Panneau.etat = 1;
              this.panneauService.updatedata(this.Panneau.id, this.Panneau).subscribe();
              console.log(this.Panneau);
              this.toastr.success('mise à jour avec Succes');
              this.dialogRef.close();
            }
          );
        }
      }
    );
  }
}
