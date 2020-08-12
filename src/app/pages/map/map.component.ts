import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, icon } from 'leaflet';
import {PanneauService} from '../../controller/service/panneau.service';
import {Panneau} from '../../controller/model/panneau.model';
import {Location} from '../../controller/model/location.model';
import {LocationService} from '../../controller/service/location.service';
import {EditPanneauComponent} from '../edit-panneau/edit-panneau.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map;
  private panneaux: Panneau[];
  public AddedPanneaux: Panneau[];
  private location: Location;
  private defaultIcon: Icon = icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 51],
    popupAnchor:  [-3, -40]
  });
  private redIcon: Icon = icon({
    iconUrl: 'assets/leaflet/marker-icon-red.png',
    iconSize: [40, 40],
    iconAnchor: [20, 51],
    popupAnchor:  [-3, -40]
  });
  private greenIcon: Icon = icon({
    iconUrl: 'assets/leaflet/marker-icon-green.png',
    iconSize: [40, 40],
    iconAnchor: [20, 51],
    popupAnchor:  [-3, -40]
  });
  v_zoom = 12;
  lat = 31.6295;
  lng = -7.9811;
  constructor(public panneauService: PanneauService, public locationService: LocationService, public dialog: MatDialog, private route: Router) { }

  ngOnInit(): void {
      this.panneauService.getById(+localStorage.getItem('panneauId')).subscribe(
        data => {
          this.map = L.map('map', {
            center: [ data.latitude, data.longitude ],
            zoom: this.v_zoom
          });
          this.map.on('zoomend', e => {this.v_zoom = this.map.getZoom(); } );
          const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          });
          tiles.addTo(this.map);
          this.DrawMarkers();
        }
      );

      this.map = L.map('map', {
        center: [ this.lat, this.lng ],
        zoom: this.v_zoom
      });
      this.map.on('zoomend', e => {this.v_zoom = this.map.getZoom(); } );
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
      tiles.addTo(this.map);
      this.DrawMarkers();

    // L.marker([51.5, -0.09], {icon: this.defaultIcon}).addTo(this.map).bindPopup('cool');
  }
  set Panneaux(panneaux: Panneau[]){
    this.panneaux = panneaux;
  }
  get Panneaux(): Panneau[]{
    return this.panneaux;
  }
  set Location(location: Location){
    this.location = location;
  }
  get Location(): Location{
    return this.location;
  }
  DrawMarkers(): void{
    this.panneauService.getAll().subscribe(
    response => {
      console.log(response);
      this.Panneaux = response;
      for (let i = 0 ; i < this.Panneaux.length ; i++){
           if (this.Panneaux[i].etat === 2){
             const m = L.marker([this.Panneaux[i].latitude, this.Panneaux[i].longitude], {icon: this.defaultIcon}).addTo(this.map).bindPopup('ajouté par l\'agent, vueillez preciser les detail de location');
             m._icon.id = this.Panneaux[i].id;
             m.on('dblclick', e => {this.openDialog(m._icon.id); });
           }else if (this.Panneaux[i].etat === 0){
             L.marker([this.Panneaux[i].latitude, this.Panneaux[i].longitude], {icon: this.redIcon}).addTo(this.map).bindPopup('pas loué');
           }else{
             this.locationService.getByPanneau(this.Panneaux[i].id).subscribe(
               data => {
                 console.log(data);
                 this.Location = data;
                 L.marker([this.Panneaux[i].latitude, this.Panneaux[i].longitude], {icon: this.greenIcon}).addTo(this.map).bindPopup('<h4>loué par: <i>' + this.Location.entreprise.nom + '</i></h4><p>de: ' + this.Location.date_debut + '</p><p>à: ' + this.Location.date_fin + '</p>');
               }
             );
           }
       }
    }
  );
}
  openDialog(panneauId: number): void {
    localStorage.setItem('panneauId', '' + panneauId);
    console.log(+localStorage.getItem('panneauId'));
    const dialogRef = this.dialog.open(EditPanneauComponent, {
      width: '900px',
      height: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      // refresh map
      this.map.remove();
      this.map = null;
      this.ngOnInit();
    });
  }
  zoomMap(p: Panneau): void {
    this.map.panTo(new L.LatLng(p.latitude, p.longitude));
    this.map.setZoom(19);
  }
}
