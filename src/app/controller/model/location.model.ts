import {Entreprise} from './entreprise.model';
import {Panneau} from './panneau.model';

export class Location {
  public id: number;
  public date_debut: string;
  public date_fin: string;
  public entreprise: Entreprise;
  public panneau: Panneau;
}
