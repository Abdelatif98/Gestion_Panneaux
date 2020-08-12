import { Component, OnInit } from '@angular/core';
import {Entreprise} from '../../controller/model/entreprise.model';
import {EntrepriseService} from '../../controller/service/entreprise.service';
import {MatDialog} from '@angular/material/dialog';
import {AddEntrepriseComponent} from '../add-entreprise/add-entreprise.component';
import {LocationService} from '../../controller/service/location.service';
import {PanneauService} from '../../controller/service/panneau.service';
import {Panneau} from '../../controller/model/panneau.model';
import {Location} from '../../controller/model/location.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {
  entreprises: Entreprise[];
  headElements = ['N° Ptente', 'nom', 'Supprimer'];
  public panneau: Panneau;
  public location: Location;
  constructor(public panneauService: PanneauService , public locationService: LocationService , public entrepriseService: EntrepriseService, public dialog: MatDialog, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEntreprises();
  }
  get Entreprises(): Entreprise[] {
    return this.entreprises;
  }
  set Entreprises(entreprises: Entreprise[]){
    this.entreprises = entreprises;
  }
  get Panneau(): Panneau {
    return this.panneau;
  }
  set Panneau(panneau: Panneau){
    this.panneau = panneau;
  }
  get Location(): Location {
    return this.location;
  }
  set Location(location: Location){
    this.location = location;
  }
  getEntreprises(): void{
    this.entrepriseService.getAll().subscribe(
      data => {
        this.Entreprises = data;
      }
    );
  }
  deleteEntreprise(id: number): void{
  this.locationService.getByEntreprise(id).subscribe(
    data => {
      for (let i = 0 ; i < data.length ; i++){
        this.Panneau = data[i].panneau;
        this.Panneau.etat = 0;
        this.panneauService.updatedata(this.Panneau.id, this.Panneau).subscribe();
        this.Location = data[i];
        this.Location.panneau = null;
        this.locationService.updatedata(this.Location.id, this.Location).subscribe(
          response => {
            this.locationService.deleteByEntreprise(id).subscribe(
              l => {
                this.entrepriseService.deleteData(id).subscribe(
                  e => {
                    this.toastr.success('Le compte est supprimé avec les locations asscoiés');
                    this.ngOnInit();
                  }
                );
              }
            );
          }
        );
      }
    }, error => {
      console.log('error');
      this.entrepriseService.deleteData(id).subscribe(
        entre => {
          this.toastr.success('Le compte est supprimé avec les locations asscoiés');
          this.ngOnInit();
        }
      );
    }
  );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEntrepriseComponent, {
      width: '900px',
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
