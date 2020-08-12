import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntrepriseService} from '../../controller/service/entreprise.service';
import {Entreprise} from '../../controller/model/entreprise.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-entreprise',
  templateUrl: './add-entreprise.component.html',
  styleUrls: ['./add-entreprise.component.css']
})
export class AddEntrepriseComponent implements OnInit {
  entreprise: Entreprise;
  public dataForm: FormGroup;
  constructor(public toastr: ToastrService, public fb: FormBuilder, public entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.infoForm();
  }
  infoForm() {
    this.dataForm = this.fb.group({
      id: 0,
      patente: ['', [Validators.required, Validators.minLength(3)]],
      nom : ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get f(){
    return this.dataForm.controls;
  }
  get Entreprise(): Entreprise{
    return this.entreprise;
  }
  set Entreprise(entreprise: Entreprise){
    this.entreprise = entreprise;
  }
  onSubmit(){
    const ent = new Entreprise();
    ent.patente = this.dataForm.value.patente;
    ent.nom = this.dataForm.value.nom;
    console.log(this.dataForm.value.nom);
    this.entrepriseService.createData(ent).subscribe(
      data => {
        this.toastr.success('Ajouté avec Succes');
      }
    );
  }
}
