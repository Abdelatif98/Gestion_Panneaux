import { Component, OnInit } from '@angular/core';
import {PanneauService} from '../../controller/service/panneau.service';
import {EntrepriseService} from '../../controller/service/entreprise.service';
import {Entreprise} from '../../controller/model/entreprise.model';
import {Panneau} from '../../controller/model/panneau.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public entreprises: Entreprise[];
  public panneaux: Panneau[];
  public panneauxL: Panneau[];
  public panneauxP: Panneau[];
  count = 0;
  countL = 0;
  countP = 0;
  countE = 0;

  constructor(public panneauService: PanneauService, public entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.getPanneaux();
    this.getPanneauxP();
    this.getPanneauxL();
    this.getEntreprises();
  }
  getPanneaux(){
    let panneaux = [];
    this.panneauService.getAll().subscribe(
      response => {
        panneaux = response;
        this.count = response.length;
        console.log(this.count);
      }
    );
    console.log(this.count);
  }
  getPanneauxL() {
    this.panneauService.getByEtat(1).subscribe(
      response => {
        this.countL = response.length;
      }
    );
  }
  getPanneauxP() {
    this.panneauService.getByEtat(2).subscribe(
      response => {
        this.countP = response.length;
      }
    );
  }
  getEntreprises() {
    this.entrepriseService.getAll().subscribe(
      response => {
        this.countE = response.length;
      }
    );
  }
}
